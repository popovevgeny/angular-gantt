/**
 * Created by e_popov on 08/07/14.
 */
angular.module('angularGantt').directive('gantt', ['$window', '$filter', function ($window, $filter) {
	'use strict';
	var
		ticksCount = 7,
		sevenDays = 7 * 24 * 60 * 60 * 1000,
		link = function (scope, element) {
			var startDate, endDate, scale, invScale,
				dragElement, startX,
				dragTask, parentList,
				axis = element.find('.ag-time-axis'),
				updateAxis = function () {
					scope.ticks.length = 0;

					var domain = invScale.domain(),
						k = (domain[1] - domain[0]) / ticksCount,
						offset, time;

					for (var i = 0; i < ticksCount; i += 1) {
						offset = domain[0] + k * i;
						time = invScale(offset);
						scope.ticks.push({
							offset: offset,
							value: $filter('date')(new Date(time), 'dd.MM.yy')
						});
					}
				};

			scope.ticks = [];

			startDate = new Date();
			endDate = new Date();
			endDate.setDate(endDate.getDate() + 31);

			scale = d3.scale.linear().domain([startDate.getTime(), endDate.getTime()]).range([0, axis.width()]);
			invScale = d3.scale.linear().domain(scale.range()).range(scale.domain());
			updateAxis();

			scope.getLeft = function (start) {
				return scale(start);
			};

			scope.getWidth = function (start, end) {
				return scale(end) - scale(start);
			};

			scope.startCallback = function ($event, $data, task, list) {
				dragTask = task;
				parentList = list;

				startX = $event.clientX;
				dragElement = $($event.currentTarget);
				dragElement.hide();
			};

			scope.stopCallback = function ($event, $data, data) {
				var addTime = Math.floor(invScale($event.clientX) - invScale(startX));
				data.start += addTime;
				data.end += addTime;
				scope.$apply();
				dragElement.show();
			};

			scope.dropCallback = function ($event, $data, data) {
				if (data.id === dragTask.id || dragTask.subtasks.indexOf(data) > -1) {
					return;
				}
				data.subtasks.push(dragTask);
				var index = parentList.indexOf(dragTask);
				if (index > -1) {
					parentList.splice(index, 1);
				}
			};

			scope.onDrop = function ($event, task) {
				var item = $($event.currentTarget),
					newStart = invScale($event.originalEvent.clientX - item.offset().left);
				task.end += +(newStart - task.start);
				task.start = newStart;
			};

			$($window).on('resize', function () {
				if (!scope.tasks) {
					return;
				}
				scale.range([0, axis.width()]);
				invScale.domain(scale.range());

				scope.$apply();
				updateAxis();
			});

			element.on('wheel', function ($event) {
				var domain = scale.domain(),
					k = 1.00001;

				if ($event.originalEvent.deltaY > 0) {

					scale.domain([Math.floor(domain[0] / k), Math.floor(domain[1] * k)]);
					invScale.range(scale.domain());
				} else {
					if (domain[1] - domain[0] <= sevenDays) {
						return;
					}
					scale.domain([Math.floor(domain[0] * k), Math.floor(domain[1] / k)]);
					invScale.range(scale.domain());
				}
				scope.$apply();
				$event.preventDefault();
				updateAxis();
			});

			scope.$on('$destroy', function () {
				element.off('wheel');
				$($window).off('resize');
			});
		};

	return {
		restrict: 'EAC',
		scope: {
			tasks: '='
		},
		replace: true,
		link: link,
		templateUrl: 'templates/directives/gantt.html'
	};
}]);