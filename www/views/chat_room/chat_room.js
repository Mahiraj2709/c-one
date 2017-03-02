/**
 * Created by Mahiraj Singh on 1/5/2017.
 */
angular.module('starter')

    .controller('ChatCtrl', function ($scope,$rootScope, $timeout, $ionicScrollDelegate,$stateParams,services, ChatMessages,CONSTANTS) {

        $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
            viewData.enableBack = true;
        });
//        $rootScope.userDetail = JSON.parse(window.localStorage.getItem("profile"));
//        $rootScope.profile_pic = CONSTANTS.PROFILE_IMAGE_URL + $rootScope.userDetail.profile_pic;
        $scope.hideTime = true;
        var alternate,
            isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();

        $scope.sendMessage = function () {
            //alternate = !alternate;
            console.log('called')
          console.log(ChatMessages.messages)
          var d = new Date();
            d = d.toLocaleTimeString().replace(/:\d+ /, ' ');
//            ChatService.sendMessage($scope.data.message,$stateParams.app_appointment_id);
            services.sendMessage($scope.data.message,$stateParams.app_appointment_id);

            ChatMessages.pushChat({
                userType: '1',
                text: $scope.data.message,
                profile_pic: $rootScope.profile_pic,
                fname:$rootScope.userDetail.first_name,
                lname:$rootScope.userDetail.last_name,
                created_dt:'',
                time: d
            });
            $scope.$apply();
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
    }).factory('ChatMessages',function ($http,CONSTANTS,$rootScope) {

        var messages = [];

        function pushMyChat(chat) {
            this.messages.push(chat)
        }

        function pushNotificationChat(chat) {
            //console.log(chat)
            //console.log(this.messages)
            this.messages.push({
                userType: '2',
                text: chat.message,
                profile_pic: CONSTANTS.CUSTOMER_PROFILE_IMAGE_URL + chat.customer_profile_pic,
                fname: chat.customer_fname,
                lname: chat.customer_lname,
                created_dt: chat.created_dt,
                time: '323'
            })
        }

        function pushChatHistory(chatArray) {

            for (var i = 0; i < chatArray.length; i++){
                var userType = '1'
                var profileImage = $rootScope.profile_pic
                var fName = chatArray[i].customer_fname;
                var lName = chatArray[i].customer_lname;
                if(chatArray[i].sender_user_type == '2'){
                    userType = '2'
                    profileImage = CONSTANTS.CUSTOMER_PROFILE_IMAGE_URL + chatArray[i].customer_profile_pic
                    fName = chatArray[i].customer_fname;
                    lName = chatArray[i].customer_lname;
                }
                this.messages.push({
                    userType: userType,
                    text: chatArray[i].chat_message,
                    profile_pic: profileImage,
                    fname: fName,
                    lname: lName,
                    created_dt: chatArray[i].created_dt,
                    time: '323'
                })
            }
        }
        return {
            messages: messages,
            pushChat: pushMyChat,
            pushNotificationChat:pushNotificationChat,
            pushChatHistory:pushChatHistory
        };
    })
;
