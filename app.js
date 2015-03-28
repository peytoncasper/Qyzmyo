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
		    name: 'Which is the only real dev language',
		    answers: ['Whitespace', 'L0Lcode', 'Node.js'],
            answer: 'c'
		}, {
		    name: 'Mac > PC',
		    answers: ['Hell yes', 'Nope.js', 'Maybe'],
            answer: 'b'
		}, {
		    name: 'How many programmers does it take to fix a projector',
		    answers: ['None.js', 'One', 'It\'s a hardware problem'],
            answer: 'c'
		}, {
		    name: 'How many Prolog programmers does it take to fix a printer',
		    answers: ['Yes', 'No', '10'],
            answer: 'a'
		}
    ];
    $scope.count = 0;
    $scope.answers = [];
    $scope.base_score = 100;

    $(document).ready(function () {
        // close nav bar if open
        $('#sidenav-overlay').trigger('click');

        $('#preloader_div').hide();
        $('#main').hide();
        $('#score').hide();
        $('#scoreboard').hide();

        /* *************** REGISTER *************** */
        var reloadQuestion = function (answer, right, newQuestion) {
            console.log(answer + " " + right);
        	// answer is 1, 2, or 3
        	// right is true or falseg
        	$('#question').fadeOut();
        	switch(answer) {
        		case 'a':
        			$('#answer2').hide();
        			$('#answer3').hide();
        			$('#answer1').addClass((right ? 'green-text' : 'red-text') + ' lighten-1').fadeOut(function() {
        				if (newQuestion !== undefined) {
	        				fadeInQuestion(newQuestion);
        				} else {
        					$('#main').hide(function() {
        						score();
        					});
        				}
        			});
        			break;
        		case 'b':
        			$('#answer1').hide();
        			$('#answer3').hide();
        			$('#answer2').addClass((right ? 'green-text' : 'red-text') + ' lighten-1').fadeOut(function() {
        				if (newQuestion !== undefined) {
	        				fadeInQuestion(newQuestion);
        				} else {
        					$('#main').hide(function() {
        						score();
        					});
        				}
        			});
        			break;
        		case 'c':
        			$('#answer1').hide();
        			$('#answer2').hide();
        			$('#answer3').addClass((right ? 'green-text' : 'red-text') + ' lighten-1').fadeOut(function() {
        				if (newQuestion !== undefined) {
	        				fadeInQuestion(newQuestion);
        				} else {
        					$('#main').hide(function() {
        						score();
        					});
        				}
        			});
        			break;
        	}

        };

        var fadeInQuestion = function (questionObj) {
        	if (questionObj === undefined) {
        		return;
        	}
            var question = questionObj.name;
            var answer1 = questionObj.answers[0];
            var answer2 = questionObj.answers[1];
            var answer3 = questionObj.answers[2];
            $('#question').html(question);
            $('#answer1').html(answer1);
            $('#answer2').html(answer2);
            $('#answer3').html(answer3);
            $('#question').removeClass('green-text red-text lighten-1');
            $('#answer1').removeClass('green-text red-text lighten-1');
            $('#answer2').removeClass('green-text red-text lighten-1');
            $('#answer3').removeClass('green-text red-text lighten-1');
            $('#question').fadeIn();
            $('#answer1').fadeIn();
            $('#answer2').fadeIn();
            $('#answer3').fadeIn();
        };

        $('#register_btn').on('click', function () {
            $('#register').fadeOut();
            $('#register').hide();
            $('#preloader_div').fadeIn();

            fadeInQuestion($scope.questions[0]);
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
                        reloadQuestion($scope.answers[$scope.count - 1].answer, $scope.questions[$scope.count - 1].answer == $scope.answers[$scope.count - 1].answer ? true : false, undefined);
                    } else {
                        reloadQuestion($scope.answers[$scope.count - 1].answer, $scope.questions[$scope.count - 1].answer == $scope.answers[$scope.count - 1].answer ? true : false, $scope.questions[$scope.count]);
                    }
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
                    $scope.score += $scope.base_score;
                    $scope.score += $scope.base_score /elapsedTime; // bonus for timing

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
        // close nav bar if open
        $('#sidenav-overlay').trigger('click');
		$('.tooltipped').tooltip({delay: 50});

		$('#scoreboard').fadeIn();
		
        $.ajax({
            url: 'http://api-flow.att.io/sandbox/asl/augustuskc/in/flow/results',
            success: function (data) {
            	var arr = [];
                $.each(data.values, function (index, value) {
                    var userData = jQuery.parseJSON(value.value);
                    arr.push({
                    	userData: userData,
                    	timestamp: value.timestamp
                    });
                    /*
                    $("#tablebody").append(
                    	'<tr><td>' + userData.name + 
                    	'</td><td>' + userData.score +
						'</td><td>' + new Date(value.timestamp).toLocaleTimeString() + ' <span class="grey-text darken-2">' + new Date(value.timestamp).toLocaleDateString() + '</span>' +
						'</td></tr>'
                	);
					*/
                });
                arr.sort(function(a, b) {
                	var diff = a.userData.score - b.userData.score;
                	var ascending = true;	// set `false` for descending
                	return ascending ? -diff : diff;
                });
                $.each(arr, function(index, value) {
                    $("#tablebody").append(
                    	'<tr><td>' + value.userData.name + 
                    	'</td><td>' + parseInt(value.userData.score) +
						'</td><td>' + new Date(value.timestamp).toLocaleTimeString() + ' <span class="grey-text darken-2">' + new Date(value.timestamp).toLocaleDateString() + '</span>' +
						'</td></tr>');
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
