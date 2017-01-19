angular.module('starter')
    .controller('ForgotPasswordCtrl', function ($scope, $ionicPopup, $http, $ionicLoading,$location,$ionicSideMenuDelegate, CONSTANTS) {
        $ionicSideMenuDelegate.canDragContent(false);
        $scope.forgotPasswordDetails = {
            email: '',
            device_type:CONSTANTS.deviceType(),
            language: 'en'
        };
        
        // An alert dialog
        $scope.showAlert = function (message) {
            var alertPopup = $ionicPopup.alert({
                title: 'Attention!',
                template: message
            });
        };

        //Loading in 
        $scope.showLoading = function () {
            $ionicLoading.show({
                template: 'Loading...'
            });
        };
        $scope.hideLoading = function () {
            $ionicLoading.hide();
        };

        var formdata = new FormData();

        $scope.forgotPassword = function () {
            if (!$scope.forgotPasswordDetails.email) {
                $scope.showAlert("Email Id is required");
            } else if (!CONSTANTS.validEmail($scope.forgotPasswordDetails.email)) {
                $scope.showAlert("Email Id is not valid.");
            } else {
                //call login api
                for (var key in $scope.forgotPasswordDetails) {
                    formdata.append(key, $scope.forgotPasswordDetails[key]);
                }
                $scope.showLoading();
                $scope.makeRequest();
            }
        };

        // NOW UPLOAD THE FILES.
        $scope.makeRequest = function () {

            var request = {
                method: 'POST',
                url: CONSTANTS.BASE_URL + 'forgotpassword',
                data: formdata,
                headers: {
                    'Content-Type': undefined
                }
            };

            // SEND THE FILES.
            $http(request)
                .success(function (d) {
                    $scope.hideLoading();
                    console.log(d);
                    if (d.response_status == "1") {
                        $scope.showAlert(d.response_msg);
                        $location.path('login');
                    } else {
                        $scope.showAlert(d.response_msg);
                    }
                })
                .error(function (err) {
                    $scope.hideLoading();
                    $scope.showAlert(err);
                    console.log(err);
                });
        };
    });