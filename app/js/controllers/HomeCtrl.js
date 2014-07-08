/**
 * Created by e_popov on 07/07/14.
 */
angular.module('angularGantt').controller('HomeCtrl', ['$scope', 'taskSrv', function ($scope, taskSrv) {
	'use strict';

	$scope.tasks = taskSrv.get();

}]);