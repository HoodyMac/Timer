angular.module('timerApp')
  .controller('ChronometerController', function($scope, $interval) {
    $scope.hours = 0;
    $scope.minutes = 0;
    $scope.seconds = 0;
    $scope.miliseconds = 0;
    $scope.isRunning = false;
  });
