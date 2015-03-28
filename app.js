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
		    name: '6 x 6 = ',
		    answers: ['25', '32', '36']
		}, {
		    // TODO
		    name: '7 x 7 = ',
		    answers: ['25', '32', '36']
		}, {
		    // TODO
		    name: '8 x 8 = ',
		    answers: ['25', '32', '36']
		}, {
		    // TODO
		    name: '9 x 9 = ',
		    answers: ['25', '32', '36']
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
                if ($scope.answers.length > $scope.count) {
                    $scope.count += 1;

                    if ($scope.count == $scope.questions.length) {
                        $('#main').fadeOut();
                        $('#main').hide();
                        score();
                    } else {
                        reloadQuestion($scope.questions[$scope.count]);
                    }
                }
            };
        }





        /* *************** SCORE *************** */
        function score() {
            window.onkeyup = function () { };
            $('#score').fadeIn();

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

            })

            //var m2x = new M2X("eb4354541cb303b74ce82025fcfd5dec");
            //m2x.devices.view("0bc2215fc6d7778f080d240f0f234b76", function (device) {
            //    console.log(device);
            //});


            $('#scoreh1').html(5);


            $('#showscore_btn').on('click', function () {
                $('#score').fadeOut();
                $('#score').hide();
                scoreboard();
            });
        }




        /* *************** SCOREBOARD ************** */
        function scoreboard() {
            $('#scoreboard').fadeIn();
            $.ajax({
                url: 'http://api-flow.att.io/sandbox/asl/augustuskc/in/flow/results',
                success:function(data)
                {
                    var results = jQuery.parseJSON(data);
                    $.each(results.values, function (index, value) {
                        var userData = jQuery.parseJSON(value.value);
                        $("#scoreboard").append(userData.name + " " + userData.score + " " + value.timestamp);
                    });
                }
            })
        }
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
