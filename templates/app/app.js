// A module called 'myApp'

// set var to module called 'myApp' and currently no dependencies
var myApp = angular.module('myApp', []);

// called before 'run' function
myApp.config(function(){

});

myApp.run(function(){

});

// controls app data
// need $scope dependency to pass data between this controller and any html bodies with controller tag
myApp.controller('PartyWhipController', ['$scope', function($scope, $mdDialog){

  $scope.removePost = function(post) {
    var removedPost = $scope.posts.indexOf(post);
    $scope.posts.splice(removedPost, 1);
  }

  $scope.user = "Potatoes";

  $scope.posts = [
    {
      task: "Cook for 50-people event",
      poster: "Steven",
      task_budget: 1500,
      task_open: true
    },
    {
      task: "Clean the house",
      poster: "Brad",
      task_budget: 50,
      task_open: true,
    },
    {
      task: "Buy and deliver groceries",
      poster: "Steven",
      task_budget: 30,
      task_open: true
    },
    {
      task: "Send message to friends",
      poster: "Tracey",
      task_budget: 10,
      task_open: false
    },
    {
      task: "Drive to airport",
      poster: "Chrissy",
      task_budget: 80,
      task_open: true
    }
  ];

  // PartyWhip content
}]);
