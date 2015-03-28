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

    $(document).ready(function () {
        // close nav bar if open
        $('#sidenav-overlay').trigger('click');

        $('#preloader_div').hide();

        /* *************** REGISTER *************** */
        $('#register_btn').on('click', function () {
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
                    reloadQuestion($scope.questions[$($.scope.answers).length()]);
                } else if (key == 66) {
                    $($scope.answers).append({
                        timestamp: new Date(),
                        answer: 'b',
                    });
                    reloadQuestion($scope.questions[$($.scope.answers).length()]);
                } else if (key == 67) {
                    $($scope.answers).append({
                        timestamp: new Date(),
                        answer: 'c',
                    });
                    reloadQuestion($scope.questions[$($.scope.answers).length()]);
                }
            }
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
