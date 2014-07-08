/**
 * Created by e_popov on 07/07/14.
 */
angular.module('angularGantt').service('taskSrv', ['localStorageService', function (localStorageService) {
	'use strict';

	var getTasks = function () {
			var tasks = localStorageService.get('tasks');
			if (!tasks) {
				tasks = [
					{
						id: 1,
						name: 'первая',
						start: 1404815085961,
						end: 1434985984335,
						subtasks: [
							{
								id: 11,
								name: 'первая11',
								start: 1204813085961,
								end: 1404985984335,
								subtasks: [
									{
										id: 111,
										name: 'первая111',
										start: 1204813085961,
										end: 1404985984335,
										subtasks: [

										]
									}
								]
							},
							{
								id: 12,
								name: 'первая12',
								start: 1404842919002,
								end: 1404985984335,
								subtasks: [

								]
							},
							{
								id: 13,
								name: 'первая13',
								start: 1404813085961,
								end: 1404985984335,
								subtasks: [

								]
							},
							{
								id: 14,
								name: 'первая14',
								start: 1404813085961,
								end: 1404985984335,
								subtasks: [

								]
							}
						]
					},
					{
						id: 2,
						name: 'первая2',
						start: 14049813085961,
						end: 1404913185961,
						subtasks: []
					},
					{
						id: 3,
						name: 'первая3',
						start: 1404813085961,
						end: 1404985984335,
						subtasks: []
					},
					{
						id: 4,
						name: 'первая4',
						start: 1404813085961,
						end: 1404985984335,
						subtasks: []
					}
				];
			}
			return tasks;
		},
		saveTasks = function (tasks) {
			localStorageService.set('tasks', tasks);
		};

	return {
		get: getTasks,
		save: saveTasks
	};
}]);