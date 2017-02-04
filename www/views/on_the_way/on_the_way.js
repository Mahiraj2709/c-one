/**
 * Created by admin on 1/20/2017.
 */
angular.module('starter')
    .controller('OnTheWayCtrl', function ($scope, AppointmentData, LocationData, CONSTANTS, OnTheWayService, $location) {
            $scope.openChat = function () {
                $location.url('chat_room/' + AppointmentData.appointment.app_appointment_id);
            }
            //console.log(AppointmentData.appointment.customer_latitude);
            //profile image
            $scope.profileImage = CONSTANTS.CUSTOMER_PROFILE_IMAGE_URL + AppointmentData.appointment.profile_pic;
            $scope.request_id = "Reqeust ID-" + AppointmentData.appointment.app_appointment_id;
            //show map
            var mapOptions = {
                center: new google.maps.LatLng(42.2901715, -89.0730158),
                zoom: 15,
                disableDefaultUI: true, // a way to quickly hide all controls
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            $scope.on_way_map = new google.maps.Map(document.getElementById("on_way_map"), mapOptions);
            //draw path on the map
            var directionsService = new google.maps.DirectionsService;
            var directionsDisplay = new google.maps.DirectionsRenderer({
                suppressMarkers: true
            });
            directionsDisplay.setMap($scope.on_way_map);
            var onChangeHandler = function () {
                calculateAndDisplayRoute(directionsService, directionsDisplay);
            };
            /*document.getElementById('start').addEventListener('change', onChangeHandler);
             document.getElementById('end').addEventListener('change', onChangeHandler);*/
            var markerA = new google.maps.MarkerImage('img/mapcar-icon.png',
                new google.maps.Size(40, 40));
            var markerB = new google.maps.MarkerImage('img/map-marker.png',
                new google.maps.Size(40, 40));

            function calculateAndDisplayRoute(directionsService, directionsDisplay) {
                directionsService.route({
                    origin: new google.maps.LatLng(AppointmentData.appointment.customer_latitude, AppointmentData.appointment.customer_longitude),
                    destination: new google.maps.LatLng(LocationData.latitude, LocationData.longitude),
                    travelMode: 'DRIVING'
                }, function (response, status) {
                    if (status === 'OK') {
                        directionsDisplay.setDirections(response);
                        var _route = response.routes[0].legs[0];
                        pinA = new google.maps.Marker({
                            position: _route.start_location,
                            map: $scope.on_way_map,
                            icon: markerA
                        });
                        pinB = new google.maps.Marker({
                            position: _route.end_location,
                            map: $scope.on_way_map,
                            icon: markerB
                        });
                    } else {
                        window.alert('Directions request failed due to ' + status);
                    }
                });
            }

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
            $scope.iHaveArrived = function () {
                if (arrived) {
                    OnTheWayService.completeRide(AppointmentData.appointment, function () {
                        $location.path('bill');
                    });
                } else {
                    OnTheWayService.iHaveArrived(AppointmentData.appointment, function () {
                        arrived = true
                        $scope.btn_text = "COMPLETE"
                    });
                }
            }
        }
    ).service('OnTheWayService', function (CONSTANTS, $ionicLoading, $http) {
    this.iHaveArrived = function (appointment_data, callback) {
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
        formdata.append("distance", appointment_data.app_appointment_id);
        formdata.append("customer_address", appointment_data.customer_address);
        formdata.append("customer_latitude", appointment_data.customer_latitude);
        formdata.append("customer_longitude", appointment_data.customer_longitude);
        formdata.append("status", appointment_data.status);
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
                }
            })
            .error(function (err) {
                $ionicLoading.hide();
            });
    }
    this.completeRide = function (appointment_data, callback) {
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
                    callback()
                } else {
                }
            })
            .error(function (err) {
                $ionicLoading.hide();
            });
    }
})