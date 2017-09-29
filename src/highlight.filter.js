'use strict';
(function () {
    angular
        .module('ngAutocomplete')
        .filter('highlight', highlightFilter);

    highlightFilter.$inject = ['$sce'];

    function highlightFilter($sce) {
        return function (input, query, highlightClass) {
            let exp = new RegExp(query, 'gi'),
                highlighted = input.replace(exp, `<span class="${highlightClass}">$&</span>`);

            return $sce.trustAsHtml(highlighted);
        };
    }
})();