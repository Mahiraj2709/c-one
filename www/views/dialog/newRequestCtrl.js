/**
 * Created by Mahiraj Singh on 1/14/2017.
 */
angular.module('starter')
    .controller('ReqCtrl', function ($scope, $rootScope, ChangeAvailability, CONSTANTS, $ionicPopup, $location, $ionicModal, $sce, popups, AppointmentData) {
        var customer_id = '';
        ChangeAvailability.getCustomerProfile(AppointmentData.app_appointment_id, function (customerData) {
            $scope.profileImage = CONSTANTS.CUSTOMER_PROFILE_IMAGE_URL + customerData.profile_pic;
            $scope.customerData = customerData;
            customer_id = customerData.customer_id;
            //make appointment data availabe to the on the way screen
            AppointmentData.appointment = customerData;
        });
        $scope.showAlert = function (message) {
            var alertPopup = $ionicPopup.alert({
                title: 'Attention!',
                template: message
            });
        };
        $scope.viewCustomer = function () {
            //
            $location.url('customer_profile/' + $scope.customerData.customer_id);
            $rootScope.newRequestModal.hide();
        }
        $scope.acceptRequest = function () {
            ChangeAvailability.acceptRequest($scope.customerData, function (response_key) {
                if (response_key == 101) {
                    $scope.requestAccepted = false;
                } else if (response_key == 30) {
                    //launch the navigation screen
                    $scope.modal.hide();
                    $location.url('/on_the_way');
                    /*$ionicPopup.alert({
                     title: 'Success',
                     template: 'You have successfully accepted this request'
                     });*/
                }
            });
        }
        $scope.dismissModal = function () {
            //ChangeAvailability.rejectRequest();
            $rootScope.newRequestModal.hide();
        }
        $scope.rejectRequest = function () {
            ChangeAvailability.rejectRequest(AppointmentData.app_appointment_id, function (resposne) {
                if (resposne.response_status == '1') {
                    $rootScope.newRequestModal.hide();
                    $ionicPopup.alert({
                        title: 'Success',
                        template: resposne.response_msg
                    });
                }
            });
        }
        $scope.requestAccepted = true;
        //video player modal
        $scope.videoLink = $sce.trustAsResourceUrl(CONSTANTS.CUSTOMER_PROFILE_IMAGE_URL + AppointmentData.profile_video);
        $scope.openVideoPlayer = function () {
            if (AppointmentData.profile_video == undefined) {
                popups.showAlert('profile video does not exit!');
                return
            }
            $ionicModal.fromTemplateUrl('views/dialog/video_player.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal = modal;
                $scope.modal.show();
            });
        };

        $scope.closeVideoPlayer = function () {
            //$scope.videoLink = undefined
            $scope.modal.remove();
        }

    });
