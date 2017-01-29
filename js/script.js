angular.module('timerApp', [])
  .controller('TimerController', function($scope, $interval) {
    $scope.hours = 0;
    $scope.minutes = 0;
    $scope.seconds = 0;
    $scope.isRunning = false;
    var timeinterval;

    // Greetings
    notify('Hey yo pigeon');

    $scope.editValue = function(value, number) {
      switch(value) {
        case 'hours':
          editHours(number);
          break;
        case 'minutes':
          editMinutes(number);
          break;
        case 'seconds':
          editSeconds(number);
          break;
        default:
          console.log('can\'t find value: ' + value);
      }
    };

    function editHours(number) {
      $scope.hours += number;
      if($scope.hours < 0) {
        $scope.hours = 0;
      }
    }

    function editMinutes(number) {
      $scope.minutes += number;
      if($scope.minutes >= 60) {
        editHours(1);
        $scope.minutes = $scope.minutes % 60;
      } else if($scope.minutes < 0) {
        $scope.minutes = 59;
        editHours(-1);
      }
    }

    function editSeconds(number) {
      $scope.seconds += number;
      if($scope.seconds >= 60) {
        editMinutes(1);
        $scope.seconds = $scope.seconds % 60;
      } else if($scope.seconds < 0) {
        $scope.seconds = 59;
        editMinutes(-1);
      }
    }

    function getTimeRemaining(endtime) {
      var t = endtime - Date.parse(new Date());
      var seconds = Math.floor( (t/1000) % 60 );
      var minutes = Math.floor( (t/1000/60) % 60 );
      var hours = Math.floor( (t/(1000*60*60)) % 24 );
      return {
        'total': t,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
      };
    }

    $scope.toggleClock = function() {
      if ($scope.isRunning) {
        $interval.cancel(timeinterval);
        $scope.isRunning = false;
      } else {
        var waitTime = $scope.hours * 60 * 60 * 1000
                          + $scope.minutes * 60 * 1000
                          + $scope.seconds * 1000;
        if(waitTime < 1000) {
          return;
        }
        var endtime = Date.parse(new Date()) + waitTime;
        function updateClock() {
          var t = getTimeRemaining(endtime);

          $scope.hours = t.hours;
          $scope.minutes =  t.minutes;
          $scope.seconds = t.seconds;

          if (t.total <= 0) {
            $interval.cancel(timeinterval);
            notify('Wake up!');
          }
        }

        updateClock();
        timeinterval = $interval(updateClock, 1000);
        $scope.isRunning = true;
      }
    }

    $scope.resetClock = function() {
      $interval.cancel(timeinterval);
      $scope.isRunning = false;
      $scope.hours = 0;
      $scope.minutes =  0;
      $scope.seconds = 0;
    }

    function notify(text) {
      var voices = speechSynthesis.getVoices();
      var utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = voices[2];
      // speechSynthesis.speak(utterance);
    }
  })
  .filter('numberFixedLen', function () {
        return function (n, len) {
            var num = parseInt(n, 10);
            len = parseInt(len, 10);
            if (isNaN(num) || isNaN(len)) {
                return n;
            }
            num = ''+num;
            while (num.length < len) {
                num = '0'+num;
            }
            return num;
        };
    });
