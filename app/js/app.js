/*================================================================
 =>                  App = angularGantt
 ==================================================================*/
/*global angular*/

var app = angular.module('angularGantt', ['ngRoute', 'LocalStorageModule']);

app.config(['$routeProvider', '$locationProvider', '$httpProvider', 'localStorageServiceProvider',
	function ($routeProvider, $locationProvider, $httpProvider, localStorageServiceProvider) {
		'use strict';

		$routeProvider
			.when('/home', {
				templateUrl: 'templates/home.html',
				controller: 'HomeCtrl'
			})
			.otherwise({
				redirectTo: '/home'
			});

		$locationProvider.hashPrefix('!');

		// This is required for Browser Sync to work poperly
		$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
	}]);


/*================================================================
 =>                  angularGantt App Run()
 ==================================================================*/

app.run(['$rootScope', function ($rootScope) {

	'use strict';

	console.log('Angular.js run() function...');
}]);


/* ---> Do not delete this comment (Values) <--- */

/* ---> Do not delete this comment (Constants) <--- */