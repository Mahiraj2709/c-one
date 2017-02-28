/**
 * Created by Mahiraj Singh on 1/18/2017.
 */
angular.module('starter')
    .controller('CustomerProfileCtrl',function ($scope,$stateParams,CustomerData,CONSTANTS,AppointmentData,$sce,$ionicModal,popups,services) {

        services.getCustomerFeedback($stateParams.customer_id,function (response) {
            if(response.response_status == '1') {
                $scope.cleanerFeedback = response.response_data.rating;
            }
        })

        console.log($stateParams.customer_id);
        $scope.getCustomerData = function () {
            CustomerData.getCustomerProfile($stateParams.customer_id,function (customerData) {
                $scope.customerData = customerData;

                $scope.profile_pic = CONSTANTS.CUSTOMER_PROFILE_IMAGE_URL + customerData.profile_pic;
                $scope.profileImages = [];
                for (var i = 0; i < customerData.customer_album_profile_pic.length; i++) {
                    $scope.profileImages.push(CONSTANTS.CUSTOMER_PROFILE_IMAGE_URL + customerData.customer_album_profile_pic[i].profile_pic);
                }
            });
        }


        $scope.videoLink = $sce.trustAsResourceUrl(CONSTANTS.CUSTOMER_PROFILE_IMAGE_URL + AppointmentData.profile_video);

        $scope.openVideoPlayer = function () {

            if(AppointmentData.profile_video == undefined) {

                popups.showAlert('profile video does not exit!'); return
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
            $scope.modal.hide();
        }
    });
