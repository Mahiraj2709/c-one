/**
 * Created by admin on 1/13/2017.
 */
angular.module('starter')
    .service('ChangeAvailability', function (CONSTANTS, $http, $ionicLoading, $rootScope) {
        this.changeAvailability = function (status, callback) {
            $ionicLoading.show({
                template: 'Loading...'
            });
            var formdata = new FormData();
            formdata.append("device_type", CONSTANTS.deviceType());
            formdata.append('session_token', window.localStorage.getItem("sess_tok"));
            formdata.append("language", "en");
            formdata.append("available_status", status);
            var request = {
                method: 'POST',
                url: CONSTANTS.BASE_URL + 'changeavailability',
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
                    console.log(d)
                    if (d.response_status == "1") {
                        callback()
                    } else {
                    }
                })
                .error(function (err) {
                    $ionicLoading.hide();
                });
        }
        this.getCustomerProfile = function (app_appointment_id, callback) {
            $ionicLoading.show({
                template: 'Loading...'
            });
            var formdata = new FormData();
            formdata.append("device_type", CONSTANTS.deviceType());
            formdata.append('session_token', window.localStorage.getItem("sess_tok"));
            formdata.append("language", "en");
            formdata.append("app_appointment_id", app_appointment_id);
            var request = {
                method: 'POST',
                url: CONSTANTS.BASE_URL + 'getappointment',
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
                    console.log(d)
                    if (d.response_status == "1") {
                        callback(d.response_data)
                    } else {
                    }
                })
                .error(function (err) {
                    $ionicLoading.hide();
                });
        }
        this.acceptRequest = function (customerData, callback) {
            $ionicLoading.show({
                template: 'Loading...'
            });
            var formdata = new FormData();
            formdata.append("device_type", CONSTANTS.deviceType());
            formdata.append('session_token', window.localStorage.getItem("sess_tok"));
            formdata.append("language", "en");
            formdata.append("app_appointment_id", customerData.app_appointment_id);
            formdata.append("request_date", customerData.appointment_date);
            formdata.append("cleaner_timezone", customerData.appointment_timezone);
            formdata.append("status", "5");
            formdata.append("address", customerData.customer_address);
            formdata.append("latitude", customerData.customer_latitude);
            formdata.append("longitude", customerData.customer_longitude);
            var request = {
                method: 'POST',
                url: CONSTANTS.BASE_URL + 'acceptrequest',
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
                    console.log(d)
                    callback(d.response_key)
                    if (d.response_status == "1") {
                    } else {
                    }
                })
                .error(function (err) {
                    $ionicLoading.hide();
                });
        }
        this.rejectRequest = function (callback) {
            $ionicLoading.show({
                template: 'Loading...'
            });
            var formdata = new FormData();
            formdata.append("device_type", CONSTANTS.deviceType());
            formdata.append('session_token', window.localStorage.getItem("sess_tok"));
            formdata.append("language", "en");
            formdata.append("app_appointment_id", $rootScope.payload.app_appointment_id);
            var request = {
                method: 'POST',
                url: CONSTANTS.BASE_URL + 'getappointment',
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
                    console.log(d)
                    if (d.response_status == "1") {
                        callback(d.response_data)
                    } else {
                    }
                })
                .error(function (err) {
                    $ionicLoading.hide();
                });
        }
        this.getPendingAppointment = function (callback) {
            $ionicLoading.show({
                template: 'Loading...'
            });
            var formdata = new FormData();
            formdata.append("device_type", CONSTANTS.deviceType());
            formdata.append('session_token', window.localStorage.getItem("sess_tok"));
            formdata.append("language", "en");
            formdata.append("app_appointment_id", $rootScope.payload.app_appointment_id);
            var request = {
                method: 'POST',
                url: CONSTANTS.BASE_URL + 'sdfsdfsa',
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
                    console.log(d)
                    if (d.response_status == "1") {
                        callback(d.response_data)
                    } else {
                    }
                })
                .error(function (err) {
                    $ionicLoading.hide();
                });
        }
    });