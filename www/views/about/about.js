angular.module('starter')
    .controller('AboutCtrl', function ($scope,$ionicPopup) {
        // An alert dialog
        $scope.showAlert = function (message) {
            var alertPopup = $ionicPopup.alert({
                title: 'Attention!',
                template: message
            });
        };
        $scope.aboutUs = {}
    })