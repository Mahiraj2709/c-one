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
    })