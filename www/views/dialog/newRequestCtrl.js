/**
 * Created by admin on 1/14/2017.
 */
angular.module('starter')
    .controller('ReqCtrl',function ($scope,ChangeAvailability,CONSTANTS,$ionicPopup,$location) {
        var customer_id = '';
        ChangeAvailability.getCustomerProfile($scope.payload, function (customerData) {
            $scope.profileImage =CONSTANTS.CUSTOMER_PROFILE_IMAGE_URL + customerData.profile_pic;
            $scope.customerData = customerData;
            customer_id = customerData.customer_id;
        });

        $scope.showAlert = function (message) {
            var alertPopup = $ionicPopup.alert({
                title: 'Attention!',
                template: message
            });
        };

        $scope.viewCustomer = function () {
            //
            $location.url('customer_profile/'+$scope.customerData.customer_id);

            $scope.cancelTnC();
        }
        
        $scope.acceptRequest = function () {
            ChangeAvailability.acceptRequest($scope.customerData,function (response_key) {
                if(response_key == 101) {
                   $scope.requestAccepted = false;
                }else if(response_key == 30) {
                    //launch the navigation screen
                }
            });
        }

        $scope.rejectRequest = function () {
            ChangeAvailability.rejectRequest();
        }

        $scope.requestAccepted = true;
    });
