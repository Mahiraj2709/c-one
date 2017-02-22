/**
 * Created by admin on 1/31/2017.
 */
angular.module('starter')
    .controller('BillCtrl', function ($scope, AppointmentData, services,popups, $location) {
        $scope.appointment = AppointmentData.appointment;
        $scope.rateObj = {
//            appointment_id: $stateParams.appointment_id,
            app_appointment_id: $scope.appointment,
            rating: 0,
            review: undefined,
        };

        $scope.setRating = function (rating) {
            //console.log(rating)
            console.log('ratin '+ rating)
            $scope.rateObj.rating = rating;
        }

        $scope.generateBill = function () {

            if(!validBill($scope.setRating)) {
                return
            }
            services.sendfeedback($scope.rateObj, function (response) {

                console.log(response)
                /*popups.showAlert('Your request has been sent!')

                $ionicHistory.clearCache().then(function () {
                    $location.url('/home')
                })*/
            })
        }

        function validBill() {
            //console.log(JSON.stringify($scope.setRating))
            if($scope.rateObj.rating < 1) {
                popups.showAlert('Please rate your experience!'); return false
            }else if($scope.rateObj.review == undefined || $scope.rateObj.review == '') {
                popups.showAlert('Please wirte reivew!'); return false
            }
            return true
        }
    })

