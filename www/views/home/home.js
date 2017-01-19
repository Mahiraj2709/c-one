angular.module('starter')
    .controller('HomeCtrl', function ($scope, $rootScope, $ionicPopup, $http, ChangeAvailability,$ionicHistory,
                                      $ionicLoading, $location, $ionicSideMenuDelegate, $ionicModal,
                                      $ionicViewService, $cordovaGeolocation, CONSTANTS) {
        var formdata = new FormData();
        //Loading in
        $scope.showLoading = function () {
            $ionicLoading.show({
                template: 'Loading...'
            });
        };
        $scope.hideLoading = function () {
            $ionicLoading.hide();
        };
        // An alert dialog
        $scope.showAlert = function (message) {
            var alertPopup = $ionicPopup.alert({
                title: 'Attention!',
                template: message
            });
        };
        $rootScope.userDetail = JSON.parse(window.localStorage.getItem("profile"));
        $rootScope.profile_pic = CONSTANTS.PROFILE_IMAGE_URL + $rootScope.userDetail.profile_pic;
        //show logout popup
        // A confirm dialog
        $rootScope.confirmLogout = function () {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Logout',
                template: 'Are you sure you want logout?'
            });
            confirmPopup.then(function (res) {
                if (res) {
                    formdata.append("device_type", CONSTANTS.deviceType());
                    formdata.append("session_token", window.localStorage.getItem("sess_tok"))
                    formdata.append("language", "en")
                    $ionicSideMenuDelegate.toggleLeft();
                    logoutRequest();
                } else {
                    console.log('You are not sure');
                }
            });
        };
        $rootScope.closeSideMenu = function () {
            $ionicSideMenuDelegate.toggleLeft()
        };
        //related to the home screen
        var mapOptions = {
            center: new google.maps.LatLng(43.07493, -89.381388),
            zoom: 15,
            disableDefaultUI: true, // a way to quickly hide all controls
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
        var options = {timeout: 10000, enableHighAccuracy: true};
        $cordovaGeolocation.getCurrentPosition(options).then(function (position) {
            var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            var mapOptions = {
                center: latLng,
                zoom: 15,
                disableDefaultUI: true, // a way to quickly hide all controls
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
        }, function (error) {
            console.log("Could not get location");
        });
        //call logout
        var logoutRequest = function () {
            $scope.showLoading();
            var request = {
                method: 'POST',
                url: CONSTANTS.BASE_URL + 'logout',
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
                    $scope.hideLoading();
                    if (d.response_status == "1") {
                        window.localStorage.removeItem("porfile");
                        window.localStorage.removeItem("login");
                        window.localStorage.removeItem("sess_tok");
                        $location.path('login');
                    } else {
                        $scope.showAlert(d.response_msg);
                    }
                })
                .error(function (err) {
                    $scope.hideLoading();
                    console.log(err);
                    $scope.showAlert(err);
                });
        };
        //popup for new request
        $scope.openTnC = function () {
            $ionicModal.fromTemplateUrl('views/dialog/new_request.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal = modal;
                $scope.modal.show();
            });
        };
        $scope.cancelTnC = function () {
            $scope.modal.hide();
        }
        /*$scope.showPopup = function () {
         $scope.data = {}
         // Custom popup
         $scope.myPopup = $ionicPopup.show({
         templateUrl: 'views/dialog/new_request.html',
         scope: $scope,
         });
         };*/
        //listen to the notification
        $scope.$on('cloud:push:notification', function (event, data) {
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
        });
        $scope.availability = false;
        $scope.changeAvailability = function (available) {
            console.log(available);
            var status = 0;
            if (available) {
                status = 1;
            } else {
                status = 0;
            }
            ChangeAvailability.changeAvailability(status, function () {
                $scope.showAlert('Availability changed!');
            })
        }

        $scope.$on('$ionicView.enter', function(){
            // Anything you can think of
            console.log($ionicHistory.viewHistory());
            //load the modal again we come from customer profile view
            if($ionicHistory.viewHistory().forwardView.stateName == 'customer_profile') {
            //show the modal agian
                $scope.modal.show();
            }
        });
    });
