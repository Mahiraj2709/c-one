/**
 * Created by Mahiraj Singh on 1/5/2017.
 */
angular.module('starter')
    .controller('ChatCtrl', function ($scope, $rootScope, $timeout, $ionicScrollDelegate, $stateParams, services, ChatMessages, CONSTANTS) {
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
            services.sendMessage($scope.data.message, $stateParams.app_appointment_id);
            ChatMessages.pushChat({
                userType: '1',
                text: $scope.data.message,
                profile_pic: $rootScope.profile_pic,
                fname: $rootScope.userDetail.first_name,
                lname: $rootScope.userDetail.last_name,
                created_dt: '',
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
        $scope.messages = $rootScope.messages;
        $scope.CallCustomer = function () {
            var number = ChatMessages.mobileNumber;
            if (number == undefined) {
                for(var i=0; i< $rootScope.messages.length;i++) {
                    if($rootScope.messages[i].userType == 2) {
                        number = $rootScope.messages[i].mobile; break;
                    }
                }
            }
            window.plugins.CallNumber.callNumber(function () {
                //success logic goes here
            }, function () {
                //error logic goes here
            }, number)
        };
    })
    .directive('input', function ($timeout) {
        return {
            restrict: 'E',
            scope: {
                'returnClose': '=',
                'onReturn': '&',
                'onFocus': '&',
                'onBlur': '&'
            },
            link: function (scope, element, attr) {
                element.bind('focus', function (e) {
                    if (scope.onFocus) {
                        $timeout(function () {
                            scope.onFocus();
                        });
                    }
                });
                element.bind('blur', function (e) {
                    if (scope.onBlur) {
                        $timeout(function () {
                            scope.onBlur();
                        });
                    }
                });
                element.bind('keydown', function (e) {
                    if (e.which == 13) {
                        if (scope.returnClose) element[0].blur();
                        if (scope.onReturn) {
                            $timeout(function () {
                                scope.onReturn();
                            });
                        }
                    }
                });
            }
        }
    }).factory('ChatMessages', function ($http, CONSTANTS, $rootScope) {
    function pushMyChat(chat) {
        $rootScope.messages.push(chat)
    }

    function pushNotificationChat(chat) {
        console.log(chat)
        console.log(this.messages)
        $rootScope.messages.push({
            userType: '2',
            text: chat.message,
            profile_pic: CONSTANTS.CUSTOMER_PROFILE_IMAGE_URL + chat.cleaner_profile_pic,
            fname: chat.cleaner_fname,
            lname: chat.cleaner_lname,
            created_dt: chat.created_dt,
            mobile: chat.cleaner_mobile,
            time: '323'
        })
        $rootScope.$apply()
    }

    function pushChatHistory(chatArray) {
        //reverser the array
        chatArray.reverse()
        for (var i = 0; i < chatArray.length; i++) {
            var userType = '1'
            var profileImage = $rootScope.profile_pic
            var fName = chatArray[i].customer_fname;
            var lName = chatArray[i].customer_lname;
            var mobile = undefined
            if (chatArray[i].sender_user_type == '2') {
                userType = '2'
                profileImage = CONSTANTS.CUSTOMER_PROFILE_IMAGE_URL + chatArray[i].customer_profile_pic
                fName = chatArray[i].customer_fname;
                lName = chatArray[i].customer_lname;
                mobile = chatArray[i].customer_mobile
            }
            $rootScope.messages.push({
                userType: userType,
                text: chatArray[i].chat_message,
                profile_pic: profileImage,
                fname: fName,
                lname: lName,
                created_dt: chatArray[i].created_dt,
                mobile:mobile,
                time: '323'
            })
        }
    }
    return {
        mobileNumber: undefined,
        pushChat: pushMyChat,
        pushNotificationChat: pushNotificationChat,
        pushChatHistory: pushChatHistory
    };
});
