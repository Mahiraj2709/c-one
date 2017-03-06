/**
 * Created by Mahiraj Singh on 1/20/2017.
 */
angular.module('starter')
    .controller('OnTheWayCtrl', function ($scope, popups, AppointmentData, $ionicPopup, LocationData, CONSTANTS, ChatMessages, OnTheWayService, services, $location) {

        services.getCustomerFeedback(AppointmentData.appointment.customer_id, function (response) {
                if (response.response_status == '1') {
                    $scope.cleanerFeedback = response.response_data.rating;
                }
            })

            var markerA = new google.maps.MarkerImage('img/map-marker.png',
                new google.maps.Size(40, 40));
            var markerB = new google.maps.MarkerImage('img/mapcar-icon.png',
                new google.maps.Size(40, 40));
            $scope.appointmentDetail = AppointmentData.appointment
            OnTheWayService.getDistanceMatrix(new google.maps.LatLng(LocationData.latitude, LocationData.longitude),
                new google.maps.LatLng(AppointmentData.appointment.customer_latitude, AppointmentData.appointment.customer_longitude),
                function (response) {
                    if (response != undefined) {
                        //distansc is
                      if(response.rows[0].elements[0].status == 'OK'){
                        $scope.distance = response.rows[0].elements[0].distance.value;
                        $scope.duration = response.rows[0].elements[0].duration.value;
                      }
                    }
                })
            if (AppointmentData.appointment.status == '4') {
                $scope.btn_text = "I HAVE ARRIVED";
                var arrived = true;
                $scope.onWayTitle = 'I have arrived'
            } else $scope.onWayTitle = 'I am on the way'
            $scope.openChat = function () {
                ChatMessages.mobileNumber = AppointmentData.appointment.mobile
                services.getChatHistory(AppointmentData.appointment.app_appointment_id, function (response) {
                    if (response.response_status == '1') {
                        ChatMessages.pushChatHistory(response.response_data.chat)
                    }
                    $location.url('chat_room/' + AppointmentData.appointment.app_appointment_id)
                })
                //$location.url('chat_room/' + AppointmentData.appointment.app_appointment_id);
            }
            //console.log(AppointmentData.appointment.customer_latitude);
            //profile image
            $scope.profileImage = CONSTANTS.CUSTOMER_PROFILE_IMAGE_URL + AppointmentData.appointment.profile_pic;
            $scope.request_id = "Reqeust ID-" + AppointmentData.appointment.app_appointment_id;
            //show map
            var mapOptions = {
                center: new google.maps.LatLng(42.2901715, -89.0730158),
                zoom: 13,
                disableDefaultUI: true, // a way to quickly hide all controls
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            $scope.on_way_map = new google.maps.Map(document.getElementById("on_way_map"), mapOptions);
            var pinA = new google.maps.Marker({
                //position: _route.start_location,
                map: $scope.on_way_map,
                icon: markerA
            });
            var pinB = new google.maps.Marker({
                //position: _route.end_location,
                map: $scope.on_way_map,
                icon: markerB
            });
            //draw path on the map
            var directionsService = new google.maps.DirectionsService;
            var directionsDisplay = new google.maps.DirectionsRenderer({
                suppressMarkers: true
            });
            directionsDisplay.setMap($scope.on_way_map);
            var onChangeHandler = function () {
                calculateAndDisplayRoute(directionsService, directionsDisplay, {
                    myLatitude: LocationData.latitude,
                    myLongitude: LocationData.longitude
                });
            };
            /*document.getElementById('start').addEventListener('change', onChangeHandler);
             document.getElementById('end').addEventListener('change', onChangeHandler);*/
            function calculateAndDisplayRoute(directionsService, directionsDisplay, LatLng) {
                directionsService.route({
                    origin: new google.maps.LatLng(AppointmentData.appointment.customer_latitude, AppointmentData.appointment.customer_longitude),
                    destination: new google.maps.LatLng(LatLng.myLatitude, LatLng.myLongitude),
                    travelMode: 'DRIVING'
                }, function (response, status) {
                    if (status === 'OK') {
                        directionsDisplay.setDirections(response);
                        var _route = response.routes[0].legs[0];
                        //clearMarkers();
                        //set the marker again
                        pinA.setPosition(_route.start_location)
                        //markers[0].icon = markerA
                        pinB.setPosition(_route.end_location)
                        //markers[1].icon = markerB
                    } else {
                        //window.alert('Directions request failed due to ' + status);
                    }
                });
            }

// Sets the map on all markers in the array.
            /*function setMapOnAll(map) {
             for (var i = 0; i < markers.length; i++) {
             markers[i].setMap(map);
             }
             }

             // Removes the markers from the map, but keeps them in the array.
             function clearMarkers() {
             setMapOnAll(null);
             }
             */
            onChangeHandler();
            $scope.CallCustomer = function () {
                var number = AppointmentData.appointment.mobile;
                window.plugins.CallNumber.callNumber(function () {
                    //success logic goes here
                }, function () {
                    //error logic goes here
                }, number)
            };
            $scope.btn_text = "I HAVE ARRIVED";
            var arrived = false;

            function onSuccess(position) {
                //console.log(position.coords.latitude)
                //console.log(position.coords.longitude)
//            draw the map agian
                calculateAndDisplayRoute(directionsService, directionsDisplay, {
                    myLatitude: position.coords.latitude,
                    myLongitude: position.coords.longitude
                });
                //update position to the server
                services.updateLocation({
                    app_appointment_id: AppointmentData.appointment.app_appointment_id,
                    cleaner_address: 'na',
                    cleaner_latitude: position.coords.latitude + "",
                    cleaner_longitude: position.coords.longitude + '',
                }, function (response) {
                })
            }

            // onError Callback receives a PositionError object
            //
            function onError(error) {
                /*alert('code: ' + error.code + '\n' +
                 'message: ' + error.message + '\n');*/
            }

            // Options: throw an error if no update is received every 30 seconds.
            //
            var watchID = navigator.geolocation.watchPosition(onSuccess, onError, {
                maximumAge: 3000,
                timeout: 5000,
                enableHighAccuracy: false
            });
//          Stop watching for changes to the device's location referenced by the watchID parameter.
            //navigator.geolocation.clearWatch(watchID);

            $scope.$on("$ionicView.beforeLeave", function (event, data) {
                navigator.geolocation.clearWatch(watchID);
            });

            $scope.iHaveArrived = function () {

                navigator.geolocation.clearWatch(watchID);

                if (arrived) {
                    services.completeRide(AppointmentData.appointment, function (response) {
                        if (response.response_status == '1') {
                            $location.url('/bill');
                        }
                        /*
                         $ionicHistory.clearCache().then(function () {
                         })
                         */
                    })
                } else {
                    OnTheWayService.iHaveArrived(AppointmentData.appointment, function () {
                        arrived = true
                        $scope.btn_text = "COMPLETE"
                        $scope.onWayTitle = 'I have arrived'
                    });
                }
            }

            $scope.showAppointment = function () {
                $scope.appoimentPopup = $ionicPopup.show({
                    templateUrl: 'views/dialog/appointment_popup.html',
                    scope: $scope,
                });
            }
            $scope.hideAppointmentPopup = function () {
                $scope.appoimentPopup.close()
            }
        }
    ).service('OnTheWayService', function (CONSTANTS, LocationData, $ionicLoading, $http, popups) {
    this.iHaveArrived = function (appointment_data, callback) {
        $ionicLoading.show({
            template: 'Loading...'
        });
        var formdata = new FormData();
        formdata.append("device_type", CONSTANTS.deviceType());
        formdata.append('session_token', window.localStorage.getItem("sess_tok"));
        formdata.append("language", "en");
        formdata.append("app_appointment_id", appointment_data.app_appointment_id);
        formdata.append("request_date", new Date().toISOString().split('T')[0]);
        formdata.append("cleaner_timezone", appointment_data.appointment_timezone);
        formdata.append("distance", "34");
        formdata.append("cleaner_address", appointment_data.customer_address);
        formdata.append("cleaner_latitude", LocationData.latitude);
        formdata.append("cleaner_longitude", LocationData.longitude);
        formdata.append("status", "5");
        var request = {
            method: 'POST',
            url: CONSTANTS.BASE_URL + 'cleanosaurhasarrived',
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
                    popups.showAlert(d.response_msg)
                }
            })
            .error(function (err) {
                $ionicLoading.hide();
            });
    }
    this.getDistanceMatrix = function (origin, destination, callback) {
        var service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix(
            {
                origins: [origin],
                destinations: [destination],
                travelMode: 'DRIVING',
                unitSystem: google.maps.UnitSystem.METRIC,
                avoidHighways: false,
                avoidTolls: false
            }, function (response, status) {
                if (status !== 'OK') {
                    alert('Error was: ' + status);
                } else {
                    console.log(response.rows)
                    callback(response)
                }
            });
    }
})
