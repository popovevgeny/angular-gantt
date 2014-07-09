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
						name: 'Задача 1',
						start: 1404869862305,
						end: 1405733862305,
						subtasks: [
							{
								id: 3,
								name: 'Подзадача 1',
								start: 1404969862305,
								end: 1405933862305,
								subtasks: [
								]
							},
							{
								id: 4,
								name: 'Подзадача 2',
								start: 1404969862305,
								end: 1405933862305,
								subtasks: [

								]
							}
						]
					},
					{
						id: 2,
						name: 'Задача 2',
						start: 1404869862305,
						end: 1405733862305,
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