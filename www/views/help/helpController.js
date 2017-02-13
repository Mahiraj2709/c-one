/**
 * Created by maahi on 11/02/17.
 */
angular.module('starter')
    .controller('HelpCtrl', function ($scope, ChangeAvailability, CONSTANTS, $ionicPopup, $location, $ionicModal, $sce, AppointmentData) {
        services.getstaticcontent(0, function (response) {
            if (response.response_status == '1') {
                $scope.helps = response.response_data.staticcontent;
            }
        })
    })
