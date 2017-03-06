angular.module('starter')
    .controller('ResetPasswordCtrl', function ($scope, $location,popups,services,$ionicHistory) {
        $scope.password = {
            oldpassword:undefined,
            newpassword:undefined,
            confirmpassword:undefined,
        }

        $scope.resetPasswd = function () {
            if (!$scope.password.oldpassword) {
                popups.showAlert("Old password can't be empty!"); return
            } else if ($scope.password.oldpassword.length < 6) {
                popups.showAlert("Password must contain at least 6 characters!");return
            } else if (!$scope.password.newpassword) {
                popups.showAlert("Old password can't be empty!");return
            } else if ($scope.password.newpassword.length < 6) {
                popups.showAlert("Old password can't be empty!");return
            } else if (!$scope.password.confirmpassword) {
                popups.showAlert("Please confirm password!");return
            } else if (String($scope.password.newpassword) != String($scope.password.confirmpassword) ) {
                popups.showAlert("Password did not match!");return
            }else {
                services.resetPassword($scope.password,function (resposne) {
                    popups.showAlert(resposne.response_msg)
                    if(resposne.response_status == '1') {
                        $ionicHistory.clearCache().then(function () {
                            $location.url('/home')
                        })
                    }
                })
            }
        }
    });