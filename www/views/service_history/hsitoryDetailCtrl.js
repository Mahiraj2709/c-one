/**
 * Created by admin on 2/13/2017.
 */
angular.module('starter')
    .controller('HistoryDetailCtrl',function ($scope,popups,services,$stateParams) {

        var mapOptions = {
            center: new google.maps.LatLng('0.0','0.0'),
            zoom: 15,
            disableDefaultUI: true, // a way to quickly hide all controls
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        $scope.map = new google.maps.Map(document.getElementById("googlMap"), mapOptions);

        services.getHistoryDetail($stateParams.app_appointment_id,function (resposne) {
                if(resposne.response_status == '1') {
                    $scope.historyDetail = resposne.response_data.appointment[0];

                    var latLng = new google.maps.LatLng($scope.historyDetail.customer_latitude, $scope.historyDetail.customer_longitude);
                    $scope.map.panTo(latLng);

                    var centerMarker = new google.maps.Marker({
                        map: $scope.map,
                        position: $scope.map.getCenter(),
                        //title: 'Some location',
                        icon: {
                            url: 'img/map-marker.png',
                            size: new google.maps.Size(40, 40)
                        }
                    });
                }
        })

    })