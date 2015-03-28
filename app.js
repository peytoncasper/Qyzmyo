'use strict';

var app = angular.module('app', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
		$routeProvider.when('/', {
				templateUrl: 'home.html',
				controller: 'HomeCtrl'
		})
		.when('/about', {
				templateUrl: 'about.html',
				controller: 'AboutCtrl'
		})
		.otherwise({
				templateUrl: 'home.html',
				controller: 'HomeCtrl'
		});
}]);

app.controller('HomeCtrl', ['$scope', '$rootScope', '$location', function ($scope, $rootScope, $location) {
	$rootScope.root = {
			title: 'Home'
	};

	$scope.questions = [
		{
				name: '3 x 3 = ',
				answers: ['3', '6', '9']
		}, {
				// TODO

		}
	];
	$scope.answers = [];
	$scope.timeout = 5 * 1000;  // 5 secs per question

$(document).ready(function () {
	// close nav bar if open
	$('#sidenav-overlay').trigger('click');

	$('#preloader_div').hide();
	// $('#main').hide();
	$('#score').hide();

	/* *************** REGISTER *************** */
	var reloadQuestion = function(questionObj) {
		console.log('clicked');
		var question = questionObj.name;
		var answer1 = questionObj.answers[0];
		var answer2 = questionObj.answers[1];
		var answer3 = questionObj.answers[2];
		$('#question').fadeOut();
		$('#answer1').fadeOut();
		$('#answer2').fadeOut();
		$('#answer3').fadeOut();
		$('#question').html(question);
		$('#answer1').html(answer1);
		$('#answer2').html(answer2);
		$('#answer3').html(answer3);
		$('#question').fadeIn();
		$('#answer1').fadeIn();
		$('#answer2').fadeIn();
		$('#answer3').fadeIn();
	};

	// testing purpose
	$('#next_btn').on('click', function() {
		reloadQuestion($scope.questions[0]);
	});

	$('#register_btn').on('click', function() {
		$('#register').fadeOut();
		$('#register').hide();
		$('#preloader_div').fadeIn();

		// TODO
		$('#preloader_div').fadeOut();
		window.onkeyup = function (e) {
			var key = e.keyCode ? e.keyCode : e.which;

			if (key == 65) {
				alert("hi");
				$($scope.answers).append({
						timestamp: new Date(),
						answer: 'a',
				});
				reloadQuestion($scope.questions[$($.scope.answers).length() - 1]);
			} else if (key == 66) {
				$($scope.answers).append({
						timestamp: new Date(),
						answer: 'b',
				});
				reloadQuestion($scope.questions[$($.scope.answers).length() - 1]);
			} else if (key == 67) {
				$($scope.answers).append({
						timestamp: new Date(),
						answer: 'c',
				});
				reloadQuestion($scope.questions[$($.scope.answers).length() - 1]);
			}
		};
		$.each($scope.questions, function (index, value) {
			$("#main").append(value.name);
		});
	});

	/* *************** MAIN *************** */





	/* *************** SCORE *************** */





	});
}]);


app.controller('AboutCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
		$rootScope.root = {
				title: 'About'
		};

		$(document).ready(function () {
				// close nav bar if open
				$('#sidenav-overlay').trigger('click');
		});
}]);
