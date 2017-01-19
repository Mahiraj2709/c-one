/**
 * Created by admin on 1/2/2017.
 */
angular.module('starter')
    .service('UploadImageService', function (CONSTANTS, ImgFormData, $http) {
        this.uploadImage = function (imgData, position) {
            var formdata = new FormData();
            formdata.append('device_type', CONSTANTS.deviceType());
            formdata.append('session_token', window.localStorage.getItem("sess_tok"));
            formdata.append('profile_pic', ImgFormData(imgData), 'image.jpeg');
            formdata.append('position', position);
            var request = {
                method: 'POST',
                url: CONSTANTS.BASE_URL + 'uploadprofilephoto',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data: formdata,
                headers: {
                    'Content-Type': undefined
                }
            };
            // SEND THE FILES.
            $http(request)
                .success(function (d) {
                    //$scope.hideLoading();
                    //$scope.showAlert(JSON.stringify(d));
                    if (d.response_status == "1") {
                        console.log("image uploaded successfully");
                    } else {
                        //$scope.showAlert(d.response_msg);
                    }
                })
                .error(function (err) {
                    /*$scope.hideLoading();*/
                    console.log(err);
//                    $scope.showAlert(err);
                });
        }
    })
    .service('UploadVideo', function (CONSTANTS) {
    })
    .service('GetCarInfo', function (CONSTANTS, $http, $ionicLoading) {
        this.getCarMake = function (callback) {
            $ionicLoading.show({
                template: 'Loading...'
            })
            var carForm = new FormData();
            carForm.append("device_type", CONSTANTS.deviceType());
            var request = {
                method: 'POST',
                url: CONSTANTS.BASE_URL + 'getmake',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data: carForm,
                headers: {
                    'Content-Type': undefined
                }
            };
            // SEND THE FILES.
            $http(request)
                .success(function (d) {
                    $ionicLoading.hide();
                    if (d.response_status == "1") {
                        callback(d.response_data.profile)
                    } else {
                    }
                })
                .error(function (err) {
                    $ionicLoading.hide();
                });
        };
        this.getCarModel = function (makeId, callback) {
            $ionicLoading.show({
                template: 'Loading...'
            });
            var carForm = new FormData();
            carForm.append("device_type", CONSTANTS.deviceType());
            carForm.append("make_id", makeId)
            var request = {
                method: 'POST',
                url: CONSTANTS.BASE_URL + 'getmodel',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data: carForm,
                headers: {
                    'Content-Type': undefined
                }
            };
            // SEND THE FILES.
            $http(request)
                .success(function (d) {
                    $ionicLoading.hide();
                    if (d.response_status == "1") {
                        callback(d.response_data.profile)
                    } else {
                    }
                })
                .error(function (err) {
                    $ionicLoading.hide();
                });
        }
    })
    .factory('LoadImagesService', function ($http, $ionicLoading, CONSTANTS) {
    return function (callback) {
        $ionicLoading.show({
            template: 'Loading...'
        });
        var formdata = new FormData();
        formdata.append('device_type', CONSTANTS.deviceType());
        formdata.append('session_token', window.localStorage.getItem("sess_tok"));
        var request = {
            method: 'POST',
            url: CONSTANTS.BASE_URL + 'getuploadedprofilephoto',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: formdata,
            headers: {
                'Content-Type': undefined
            }
        };
        // SEND THE FILES.
        $http(request)
            .success(function (d) {
                $ionicLoading.hide();
                //$scope.showAlert(JSON.stringify(d));
                if (d.response_status == "1") {
                    return callback(d.response_data.profile);
                } else {
                }
            })
            .error(function (err) {
                /*$scope.hideLoading();*/
                $ionicLoading.hide();
                console.log(err);
//                    $scope.showAlert(er
            });
    }
});
