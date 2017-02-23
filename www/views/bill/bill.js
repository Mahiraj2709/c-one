/**
 * Created by admin on 1/31/2017.
 */
angular.module('starter')
    .controller('BillCtrl', function ($scope, AppointmentData, services, popups, $ionicHistory,$location) {
        $scope.appointment = AppointmentData.appointment;
        $scope.rateObj = {
//            appointment_id: $stateParams.appointment_id,
            app_appointment_id: $scope.appointment.app_appointment_id,
            rating: 0,
            review: undefined,
        };
        $scope.setRating = function (rating) {
            //console.log(rating)
            console.log('ratin ' + rating)
            $scope.rateObj.rating = rating;
        }
        $scope.generateBill = function () {
            if ($scope.rateObj.rating < 1) {
                popups.showAlert('Please rate your customer!')
                return
            } else if ($scope.rateObj.review == undefined || $scope.rateObj.review == '') {
                popups.showAlert('Please review your customer!')
                return
            } else {
                console.log($scope.rateObj)
                services.sendfeedback($scope.rateObj, function (response) {
                    console.log(response)
                    if (String(response.response_status) == "1") {
                        popups.showAlert(response.response_msg)

                         $ionicHistory.clearCache().then(function () {
                         $location.url('/home')
                         })
                    } else {
                        popups.showAlert(response.response_msg)
                    }

                })
            }
        }
    })

