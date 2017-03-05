angular.module('timerApp')
  .controller('ChronometerController', function($scope, $interval, $filter) {
    $scope.hours = 0;
    $scope.minutes = 0;
    $scope.seconds = 0;
    $scope.miliseconds = 0;
    $scope.isRunning = false;
    $scope.rounds = [];

    var startTime = 0;
    var total = 0;
    var timeinterval;

    $scope.toggleChronometer = function() {
      if ($scope.isRunning) {
        $interval.cancel(timeinterval);
        $scope.isRunning = false;
      } else {
        if (startTime === 0) {
          startTime = Date.now();
        }

        function updateClock() {
          var t = getTimePassed();
          $scope.hours = t.hours;
          $scope.minutes =  t.minutes;
          $scope.seconds = t.seconds;
          $scope.miliseconds = t.miliseconds;
        }

        updateClock();
        timeinterval = $interval(updateClock, 1);
        $scope.isRunning = true;
      }
    }

    $scope.resetRound = function() {
      if ($scope.isRunning) {
        // round
        timePassed = getTimePassed();
        var round = $filter('numberFixedLen')(timePassed.hours, 2) + ':'
                      + $filter('numberFixedLen')(timePassed.minutes, 2) + ':'
                      + $filter('numberFixedLen')(timePassed.seconds, 2) + ':'
                      + $filter('numberFixedLen')(timePassed.miliseconds, 3);
        $scope.rounds.push(round);
      } else {
        // reset
        startTime = 0;
        $scope.hours = 0;
        $scope.minutes = 0;
        $scope.seconds = 0;
        $scope.miliseconds = 0;
        $scope.rounds = [];
      }
    }

    function getTimePassed() {
      total = Date.now() - startTime;
      var miliseconds = total % 1000;
      var seconds = Math.floor( (total/1000) % 60 );
      var minutes = Math.floor( (total/1000/60) % 60 );
      var hours = Math.floor( (total/(1000*60*60)) % 24 );
      return {
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds,
        'miliseconds': miliseconds
      };
    }
  });
