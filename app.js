'use strict';

var app = angular.module('app', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
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

app.controller('HomeCtrl', ['$scope', '$rootScope', '$location', function($scope, $rootScope, $location) {
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


  $(document).ready(function() {
    // close nav bar if open
    $('#sidenav-overlay').trigger('click');

    $('#preloader_div').hide();

    /* *************** REGISTER *************** */
    $('#register_btn').on('click', function() {
      $('#register').fadeOut();
      $('#register').hide();
      $('#preloader_div').fadeIn();

      // TODO
      $('#preloader_div').fadeOut();
      
      $(document).on('input', function ()
      {
          alert("Hi");
      });
      $.each($scope.questions, function (index, value) {
          $("#main").append(value.name);
      });
    });

    /* *************** MAIN *************** */





    /* *************** SCORE *************** */





  });
}]);


app.controller('AboutCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
  $rootScope.root = {
    title: 'About'
  };

  $(document).ready(function() {
    // close nav bar if open
    $('#sidenav-overlay').trigger('click');
  });
}]);
