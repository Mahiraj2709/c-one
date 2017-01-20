/**
 * Created by admin on 1/20/2017.
 */
angular.module('starter')
    .controller('OnTheWayCtrl', function ($scope, $ionicModal) {

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
                    origin: new google.maps.LatLng(42.2731765, -89.0954501),
                    destination: new google.maps.LatLng(42.286586, -89.0308908),
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
            $scope.CallNumber = function () {
                var number = '7065257289';
                window.plugins.CallNumber.callNumber(function () {
                    //success logic goes here
                }, function () {
                    //error logic goes here
                }, number)
            };
            //video player modal
            $scope.videoLink = "http://airshareapp.onsisdev.info/public/media/video/1484900352.mp4";

            $scope.openVideoPlayer = function () {
                $ionicModal.fromTemplateUrl('views/dialog/video_player.html', {
                    scope: $scope,
                    animation: 'slide-in-up'
                }).then(function (modal) {
                    $scope.modal = modal;
                    $scope.modal.show();
                });
            };

            $scope.closeVideoPlayer = function () {
                $scope.modal.hide();
            }
        }
    )