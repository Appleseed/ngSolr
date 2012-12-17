/*
 * This file is subject to the terms and conditions defined in the
 * 'LICENSE.txt' file, which is part of this source code package.
 */
'use strict';

/**
 * Manages the current set of user selected facets.
 * @param $scope Controller scope
 */
function FacetSelectionController($scope) {
	// fields
    $scope.facets = [];  // list of query facets

    /**
     * Initialize the controller
     * @param FacetList List of current search facets
     */
    $scope.init = function(FacetList) {
        $scope.facets = FacetList;
        $scope.watch(FacetList);
    }

    /**
     * Remove the facet at the specified index.
     * @param Index Index of facet to remove.
     */
    $scope.remove = function(Index) {
        $scope.facets.splice(Index,1);
        $scope.update();
        $scope.$parent.updateResults();
    }

    /**
     * Update the display when a change occurs to the facet list.
     */
    $scope.update = function() {
    }

    /**
     * Watch the specified variable for changes.
     * @param variable Variable to watch
     */
    $scope.watch = function(variable) {
        $scope.$watch(variable,$scope.update);
    }
}

// inject controller dependencies
FacetSelectionController.$inject = ['$scope'];