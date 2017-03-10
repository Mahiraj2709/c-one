angular.module('starter')

    .controller('LoginCtrl', function ($scope,$rootScope, $ionicPopup, $http, $ionicLoading, $cordovaOauth,LocationData,popups,
                                       $cordovaGeolocation, $location, $ionicViewService,$ionicPush,services,$ionicHistory,
                                       $ionicSideMenuDelegate, CONSTANTS) {
        $ionicViewService.clearHistory();
        $ionicSideMenuDelegate.canDragContent(false)
        var posOptions = { timeout: 10000, enableHighAccuracy: false };
        $cordovaGeolocation
            .getCurrentPosition(posOptions)
            .then(function (position) {
                var lat = position.coords.latitude
                var long = position.coords.longitude
                LocationData.latitude = lat
                LocationData.longitude = long
                $scope.loginDetails.latitude = lat
                $scope.loginDetails.longitude = long

                //$scope.showAlert(lat + "  " + long);
            }, function (err) {
                // error
            });


        $scope.loginDetails = {
            email: '',
            password: '',
            device_type: CONSTANTS.deviceType(),
            device_token: 'rer',
            device_id: 'er',
            latitude: '0.0',
            longitude: '0.0',
            language: 'en'
        };

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

        // facebook(string clientId, array appScope);
        //facebook login
        $scope.fbLogin = function () {

            $cordovaOauth.facebook(CONSTANTS.fbAppId, ["email", "public_profile"]).then(function (result) {

                $http.get("https://graph.facebook.com/v2.2/me", { params: { access_token: result.access_token, fields: "id,email,name,gender,picture", format: "json" } }).then(function (result) {
                    //$scope.showAlert(JSON.stringify(result.data));
                    //$scope.profileData = ;
                    services.socialLogin({
                        device_token:$ionicPush._token.token,
                        device_id:$ionicPush._token.id,
                        email:result.data.email,
                        latitude:LocationData.latitude,
                        longitude:LocationData.longitude,
                    },function (response) {

                        if(response.response_status == '1') {
                            $ionicHistory.clearCache().then(function () {

                                window.localStorage.setItem("profile", JSON.stringify(d.response_data.user_info));
                                window.localStorage.setItem("login", true);
                                window.localStorage.setItem("sess_tok", d.response_data.session_token);

                                $rootScope.userDetail = JSON.parse(window.localStorage.getItem("profile"));
                                $rootScope.profile_pic = CONSTANTS.PROFILE_IMAGE_URL + $rootScope.userDetail.profile_pic;

                                $location.path('home')
                            })
                        }else{
                            popups.showAlert(response.response_msg)
                        }


                    })
                }, function (error) {
                    //alert("There was a problem getting your profile.  Check the logs for details.");
                    $scope.showAlert(error);
                });
            }, function (error) {
                $scope.showAlert(error);
            });
        };
        //twitter login 
        //twitter(string consumerKey, string consumerSecretKey, object options);
        $scope.twitterLogin = function () {

            $cordovaOauth.twitter("F10TwLSYjuahegNC3T10FB75N", "paCiWQE8TXO9n1gq3jLFIgAmyJP1fj1BtaQsdCuAaAJpyVaZnY").then(function (result) {
                $scope.showAlert(JSON.stringify(result));


                $http.get("https://api.twitter.com/1.1/users/show.json?screen_name=" + result.screen_name).then(function (result) {
                    $scope.showAlert(JSON.stringify(result));
                    $scope.signupDetails.name = result.data.name;
                    $scope.imgURI = result.data.picture.data.url;
                    //$scope.profileData = ;
                }, function (error) {
                    //alert("There was a problem getting your profile.  Check the logs for details.");
                    $scope.showAlert(error);
                });

            }, function (error) {
                $scope.showAlert(error);
            });
        };
        //instagram login
        $scope.instaLogin = function () {

            $cordovaOauth.instagram("06aa6a6fa2a1492d90cec199676c5420", ["basic", "comments", "relationships"]).then(function (result) {
                $scope.showAlert(JSON.stringify(result));
            }, function (error) {
                $scope.showAlert(error);
            });
        };

        var formdata = new FormData();

        $scope.loginUser = function () {
            if (!$scope.loginDetails.email) {
                $scope.showAlert("User Id is required");
            } else if (!CONSTANTS.validEmail($scope.loginDetails.email)) {
                $scope.showAlert("User Id is an email");
            } else if (!$scope.loginDetails.password) {
                $scope.showAlert("Password is required");
            } else if ($scope.loginDetails.password.length < 6) {
                $scope.showAlert("Password length should be minimum 6");
            } else {
                $scope.loginDetails.device_token = $ionicPush._token.token;
                $scope.loginDetails.device_id = $ionicPush._token.id;
                //call login api
                for (var key in $scope.loginDetails) {
                    formdata.append(key, $scope.loginDetails[key]);
                }

                console.log($scope.loginDetails);
                $scope.showLoading();
                $scope.makeRequest();
            }
        };


        // NOW UPLOAD THE FILES.
        $scope.makeRequest = function () {

            var request = {
                method: 'POST',
                url: CONSTANTS.BASE_URL + 'login',
                data: formdata,
                headers: {
                    'Content-Type': undefined
                }
            };

            // SEND THE FILES.
            $http(request)
                .success(function (d) {
                    $scope.hideLoading();
                    console.log(d);
                    if (d.response_status == "1") {
                        //clear object values
                        $scope.loginDetails.email = undefined
                        $scope.loginDetails.password = undefined

                        //$scope.showAlert(d.response_msg);
                        window.localStorage.setItem("profile", JSON.stringify(d.response_data.profile));
                        window.localStorage.setItem("login", true);
                        window.localStorage.setItem("sess_tok", d.response_data.session_token);

                        $rootScope.userDetail = JSON.parse(window.localStorage.getItem("profile"));
                        $rootScope.profile_pic = CONSTANTS.PROFILE_IMAGE_URL + $rootScope.userDetail.profile_pic;

                        $location.path('home');

                    } else {
                        $scope.showAlert(d.response_msg);
                    }
                })
                .error(function (err) {
                    $scope.hideLoading();
                    console.log(err);
                });
        };

    });