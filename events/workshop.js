var app = angular.module('app', ['ngAnimate'])
var isMobile = {
	Android: function () {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function () {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function () {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function () {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function () {
		return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
	},
	any: function () {
		return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
	}
};
app.controller('mainCtrl', function ($scope) {
	$scope.boxes = [
    {
      "name": "Way Beats",
      "tagline": "Sound. Vision. Soul",
      "color": "#0A2463",
      "imageUrl": "https://svitprakarsh.github.io/PrakarshGraphics/2020/events/workshops/way_beats.webp",
      "dataUrl": "https://svitprakarsh.github.io/PrakarshJSON/2020/events/workshops/allevents/way_beats.json"
    },
    {
      "name": "IOT",
      "tagline": "Information and automation on TAP",
      "color": "#3E92CC",
      "imageUrl": "https://svitprakarsh.github.io/PrakarshGraphics/2020/events/workshops/iot.webp",
      "dataUrl": "https://svitprakarsh.github.io/PrakarshJSON/2020/events/workshops/allevents/iot.json"
    },
    {
      "name": "Aerophilia 2.0",
      "tagline": "Hava ke Saath Saath",
      "color": "#D8315B",
      "imageUrl": "https://svitprakarsh.github.io/PrakarshGraphics/2020/events/workshops/aerophilia_2.0.webp",
      "dataUrl": "https://svitprakarsh.github.io/PrakarshJSON/2020/events/workshops/allevents/aerophilia_2.0.json"
    },
    {
      "name": "Rise of Machines 9.0",
      "tagline": "When the dust settles, all that would be left will be machines",
      "color": "#F19143",
      "imageUrl": "https://svitprakarsh.github.io/PrakarshGraphics/2020/events/workshops/rise_of_machine_9.0.webp",
      "dataUrl": "https://svitprakarsh.github.io/PrakarshJSON/2020/events/workshops/allevents/rise_of_machine_9.0.json"
    },
    {
      "name": "Flutter",
      "tagline": "Build up your own horizon",
      "color": "#441151",
      "imageUrl": "https://svitprakarsh.github.io/PrakarshGraphics/2020/events/workshops/flutter.webp",
      "dataUrl": "https://svitprakarsh.github.io/PrakarshJSON/2020/events/workshops/allevents/flutter.json"
    },
    {
      "name": "Industrial Automation",
      "tagline": "Getting into the real world",
      "color":"#8CB369",
      "imageUrl": "https://svitprakarsh.github.io/PrakarshGraphics/2020/events/workshops/industrial_automation.webp",
      "dataUrl": "https://svitprakarsh.github.io/PrakarshJSON/2020/events/workshops/allevents/industrial_automation.json"
    },
    {
      "name": "Self Balancing Robot",
      "tagline": "",
      "color":"#463730",
      "imageUrl": "https://svitprakarsh.github.io/PrakarshGraphics/2020/events/workshops/self_balancing_robot.webp",
      "dataUrl": "https://svitprakarsh.github.io/PrakarshJSON/2020/events/workshops/allevents/self_balancing_robot.json"
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

			if (isMobile) {
				$timeout(function () {
					element.css({
						width: '80%',
						overflow: 'scroll',
						'overflow-x': 'hidden',
						height: '100%'

					})
				}, 500)
			} else {

				$timeout(function () {
					element.css({
						width: '80%',
						overflow: 'scroll',
						'overflow-x': 'hidden'

					})
				}, 500)
			}

			$timeout(function () {
				element.addClass('show');
			}, 800)
		}
	}
})
