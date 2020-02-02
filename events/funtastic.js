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
      "name": "Memeistan",
      "tagline": "Kabhi Kabhi laghta hai ki Memes hi Duniya Hai",
      "color": "#0A2463",
      "imageUrl": "https://svitprakarsh.github.io/PrakarshGraphics/2020/events/funtastic/memeistan.webp",
      "dataUrl": "https://svitprakarsh.github.io/PrakarshJSON//2020/events/funtastic/allevents/memeistan.json"
    },
    {
      "name": "Artiphilia 6.0 ",
      "tagline": "Bring Creativity to life",
      "color": "#3E92CC",
      "imageUrl": "https://svitprakarsh.github.io/PrakarshGraphics/2020/events/funtastic/artiphilia_6.0.webp",
      "dataUrl": "https://svitprakarsh.github.io/PrakarshJSON/2020/events/funtastic/allevents/artiphilia_6.0.json"
    },
    {
      "name": "Bigg Boss ",
      "tagline": "Let your Intelligence have Fun!",
      "color": "#D8315B",
      "imageUrl": "https://svitprakarsh.github.io/PrakarshGraphics/2020/events/funtastic/big_boss.webp",
      "dataUrl": "https://svitprakarsh.github.io/PrakarshJSON/2020/events/funtastic/allevents/big_boss.json"
    },
    {
      "name": "Mr. and Ms. Prakarsh  ",
      "tagline": "Style is more about being yourself",
      "color": "#F19143",
      "imageUrl": "https://svitprakarsh.github.io/PrakarshGraphics/2020/events/funtastic/mr_and_mrs_prakarsh.webp",
      "dataUrl": "https://svitprakarsh.github.io/PrakarshJSON/2020/events/funtastic/allevents/mr_and_mrs_prakarsh.json"
    },
    {
      "name": "Prakarsh Premier League",
      "tagline": "Game on...",
      "color": "#441151",
      "imageUrl": "https://svitprakarsh.github.io/PrakarshGraphics/2020/events/funtastic/prakarsh_premier_league.webp",
      "dataUrl": "https://svitprakarsh.github.io/PrakarshJSON/2020/events/funtastic/allevents/prakarsh_premier_league.json"
    },
    {
      "name": "Sherlock ",
      "tagline": "They were the footprints of a gigantic hound!",
      "color":"#8CB369",
      "imageUrl": "https://svitprakarsh.github.io/PrakarshGraphics/2020/events/funtastic/sherlock.webp",
      "dataUrl": "https://svitprakarsh.github.io/PrakarshJSON/2020/events/funtastic/allevents/sherlock.json"
    },
    {
      "name": "Combat Conquer",
      "tagline": "Conquer the things and feel the power...",
      "color":"#463730",
      "imageUrl": "https://svitprakarsh.github.io/PrakarshGraphics/2020/events/funtastic/combat_conquer.webp",
      "dataUrl": "https://svitprakarsh.github.io/PrakarshJSON/2020/events/funtastic/allevents/combat_conquer.json"
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
