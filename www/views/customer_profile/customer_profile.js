/**
 * Created by admin on 1/18/2017.
 */
angular.module('starter')
    .controller('CustomerProfileCtrl',function ($scope,$stateParams,CustomerData,CONSTANTS) {
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
    });
