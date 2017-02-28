/**
 * Created by maahi on 10/02/17.
 */
angular.module('starter')
    .factory('services', function ($http, CONSTANTS, $ionicLoading) {
        function logout(responseCallback) {
            $ionicLoading.show({
                template: 'Loading...'
            });
            var formdata = new FormData()
            formdata.append("device_type", CONSTANTS.deviceType());
            formdata.append("session_token", window.localStorage.getItem("sess_tok"))
            formdata.append("language", "en")
            var request = {
                method: 'POST',
                url: CONSTANTS.BASE_URL + 'logout',
                data: formdata,
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
                .success(function (res) {
                    $ionicLoading.hide()
                    responseCallback(res)
                })
                .error(function (err) {
                    $ionicLoading.hide()
                    console.log(err);
                    //$scope.showAlert(err);
                });
        }

        function resetPassword(passwdObj, responseCallback) {
            $ionicLoading.show({
                template: 'Loading...'
            });
            var formdata = new FormData()
            formdata.append("device_type", CONSTANTS.deviceType());
            formdata.append("session_token", window.localStorage.getItem("sess_tok"))
            formdata.append("language", "en")
            formdata.append("newpassword", passwdObj.newpassword)
            formdata.append("oldpassword", passwdObj.oldpassword)
            var request = {
                method: 'POST',
                url: CONSTANTS.BASE_URL + 'changepassword',
                data: formdata,
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
                .success(function (res) {
                    $ionicLoading.hide()
                    console.log(res);
                    responseCallback(res)
                })
                .error(function (err) {
                    $ionicLoading.hide()
                    console.log(err);
                    //$scope.showAlert(err);
                });
        }

        function sendMessage(message, appointment_id) {
            var formdata = new FormData();
            formdata.append('device_type', CONSTANTS.deviceType());
            formdata.append('session_token', window.localStorage.getItem("sess_tok"));
            formdata.append('chat_message', message);
            formdata.append('app_appointment_id', appointment_id);
            formdata.append('language', 'en');
            console.log(formdata)
            var request = {
                method: 'POST',
                url: CONSTANTS.BASE_URL + 'appointmentchat',
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
                .success(function (res) {
                    //console.log(d)
                    //responseCallback(res)
                })
                .error(function (err) {
                });
        }

        function getChatHistory(appointment_id, responseCallback) {
            $ionicLoading.show({
                template: 'Loading previous chat...'
            });
            var formdata = new FormData();
            formdata.append('device_type', CONSTANTS.deviceType());
            formdata.append('session_token', window.localStorage.getItem("sess_tok"));
            formdata.append('app_appointment_id', appointment_id);
            formdata.append('language', 'en');
            console.log(formdata)
            var request = {
                method: 'POST',
                url: CONSTANTS.BASE_URL + 'chathistory',
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
                .success(function (res) {
                    console.log(res)
                    $ionicLoading.hide()
                    responseCallback(res)
                })
                .error(function (err) {
                    $ionicLoading.hide()
                });
        }

        function petProfileVideo(responseCallback) {
            $ionicLoading.show({
                template: 'Loading...'
            });
            var formdata = new FormData();
            formdata.append('device_type', CONSTANTS.deviceType());
            formdata.append('session_token', window.localStorage.getItem("sess_tok"));
            var request = {
                method: 'POST',
                url: CONSTANTS.BASE_URL + 'getuploadedprofilevideo',
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
                .success(function (res) {
                    console.log(res)
                    $ionicLoading.hide()
                    responseCallback(res)
                })
                .error(function (err) {
                    $ionicLoading.hide()
                });
        }

        function getstaticcontent(parentId,responseCallback) {
            $ionicLoading.show({
                template: 'Loading...'
            });
            var formdata = new FormData();
            formdata.append('device_type', CONSTANTS.deviceType());
            formdata.append('session_token', window.localStorage.getItem("sess_tok"));
            formdata.append('parent_id',parentId);
            var request = {
                method: 'POST',
                url: CONSTANTS.BASE_URL + 'getstaticcontent',
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
                .success(function (res) {
                    console.log(res)
                    $ionicLoading.hide()
                    responseCallback(res)
                })
                .error(function (err) {
                    $ionicLoading.hide()
                });
        }

        function getHistoryDetail(appointment_id,responseCallback) {
            $ionicLoading.show({
                template: 'Loading...'
            });
            var formdata = new FormData();
            formdata.append('device_type', CONSTANTS.deviceType());
            formdata.append('session_token', window.localStorage.getItem("sess_tok"));
            formdata.append('appointment_id',appointment_id );
            var request = {
                method: 'POST',
                url: CONSTANTS.BASE_URL + 'getappointmentdetail',
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
                .success(function (res) {
                    console.log(res)
                    $ionicLoading.hide()
                    responseCallback(res)
                })
                .error(function (err) {
                    $ionicLoading.hide()
                });
        }

        function completeRide(appointment_data, callback) {
            $ionicLoading.show({
                template: 'Loading...'
            });
            var formdata = new FormData();
            formdata.append("device_type", CONSTANTS.deviceType());
            formdata.append('session_token', window.localStorage.getItem("sess_tok"));
            formdata.append("language", "en");
            formdata.append("app_appointment_id", appointment_data.app_appointment_id);
            formdata.append("request_date", appointment_data.appointment_date);
            formdata.append("cleaner_timezone", appointment_data.appointment_timezone);
            formdata.append("customer_address", appointment_data.customer_address);
            formdata.append("customer_latitude", appointment_data.customer_latitude);
            formdata.append("customer_longitude", appointment_data.customer_longitude);
            var request = {
                method: 'POST',
                url: CONSTANTS.BASE_URL + 'cleanosaurrequestcomplete',
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
                        callback(d)
                    } else {
                        popups.showAlert(d.response_msg)
                    }
                })
                .error(function (err) {
                    $ionicLoading.hide();
                });
        }
        function updateLocation(cleanerData, callback) {
            var formdata = new FormData();
            formdata.append("device_type", CONSTANTS.deviceType());
            formdata.append('session_token', window.localStorage.getItem("sess_tok"));
            formdata.append("language", "en");
            formdata.append("app_appointment_id", cleanerData.app_appointment_id);
            formdata.append("cleaner_address", cleanerData.cleaner_address);
            formdata.append("cleaner_latitude", cleanerData.cleaner_latitude);
            formdata.append("cleaner_longitude", cleanerData.cleaner_longitude);
            var request = {
                method: 'POST',
                url: CONSTANTS.BASE_URL + 'getcleanerontheway',
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
                        callback(d)
                    } else {
                        //popups.showAlert(d.response_msg)
                    }
                })
                .error(function (err) {
                    $ionicLoading.hide();
                });
        }

        function sendfeedback(feedbackData, callback) {
            $ionicLoading.show({
                template: 'Loading...'
            });
            var formdata = new FormData();
            formdata.append("device_type", CONSTANTS.deviceType());
            formdata.append('session_token', window.localStorage.getItem("sess_tok"));
            formdata.append("language", "en");
            formdata.append("app_appointment_id", feedbackData.app_appointment_id);
            formdata.append("review", feedbackData.review);
            formdata.append("rating", feedbackData.rating);
            formdata.append("tip", 'na');
            var request = {
                method: 'POST',
                url: CONSTANTS.BASE_URL + 'sendfeedback',
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
                    callback(d)
                })
                .error(function (err) {
                    $ionicLoading.hide();
                });
        }

        function getRating(callback) {
            /*$ionicLoading.show({
                template: 'Loading...'
            });*/
            var formdata = new FormData();
            formdata.append("device_type", CONSTANTS.deviceType());
            formdata.append('session_token', window.localStorage.getItem("sess_tok"));
            formdata.append("language", "en");

            var request = {
                method: 'POST',
                url: CONSTANTS.BASE_URL + 'feedbackappointment',
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
                    //$ionicLoading.hide();
                    console.log(d)
                    callback(d)
                })
                .error(function (err) {
                    //$ionicLoading.hide();
                });
        }

        function getCustomerFeedback(customerId,callback) {
            /*$ionicLoading.show({
             template: 'Loading...'
             });*/
            var formdata = new FormData();
            formdata.append("device_type", CONSTANTS.deviceType());
            formdata.append('session_token', window.localStorage.getItem("sess_tok"));
            formdata.append("language", "en");
            formdata.append("view_customer_id", customerId);

            var request = {
                method: 'POST',
                url: CONSTANTS.BASE_URL + 'feedbackappointmentcustomer',
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
                    //$ionicLoading.hide();
                    console.log(d)
                    callback(d)
                })
                .error(function (err) {
                    //$ionicLoading.hide();
                });
        }

        function getNearbyCustomer(myData,callback) {
            var formdata = new FormData();
            formdata.append("device_type", CONSTANTS.deviceType());
            formdata.append('session_token', window.localStorage.getItem("sess_tok"));
            formdata.append("language", "en");
            formdata.append("latitude", myData.latitude);
            formdata.append("longitude", myData.longitude);
            formdata.append("address", myData.address);

            var request = {
                method: 'POST',
                url: CONSTANTS.BASE_URL + 'getsearchcustomer',
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
                    console.log(d)
                    callback(d)
                })
                .error(function (err) {
                });
        }
        function socialLogin(userData,callback) {
            var formdata = new FormData();
            formdata.append("device_type", CONSTANTS.deviceType());
            formdata.append("language", "en");
            formdata.append("latitude", userData.latitude);
            formdata.append("longitude", userData.longitude);
            formdata.append("email", userData.email);
            formdata.append("device_id", userData.device_id);
            formdata.append("device_token", userData.device_token);
            formdata.append("first_name", userData.first_name);
            formdata.append("last_name", userData.last_name);
            formdata.append("login_type", userData.login_type);
            formdata.append("address", userData.address);
            formdata.append("quick_blox_id", userData.quick_blox_id);
            formdata.append("reference_mode", userData.address);

            var request = {
                method: 'POST',
                url: CONSTANTS.BASE_URL + 'sociallogin',
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
                    console.log(d)
                    callback(d)
                })
                .error(function (err) {
                });
        }

        return {
            logout: logout,
            getNearbyCustomer:getNearbyCustomer,
            resetPassword: resetPassword,
            sendMessage: sendMessage,
            getChatHistory: getChatHistory,
            petProfileVideo: petProfileVideo,
            getHistoryDetail:getHistoryDetail,
            getstaticcontent:getstaticcontent,
            completeRide:completeRide,
            updateLocation:updateLocation,
            sendfeedback:sendfeedback,
            getRating:getRating,
            getCustomerFeedback:getCustomerFeedback,
            socialLogin:socialLogin
        }
    });
