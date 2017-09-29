'use strict';
(function () {
    angular
        .module('ngAutocomplete')
        .filter('searchFilter', searchFilterFilter);

    searchFilterFilter.$inject = [];

    function searchFilterFilter() {
        return function (array, query, maxItems) {
            let exp = new RegExp(query, 'i');
            let counter = maxItems;

            let filtered = array.filter((item) => {
                if (counter <= 0) return;
                if (!item.isEmptyState && exp.test(item.label)) {
                    counter--;
                    return true;
                }
                return false;

            });
            if (!filtered.length && array.length) filtered[0] = array[0];
            return filtered;
        };
    }
})();