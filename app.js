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
    .when('/scoreboard', {
        templateUrl: 'scoreboard.html',
        controller: 'ScoreboardCtrl'
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
		    answers: ['9', '6', '3'],
            answer: 'a',
		}, {
		    // TODO
		    name: '6 x 6 = ',
		    answers: ['25', '32', '36'],
            answer: 'c'
		}, {
		    // TODO
		    name: '7 x 7 = ',
		    answers: ['25', '23', '49'],
            answer: 'c'
		}, {
		    // TODO
		    name: '8 x 8 = ',
		    answers: ['56', '32', '64'],
            answer: 'c'
		}, {
		    // TODO
		    name: '9 x 9 = ',
		    answers: ['45', '81', '10'],
            answer: 'b'
		}
    ];
    $scope.count = 0;
    $scope.answers = [];
    $scope.timeout = 5 * 1000;  // 5 secs per question

    $(document).ready(function () {
        // close nav bar if open
        $('#sidenav-overlay').trigger('click');

        $('#preloader_div').hide();
        $('#main').hide();
        $('#score').hide();
        $('#scoreboard').hide();

        /* *************** REGISTER *************** */
        var reloadQuestion = function (questionObj) {
            var question = questionObj.name;
            var answer1 = questionObj.answers[0];
            var answer2 = questionObj.answers[1];
            var answer3 = questionObj.answers[2];
            $('#question').fadeOut(function () {
                $('#question').html(question);
                $('#answer1').html(answer1);
                $('#answer2').html(answer2);
                $('#answer3').html(answer3);
                $('#question').fadeIn();
                $('#answer1').fadeIn();
                $('#answer2').fadeIn();
                $('#answer3').fadeIn();
            });
            $('#answer1').fadeOut();
            $('#answer2').fadeOut();
            $('#answer3').fadeOut();
        };

        $('#register_btn').on('click', function () {
            $('#register').fadeOut();
            $('#register').hide();
            $('#preloader_div').fadeIn();

            reloadQuestion($scope.questions[0]);
            $scope.name = $("#input-id").val();
            $('#preloader_div').fadeOut();
            $('#preloader_div').hide();
            $('#main').fadeIn();

            main();
        });

        /* *************** MAIN *************** */
        function main() {
            window.onkeyup = function (e) {
                var key = e.keyCode ? e.keyCode : e.which;

                if (key == 65) {
                    $scope.answers.push({
                        timestamp: new Date().getTime(),
                        answer: 'a',
                    });
                } else if (key == 66) { 
                    $scope.answers.push({
                        timestamp: new Date().getTime(),
                        answer: 'b',
                    });
                } else if (key == 67) {
                    $scope.answers.push({
                        timestamp: new Date().getTime(),
                        answer: 'c',
                    });
                }
                $scope.count += 1;

                if ($scope.count == $scope.questions.length) {
                    $('#main').fadeOut();
                    $('#main').hide();
                    score();
                } else {
                    reloadQuestion($scope.questions[$scope.count]);
                }
            };
        }




        
        /* *************** SCORE *************** */
        function score() {
            window.onkeyup = function () { };
            $('#score').fadeIn();
            calculateScore();
            $.ajax({
                type: 'POST',
                url: 'http://api-flow.att.io/sandbox/asl/augustuskc/in/flow/game',
                data:
                    {
                        data: JSON.stringify({
                            name: $scope.name,
                            score: $scope.score
                        })
                    },

            });

            //var m2x = new M2X("eb4354541cb303b74ce82025fcfd5dec");
            //m2x.devices.view("0bc2215fc6d7778f080d240f0f234b76", function (device) {
            //    console.log(device);
            //});


            $('#scoreh1').html($scope.score);
        }


        function calculateScore()
        {
            $scope.score = 0;
            for (var i = 1; i < $scope.answers.length; i++)
            {
                var value = $scope.answers[i];
                if($scope.questions[i].answer == $scope.answers[i].answer)
                {
                    var elapsedTime = Math.abs($scope.answers[i].timestamp - $scope.answers[i - 1].timestamp)/1000.0;
                    $scope.score += 100.0 /elapsedTime;

                }
            }
            $scope.score = parseInt($scope.score);
        }
    });
}]);


app.controller('ScoreboardCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
	$rootScope.root = {
		title: 'Scoreboard'
	};

	$(document).ready(function () {
		$('#scoreboard').fadeIn();
        $.ajax({
            url: 'http://api-flow.att.io/sandbox/asl/augustuskc/in/flow/results',
            success: function (data) {
                $.each(data.values, function (index, value) {
                    var userData = jQuery.parseJSON(value.value);
                    $("#tablebody").append(
                    	'<tr><td>' + userData.name + 
                    	'</td><td>' + userData.score +
						'</td><td>' + new Date(value.timestamp).toLocaleTimeString() + ' <span class="grey-text darken-2">' + new Date(value.timestamp).toLocaleDateString() + '</span>' +
						'</td></tr>'
                	);
                	console.log("date", value.timestamp);
                });

            	$('#preloader_div').fadeOut(function() {
            		$('#scoreboard').fadeIn();
            	});
            }
        });
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
