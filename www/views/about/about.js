angular.module('starter')
  .controller('AboutCtrl', function ($scope, $ionicPopup) {
    // An alert dialog
    $scope.showAlert = function (message) {
      var alertPopup = $ionicPopup.alert({
        title: 'Attention!',
        template: message
      });
    };
    $scope.aboutUs = {}

    $scope.openTnC = function () {
      $ionicModal.fromTemplateUrl('views/signup/terms_n_condition.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        $scope.modal = modal;
        $scope.modal.show();
      });
    };
    $scope.cancelTnC = function () {
      $scope.modal.hide();
    }
    $scope.rateOnGooglePlay = function () {
      cordova.InAppBrowser.open('https://play.google.com/store/apps/details?id=com.app.cleanosaur', '_system', 'location=yes');
    }
    $scope.rateOnITune = function () {
      cordova.InAppBrowser.open('https://itunes.apple.com/in/genre/ios/id36?mt=8', '_blank', 'location=yes');
    }
    $scope.likeOnFacebook = function () {
      cordova.InAppBrowser.open('https://www.facebook.com/cleanosaurrawr/', '_blank', 'location=yes');
    }
    $scope.watchOnYoutube = function () {
      cordova.InAppBrowser.open('https://www.youtube.com/channel/UCY_a1vkcYPx5eJTr4k1GrNg', '_blank', 'location=yes');
    }
    $scope.followOnTwitter = function () {
      cordova.InAppBrowser.open('https://twitter.com/cleanosaur', '_blank', 'location=yes');
    }
    $scope.followOnInstagram = function () {
      cordova.InAppBrowser.open('https://www.instagram.com/cleanosaur/?hl=en', '_blank', 'location=yes');
    }
    $scope.visitOurWebsite = function () {
      cordova.InAppBrowser.open('cleanosuarapp.onsisdev.info', '_blank', 'location=yes');
    }
  })
