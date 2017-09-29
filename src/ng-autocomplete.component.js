'use strict';
(function () {
    angular
        .module('ngAutocomplete', [])
        .component('autocomplete', {
            template: `
                <input class="autocomplete__input"
                       type="text"
                       id="{{$ctrl.options.input.id}}"
                       placeholder="{{$ctrl.options.input.placeholder}}"
                       ng-class="$ctrl.options.input.class"
                       ng-model="$ctrl.model"
                       ng-focus="$ctrl.focus()"
                       ng-change="$ctrl.type()"
                       ng-blur="$ctrl.blur()">
                
                <div class="autocomplete__list"
                     id="{{$ctrl.options.list.id}}"
                     ng-class="[$ctrl.options.list.class, {'{{$ctrl.options.list.classVisible}}': $ctrl.isCompleting}]">
                
                    <div class="autocomplete__item"
                         ng-repeat="item in $ctrl.items = ($ctrl.data | searchFilter : $ctrl.searchFilter : $ctrl.options.maxItems) track by $index"
                         ng-bind-html="item.label | highlight: $ctrl.searchFilter : $ctrl.options.item.classHighlight"
                         ng-class="[$ctrl.options.item.class, {'{{$ctrl.options.item.classActive}}': $ctrl.selectedIndex === $index}, {'autocomplete__item_empty-state': item.isEmptyState}]"
                         ng-click="$ctrl.select(item)"
                         ng-mouseenter="$ctrl.selectedIndex = $index">
                    </div>
                </div>`,
            controller: autocompleteController,
            bindings: {
                data: '<',
                options: '<',
                onFocus: '&',
                onBlur: '&',
                onType: '&',
                onSelect: '&'
            }
        });

    autocompleteController.$inject = ['$element', '$scope', '$timeout'];

    function autocompleteController($element, $scope, $timeout) {
        const ctrl = this;

        ctrl.isCompleting = false;
        ctrl.selectedIndex = -1;
        ctrl.items = [];

        // callback wrapper
        ctrl.focus = focus;
        ctrl.blur = blur;
        ctrl.type = type;
        ctrl.select = select;

        ctrl.$onInit = () => {
            // set defaults to prevent errors
            if (!ctrl.options) ctrl.options = {};
            if (!ctrl.options.list) ctrl.options.list = {};
            if (!ctrl.options.item) ctrl.options.item = {};

            // set default options
            ctrl.data = ctrl.options.data || ctrl.data || [];
			ctrl.data = angular.copy(ctrl.data);
            ctrl.model = ctrl.options.input.value || '';
            ctrl.searchFilter = ctrl.model;

            ctrl.options.minLength = ctrl.options.minLength !== undefined ? ctrl.options.minLength : 2;
            ctrl.options.maxItems = ctrl.options.maxItems !== undefined ? ctrl.options.maxItems : 5;
            ctrl.options.emptyState = ctrl.options.emptyState !== undefined ? ctrl.options.emptyState : 'No results found...';
            ctrl.options.list.classVisible = ctrl.options.list.classVisible || 'autocomplete__list_visible';
            ctrl.options.item.classActive = ctrl.options.item.classActive || 'autocomplete__item_active';
            ctrl.options.item.classHighlight = ctrl.options.item.classHighlight || 'autocomplete__item_highlight';

            // callbacks
            ctrl.onFocus = ctrl.options.onFocus || ctrl.onFocus || pass;
            ctrl.onBlur = ctrl.options.onBlur || ctrl.onBlur || pass;
            ctrl.onType = ctrl.options.onType || ctrl.onType || pass;
            ctrl.onSelect = ctrl.options.onSelect || ctrl.onSelect || pass;

            // insert empty state into data
            if (ctrl.options.emptyState) ctrl.data.splice(0, 0, {isEmptyState: true, label: ctrl.options.emptyState})
        };

        //////////////////////////////

        // ---------- keyboard controls ----------

        ctrl.$postLink = () => {
            // setup event listener callbacks for keys
            $element[0].addEventListener('keydown', (ev) => {
                let keycode = ev.keyCode;
                if (keycode === 9) onKeyTab(ev);
                else if (keycode === 13) onKeyEnter();
                else if (keycode === 27) onKeyEsc();
                else if (keycode === 38) onKeyUp();
                else if (keycode === 40) onKeyDown();
            });
        };

        // ---- callbacks | keyboard control ----

        /**
         * A callback for the keydown event.
         * Fired when tab key is pressed.
         * Copies the text of the currently active item into the input field.
         */
        function onKeyTab(ev) {
            ev.preventDefault();
            if (ctrl.selectedIndex > -1) {
                let item = ctrl.items[ctrl.selectedIndex];
                if (item.isEmptyState) return;
                ctrl.model = ctrl.searchFilter = item.label;
                ctrl.selectedIndex = 0;
                updateView();
            }
        }

        /**
         * A callback for the keydown event.
         * Fired when enter key is pressed.
         * Selects currently active item.
         */
        function onKeyEnter() {
            if (ctrl.selectedIndex > -1) {
                ctrl.select(ctrl.items[ctrl.selectedIndex]);
                updateView();
            }
        }

        /**
         * A callback for the keydown event.
         * Fired when escape key is pressed.
         * Cancels current autocomplete process
         */
        function onKeyEsc() {
            ctrl.blur();
        }

        /**
         * A callback for the keydown event.
         * Fired when arrow up key is pressed.
         * Marks the prev (upper) item as selected.
         */
        function onKeyUp() {
            ctrl.selectedIndex = --ctrl.selectedIndex < 0 ? ctrl.items.length - 1 : ctrl.selectedIndex;
            if (ctrl.selectedIndex >= ctrl.items.length) ctrl.selectedIndex = ctrl.items.length - 1;
            updateView();

        }

        /**
         * A callback for the keydown event.
         * Fired when arrow down key is pressed.
         * Marks the next (lower) item as selected.
         */
        function onKeyDown() {
            ctrl.selectedIndex = (ctrl.selectedIndex + 1) % ctrl.items.length;
            updateView();
        }


        // ---------- public callback wrappers ----------

        /**
         * A callback wrapper for the onfocus event.
         * Starts autocompletition if input has at least options.minLength.
         */
        function focus() {
            if (ctrl.model.length >= ctrl.options.minLength) ctrl.isCompleting = true;
            ctrl.onFocus(ctrl);
        }

        /**
         * A callback wrapper for the onblur event.
         * Closes suggestion list
         */
        function blur(preventEvent) {
            ctrl.selectedIndex = -1;
            if (preventEvent) {
                ctrl.isCompleting = false;
            } else {
                // set timeout before closing so the ngClick (select) can fire
                $timeout(() => ctrl.isCompleting = false, 100);
                ctrl.onBlur(ctrl);
            }

        }

        /**
         * A callback wrapper for the ontype event.
         * Updates the search filter if input has at least options.minLength.
         */
        function type() {
            if (ctrl.model.length < ctrl.options.minLength) ctrl.isCompleting = false;
            else {
                ctrl.isCompleting = true;
                ctrl.searchFilter = ctrl.model;

                // unmark active field if list too short
                if (ctrl.selectedIndex >= ctrl.items.length) ctrl.selectedIndex = -1;
            }
            ctrl.onType(ctrl);
        }

        /**
         * A callback wrapper for the onselect event.
         * Selects the currently active element (hovered / navigated to with keyboard)
         */
        function select(item) {
            if (item.isEmptyState) return;
            ctrl.model = ctrl.searchFilter = item.label;
            ctrl.blur(true);
            ctrl.onSelect(ctrl, item);
        }

        // utility functions   // @formatter:off
        // used for empty callbacks
        function pass() {}
        // update view if no digest cycle in progress
        function updateView() { if(!$scope.$$phase) $scope.$apply(); }
        // @formatter:on

    }
})();