/**
 * Created by admin on 1/18/2017.
 */
angular.module('starter')
    .service('CustomerData',function ($ionicLoading,CONSTANTS,$http) {
        this.getCustomerProfile = function (customer_id,callback) {
            $ionicLoading.show({
                template: 'Loading...'
            });
            var formdata = new FormData();
            formdata.append("device_type", CONSTANTS.deviceType());
            formdata.append('session_token', window.localStorage.getItem("sess_tok"));
            formdata.append("language", "en");
            formdata.append("view_customer_id", customer_id);
            var request = {
                method: 'POST',
                url: CONSTANTS.BASE_URL + 'viewprofile',
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
                        callback(d.response_data.profile[0])
                    } else {
                    }
                })
                .error(function (err) {
                    $ionicLoading.hide();
                });
        }
    })
