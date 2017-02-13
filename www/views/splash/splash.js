angular.module('starter')
    .controller('SplashCtrl', function ($scope, $timeout, $ionicSideMenuDelegate, $location, NotificationFactory,
                                        $ionicPush, LocationAlert, $ionicPlatform, LocationData, $rootScope,
                                        $cordovaGeolocation, $ionicLoading, popups, AppointmentData,
                                        $ionicHistory, services, ChatMessages) {
        $ionicSideMenuDelegate.canDragContent(false);
        $ionicPush.register().then(function (t) {
            return $ionicPush.saveToken(t);
        }).then(function (t) {
        });
        //MjZhODQ5ZjRmZjVkYWZiMDM1Mzc5NmE4YWRkZmRhYzE   customer  385 appointemnt id  customer id 70
        //NDIxYjZmMmFkOWU4OWI1NDJkMDBlYjQxMmM4MjkxYWU   cleaner  385 appointemnt id
        /*$timeout(function () {
         var loggedIn = localStorage.getItem('login');
         if (!loggedIn) {
         $location.url('/login');
         } else {
         $location.url('/home');
         }
         }, 2000);*/
        LocationAlert.isLocationEnabled(function (enabled) {
            if (enabled) {
                getLocation()
            }
        });
        $ionicPlatform.ready(function () {
            document.addEventListener("resume", function () {
                LocationAlert.isLocationEnabled(function (enabled) {
                    if (enabled) {
                        //get the
                        getLocation()
                    }
                });
                console.log("The application is resuming from the background");
            }, false);
        });
        function getLocation() {
            if (LocationData.latitude != undefined) return
            $ionicLoading.show({
                template: 'Getting current location...'
            })
            var options = {timeout: 10000, enableHighAccuracy: true};
            $cordovaGeolocation.getCurrentPosition(options).then(function (position) {
                $ionicLoading.hide()
                //my lat lng factory
                LocationData.latitude = position.coords.latitude
                LocationData.longitude = position.coords.longitude
                console.log(position.coords.latitude)
                $timeout(function () {
                    var loggedIn = localStorage.getItem('login');
                    if (!loggedIn) {
                        $location.url('/login');
                    } else {
                        $location.url('/home');
                    }
                }, 0);
            });
        }

        $scope.$on('cloud:push:notification', function (event, data) {
            var msg = data.message;
            //$scope.showAlert(msg.title + ': ' + msg.text);
            console.log(msg);
            // When button is clicked, the popup will be shown...
            if (msg.payload != undefined) {
                NotificationFactory.payload = msg.payload;
            }
        });
        $rootScope.$on('cloud:push:notification', function (event, data) {
            var msg = data.message;
            //$scope.showAlert(msg.title + ': ' + msg.text);
            console.log(msg);
            // When button is clicked, the popup will be shown...
            if (msg.payload != undefined) {
                var action = msg.payload.action
                if (action != undefined) {
                    switch (action) {
                        case 1:
                            //requst send by custoemr
                            AppointmentData.app_appointment_id = msg.payload.app_appointment_id
                            $rootScope.newRequestModal = popups.newRequestPopup()
                            break
                        case 2:
                            //request canceled by the customer
                            popups.requestCancelled(msg.payload.message)
                            $ionicHistory.clearCache().then(function(){
                                $location.url('/home');
                            });
                            break
                        case 13:
                            //chat message
                            console.log($ionicHistory.currentView())
                            if ($ionicHistory.currentView().stateName != 'chat_room') {
                                //load all messages from the service
                                services.getChatHistory(msg.payload.response_data.chat[0].app_appointment_id, function (response) {
                                    if (response.response_status == '1') {
                                        ChatMessages.messages = []
                                        for (var i = 0; i < response.response_data.chat.length; i++) {
                                            ChatMessages.pushChat(response.response_data.chat[i])
                                        }
                                    }
                                    $location.url('chat_room/' + msg.payload.response_data.chat[0].app_appointment_id)
                                })
                            } else {
                                ChatMessages.pushChat(response.response_data.chat[i]);
                                $location.url('chat_room/' + msg.payload.response_data.chat[0].app_appointment_id)
                            }
                            break
                    }
                }
            }
        });
    });
/*
 if ($scope.payload == undefined) {

 if(msg.payload.action == '13') {
 //ChatMessages.

 return
 }
 $scope.payload = msg.payload;
 $scope.openTnC();
 } else if ($scope.payload.app_appointment_id != msg.payload.app_appointment_id) {
 //if(msg.payload.)
 $scope.payload = msg.payload;
 $scope.openTnC();
 }*/
