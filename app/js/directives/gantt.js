/**
 * Created by e_popov on 08/07/14.
 */
angular.module('angularGantt').directive('gantt', ['$window', function ($window) {
	'use strict';
	var
		ticksCount = 5,
		link = function (scope, element) {
			var startDate, endDate, scale, invScale,
				dragElement, startX,
				axis = element.find('.ag-time-axis');

			startDate = new Date();
			endDate = new Date();
			endDate.setDate(endDate.getDate() + 7);

			scale = d3.scale.linear().domain([startDate.getTime(), endDate.getTime()]).range([0, axis.width()]);
			invScale = d3.time.scale().domain(scale.range()).range(scale.domain());

			scope.getLeft = function (start) {
				return scale(start);
			};

			scope.getWidth = function (start, end) {
				return scale(end) - scale(start);
			};

			scope.startCallback = function ($event, data) {
				console.log('start', $event);
				startX = $event.clientX;
				dragElement = $($event.currentTarget);
				dragElement.hide();
			};

			scope.stopCallback = function ($event, $data, data) {
				console.log('stop', $event);
				var addTime = Math.floor(invScale($event.clientX) - invScale(startX));
				debugger;
				data.start += addTime;
				data.end += addTime;
				scope.$apply();
				dragElement.show();
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