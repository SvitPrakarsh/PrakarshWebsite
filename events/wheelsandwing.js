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
			"name": "Assemble It",
			"tagline": "Unleash the Horsepower within",
			"color": "#0A2463",
			"imageUrl": "https://svitprakarsh.github.io/PrakarshGraphics/2020/events/wheelsandwings/assemble_it.webp",
			"dataUrl": "https://svitprakarsh.github.io/PrakarshJSON/2020/events/wheelsandwings/allevents/assemble_it.json"
		},
		{
			"name": "Def-Sec 7.0 ",
			"tagline": "Nabhaha Sparsham Diptum",
			"color": "#3E92CC",
			"imageUrl": "https://svitprakarsh.github.io/PrakarshGraphics/2020/events/wheelsandwings/def_sec_7.0.webp",
			"dataUrl": "https://svitprakarsh.github.io/PrakarshJSON/2020/events/wheelsandwings/allevents/def_sec_7.0.json"
		},
		{
			"name": "Prachaar 10.0 ",
			"tagline": "For the free who knows the difference",
			"color": "#D8315B",
			"imageUrl": "https://svitprakarsh.github.io/PrakarshGraphics/2020/events/wheelsandwings/prachar_10.0.webp",
			"dataUrl": "https://svitprakarsh.github.io/PrakarshJSON/2020/events/wheelsandwings/allevents/prachar_10.0.json"
		},
		{
			"name": "Rock it out ",
			"tagline": "Pace forward to build Maleficent Rocket",
			"color": "#F19143",
			"imageUrl": "https://svitprakarsh.github.io/PrakarshGraphics/2020/events/wheelsandwings/rock_it_out.webp",
			"dataUrl": "https://svitprakarsh.github.io/PrakarshJSON/2020/events/wheelsandwings/allevents/rock_it_out.json"
		},
		{
			"name": "3D-X",
			"tagline": "Imagination, now it’s reality",
			"color": "#441151",
			"imageUrl": "https://svitprakarsh.github.io/PrakarshGraphics/2020/events/wheelsandwings/3d_x.webp",
			"dataUrl": "https://svitprakarsh.github.io/PrakarshJSON/2020/events/wheelsandwings/allevents/3d_x.json"
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
