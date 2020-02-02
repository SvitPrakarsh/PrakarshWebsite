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
      "name": "HR Summit ",
      "tagline": "Optimize Your Human Equity",
      "color": "#0A2463",
      "imageUrl": "https://svitprakarsh.github.io/PrakarshGraphics/2020/events/ancillary/hr_summit.webp",
      "dataUrl": "https://svitprakarsh.github.io/PrakarshJSON/2020/events/ancillary/allevents/hr_summit.json"
    },
    {
      "name": "Artist Hub",
      "tagline": "",
      "color": "#3E92CC",
      "imageUrl": "https://svitprakarsh.github.io/PrakarshGraphics/2020/events/ancillary/artist_hub.webp",
      "dataUrl": "https://svitprakarsh.github.io/PrakarshJSON/2020/events/ancillary/allevents/artist_hub.json"
    },
    {
      "name": "Indian Airforce ",
      "tagline": "",
       "color": "#D8315B",
      "imageUrl": "https://svitprakarsh.github.io/PrakarshGraphics/2020/events/ancillary/indian_airforce.webp",
      "dataUrl": "https://svitprakarsh.github.io/PrakarshJSON/2020/events/ancillary/allevents/indian_airforce.json"
    },
    {
      "name": "ISRO",
      "tagline": "Viscosity of vision",
      "color": "#F19143",
      "imageUrl": "https://svitprakarsh.github.io/PrakarshGraphics/2020/events/ancillary/isro.webp",
      "dataUrl": "https://svitprakarsh.github.io/PrakarshJSON/2020/events/ancillary/allevents/isro.json"
    },
    {
      "name": "NHSRCL",
      "tagline": "",
      "color": "#441151",
      "imageUrl": "https://svitprakarsh.github.io/PrakarshGraphics/2020/events/ancillary/nhsrcl.webp",
      "dataUrl": "https://svitprakarsh.github.io/PrakarshJSON/2020/events/ancillary/allevents/nhsrcl.json"
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
