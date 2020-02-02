var app = angular.module('app', ['ngAnimate'])

app.controller('mainCtrl', function ($scope) {
	$scope.boxes = [
    {
      "name": "Cross Roads	",
      "tagline": "Race for glory",
      "color": "#0A2463",
      "imageUrl": "https://svitprakarsh.github.io/PrakarshGraphics/2020/events/robotics/cross_roads.webp",
      "dataUrl": "https://svitprakarsh.github.io/PrakarshJSON/2020/events/robotics/allevents/cross_roads.json"
    },
    {
      "name": "Robo Soccer",
      "tagline": "Envision the Challenge",
      "color": "#3E92CC",
      "imageUrl": "https://svitprakarsh.github.io/PrakarshGraphics/2020/events/robotics/robo_soccer.webp",
      "dataUrl": "https://svitprakarsh.github.io/PrakarshJSON/2020/events/robotics/allevents/robo_soccer.json"
    }
  ];

	$scope.selected = [];
	$scope.selectBox = function (item, position) {
		$scope.selected = [{
			item: item,
			position: position
		}];
		$scope.$apply();
	}
	$scope.clearSelection = function () {
		$scope.selected = [];
	}
})

app.directive('box', function () {
	return {
		restrict: 'E',
		scope: {},
		bindToController: {
			onSelect: "=",
			item: "="
		},
		controllerAs: 'box',
		controller: function () {
			var box = this;

			box.goFullscreen = function (e) {
				box.onSelect(box.item, e.target.getBoundingClientRect())
			}
		},
		link: function (scope, element) {
			element.bind('click', scope.box.goFullscreen)
			element.css({
				'background-image': 'url(' + scope.box.item.imageUrl + ')'
			})
		}
	}
})

app.directive('bigBox', function ($timeout) {
	return {
		restrict: 'AE',
		scope: {},
		bindToController: {
			position: "=",
			selected: "=",
			onSelect: "="
		},
		controllerAs: 'box',
		controller: function () {
			var box = this;
		},
		link: function (scope, element) {
			var css = {}
			for (var key in scope.box.position) {
				css[key] = scope.box.position[key] + 'px';
			}

			element.css(css);

			$timeout(function () {
				element.css({
					top: '22%',
					left: '10%'
				})
				element.addClass('image-out');
			}, 200)

			$timeout(function () {
				element.css({
					width: '80%',
					overflow: 'scroll',
					'overflow-x': 'hidden',
					
				
					height: '100%'
				})
			}, 500)

			$timeout(function () {
				element.addClass('show');
			}, 800)
		}
	}
})
