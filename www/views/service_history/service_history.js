/**
 * Created by admin on 2/1/2017.
 */
angular.module('starter')
    .controller('HistoryCtrl',function ($scope,HistoryServices,$ionicPopup) {
        $scope.startDate = undefined;
        $scope.endDate = undefined;
// An alert dialog
        $scope.showAlert = function (message) {
            var alertPopup = $ionicPopup.alert({
                title: 'Attention!',
                template: message
            });
        };
        $scope.getHistory = function (startDate,endDate) {
            console.log(startDate)
            console.log(endDate)
            if(startDate != undefined && endDate != undefined) {
                //compare both dates
                //$scope.showAlert('Heoolr')
                if(startDate.getTime() > endDate.getTime()) {
                    $scope.showAlert('Start date must be less than end date!')
                }else {
                    //load the history
                    HistoryServices.getHistory(startDate.toISOString().split('T')[0], endDate.toISOString().split('T')[0],function (appointmentArray) {
                        $scope.appointmentArray = appointmentArray;
                    });
                }
            }
        }
        //date formatter   yourDate.toISOString().split('T')[0]

    })
    .service('HistoryServices',function ($ionicLoading,$http,CONSTANTS ) {
    this.getHistory = function (startDate,endDate, callback) {
        $ionicLoading.show({
            template: 'Loading...'
        });
        var formdata = new FormData();
        formdata.append("device_type", CONSTANTS.deviceType());
        formdata.append('session_token', window.localStorage.getItem("sess_tok"));
        formdata.append("language", "en");
        formdata.append("start_dt", startDate);
        formdata.append("end_dt", endDate);
        var request = {
            method: 'POST',
            url: CONSTANTS.BASE_URL + 'history',
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
                    callback(d.response_data.appointment)
                } else {
                }
            })
            .error(function (err) {
                $ionicLoading.hide();
            });
    }
})
