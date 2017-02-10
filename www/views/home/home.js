angular.module('starter')
    .controller('HomeCtrl', function ($scope, $rootScope, $ionicPopup, $http, ChangeAvailability, $ionicHistory, NotificationFactory,
                                      $ionicLoading, $location, $ionicSideMenuDelegate, $ionicModal, LocationData,ChatMessages,
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
            center: new google.maps.LatLng(LocationData.latitude, LocationData.longitude),
            zoom: 15,
            disableDefaultUI: true, // a way to quickly hide all controls
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
        var options = {timeout: 10000, enableHighAccuracy: true};
        $cordovaGeolocation.getCurrentPosition(options).then(function (position) {
            //my lat lng factory
            LocationData.latitude = position.coords.latitude
            LocationData.longitude = position.coords.longitude
            var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            var mapOptions = {
                center: latLng,
                zoom: 15,
                disableDefaultUI: true, // a way to quickly hide all controls
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            $scope.map.panTo(latLng);
        }, function (error) {
            console.log("Could not get location");
        });
        //add marker and circles to the map
        var markers = [];
        var circles = [];
        //add camera idlle listerner to the map to chage the icons and the
        google.maps.event.addListener($scope.map, 'idle', function () {
            console.log("map is idle");
            //clear all marker
            clearMap()
            if ($scope.availability) {
                getMapMarkerAndCircle();
            }
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
        $rootScope.$on('cloud:push:notification', function (event, data) {
            var msg = data.message;
            //$scope.showAlert(msg.title + ': ' + msg.text);
            console.log(msg);
            // When button is clicked, the popup will be shown...
            if (msg.payload != undefined) {
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
                }
            }
        });
        $scope.availability = true;
        $scope.changeAvailability = function (available) {
            console.log(available);
            var status = 1;
            if (available) {
                status = 1;
            } else {
                status = 0;
            }
            ChangeAvailability.changeAvailability(status, function () {
                $scope.showAlert('Availability changed!');
                //hide all the
                if (!$scope.availability) {
                    clearMap();
                } else {
                    getMapMarkerAndCircle();
                }
            })
        }
        $scope.$on('$ionicView.enter', function () {
            // Anything you can think of
            console.log($ionicHistory.viewHistory());
            //load the modal again we come from customer profile view
            if ($ionicHistory.viewHistory().forwardView.stateName == 'customer_profile') {
                //show the modal agian
                $scope.modal.show();
            }
        });
        //map function for
        // Adds a marker to the map and push to the array.
        function getMapMarkerAndCircle() {
            //add marker for the center of the map
            // Create marker
            var centerMarker = new google.maps.Marker({
                map: $scope.map,
                position: $scope.map.getCenter(),
                //title: 'Some location',
                icon: {
                    url: 'img/mapcar-icon.png',
                    size: new google.maps.Size(40, 40),
                    /*origin: new google.maps.Point(0, 0),
                     anchor: new google.maps.Point(10, 20)*/
                }
            });
// Add circle overlay and bind to marker
            var circle = new google.maps.Circle({
                map: $scope.map,
                radius: 300,
                strokeWeight: 0,
                fillColor: '#adadad'
            });
            circle.bindTo('center', centerMarker, 'position');
            addCircle(circle);
            //another circle
            var outerCirle = new google.maps.Circle({
                map: $scope.map,
                radius: 600,
                strokeWeight: 0,
                fillColor: '#ADADAD'
            });
            outerCirle.bindTo('center', centerMarker, 'position');
            addMarker(centerMarker);
            addCircle(outerCirle);
        }

        function addMarker(marker) {
            markers.push(marker);
        }

        function addCircle(circle) {
            circles.push(circle);
        }

        // Sets the map on all markers in the array.
        function setMapOnAllMarkder(map) {
            for (var i = 0; i < markers.length; i++) {
                markers[i].setMap(map);
            }
        }

        function setMapOnAllCircles(map) {
            for (var i = 0; i < circles.length; i++) {
                circles[i].setMap(map);
            }
        }

        // Removes the markers from the map, but keeps them in the array.
        function clearMap() {
            setMapOnAllMarkder(null);
            setMapOnAllCircles(null);
        }

        if (NotificationFactory.payload != undefined) {
            if ($scope.payload == undefined) {
                $scope.payload = NotificationFactory.payload;
                $scope.openTnC();
            } else if ($scope.payload.app_appointment_id != msg.payload.app_appointment_id) {
                //if(msg.payload.)
                $scope.payload = NotificationFactory.payload;
                $scope.openTnC();
            }

            //clear notifica
        }
    });
