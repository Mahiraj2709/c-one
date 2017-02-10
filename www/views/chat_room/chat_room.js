/**
 * Created by admin on 1/5/2017.
 */
angular.module('starter')
    .controller('ChatCtrl', function ($scope,$rootScope, $timeout, $ionicScrollDelegate,ChatService,$stateParams,
                                      ChatMessages,CONSTANTS) {

//        $rootScope.userDetail = JSON.parse(window.localStorage.getItem("profile"));
//        $rootScope.profile_pic = CONSTANTS.PROFILE_IMAGE_URL + $rootScope.userDetail.profile_pic;
        $scope.hideTime = true;
        var alternate,
            isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();

        $scope.sendMessage = function () {
            //alternate = !alternate;
            console.log('called')
            var d = new Date();
            d = d.toLocaleTimeString().replace(/:\d+ /, ' ');
//            ChatService.sendMessage($scope.data.message,$stateParams.app_appointment_id);
            ChatMessages.sendMessage($scope.data.message,$stateParams.app_appointment_id);
            ChatMessages.pushChat({
                userId: '12345',
                text: $scope.data.message,
                customer_profile_pic: $rootScope.profile_pic,
                cleaner_fname:$rootScope.userDetail.first_name,
                cleaner_lname:$rootScope.userDetail.last_name,
                created_dt:'',
                time: d
            });
            delete $scope.data.message;
            $ionicScrollDelegate.scrollBottom(true);
            //console.log($scope.messages)

        };
        $scope.inputUp = function () {
            if (isIOS) $scope.data.keyboardHeight = 216;
            $timeout(function () {
                $ionicScrollDelegate.scrollBottom(true);
            }, 300);
        };
        $scope.inputDown = function () {
            if (isIOS) $scope.data.keyboardHeight = 0;
            $ionicScrollDelegate.resize();
        };
        $scope.closeKeyboard = function () {
             cordova.plugins.Keyboard.close();
        };
        $scope.data = {};
        $scope.myId = '12345';
        $scope.messages = ChatMessages.messages;

        function pushMessage(chat) {
            console.log(chat)
            console.log(ChatMessages)
            ChatMessages.pushChat({
                userId: '54321',
                text: chat.message,
                customer_profile_pic:CONSTANTS.CUSTOMER_PROFILE_IMAGE_URL + chat.cleaner_profile_pic,
                cleaner_fname:chat.cleaner_fname,
                cleaner_lname:chat.cleaner_lname,
                created_dt:chat.created_dt,
                time: '323'
            });
            $timeout(function () {
                $ionicScrollDelegate.scrollBottom(true);
            }, 100);

        }

        /*$scope.$on('cloud:push:notification', function (event, data) {
            var msg = data.message;
            //$scope.showAlert(msg.title + ': ' + msg.text);
            console.log(msg);
            // When button is clicked, the popup will be shown...
            if (msg.payload != undefined) {
                pushMessage(msg.payload.response_data.chat[0]);
                //pushMessage(msg.payload.response_data.chat[0]);
                if ($scope.payload == undefined) {
                    $scope.payload = msg.payload;
                    //$scope.openTnC();
                } else if ($scope.payload.response_data.chat[0].app_appointment_id != msg.payload.response_data.chat[0].app_appointment_id) {
                    //if(msg.payload.)
                    $scope.payload = msg.payload;
                    if(msg.paload.action != undefined && msg.paload.action == '13') {
                        pushMessage(msg.payload.response_data.chat[0]);
                    }

                    //$scope.openTnC();
                }
            }
        });*/

        //listen to the notification
        /*$scope.$on('cloud:push:notification', function (event, data) {
            var msg = data.message;
            //$scope.showAlert(msg.title + ': ' + msg.text);
            console.log(msg);
            // When button is clicked, the popup will be shown...
            if (msg.payload != undefined) {
                if ($scope.payload == undefined) {
                    $scope.payload = msg.payload;
                    $scope.openTnC();
                } else if ($scope.payload.app_appointment_id != msg.payload.app_appointment_id) {
                    //if(msg.payload.)
                    $scope.payload = msg.payload;
                    $scope.openTnC();
                }
            }
        });*/

    })
    .directive('input', function($timeout) {
        return {
            restrict: 'E',
            scope: {
                'returnClose': '=',
                'onReturn': '&',
                'onFocus': '&',
                'onBlur': '&'
            },
            link: function(scope, element, attr) {
                element.bind('focus', function(e) {
                    if (scope.onFocus) {
                        $timeout(function() {
                            scope.onFocus();
                        });
                    }
                });
                element.bind('blur', function(e) {
                    if (scope.onBlur) {
                        $timeout(function() {
                            scope.onBlur();
                        });
                    }
                });
                element.bind('keydown', function(e) {
                    if (e.which == 13) {
                        if (scope.returnClose) element[0].blur();
                        if (scope.onReturn) {
                            $timeout(function() {
                                scope.onReturn();
                            });
                        }
                    }
                });
            }
        }
    })

    .factory('ChatMessages',function ($http,CONSTANTS) {
        var messages = [];
        function pushChat(chat) {
            messages.push({
                userId: '54321',
                text: chat.message,
                customer_profile_pic:CONSTANTS.CUSTOMER_PROFILE_IMAGE_URL + chat.cleaner_profile_pic,
                cleaner_fname:chat.cleaner_fname,
                cleaner_lname:chat.cleaner_lname,
                created_dt:chat.created_dt,
                time: '323'
            })
        }

        function sendChat(message,appointment_id) {
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
                .success(function (d) {
                    console.log(d)
                    if (d.response_status == "1") {

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
        return {
            messages:messages,
            pushChat:pushChat,
            sendChat:sendChat
        };
    })
;
