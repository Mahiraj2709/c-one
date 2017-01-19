angular.module('starter')
    .controller('ProfileCtrl', function ($scope, $http, $rootScope, $ionicLoading, $ionicPopup, $cordovaCamera,UploadImageService,ImagePickerService,LoadImagesService,GetCarInfo,
                                         GooglePlacesService, $location, $timeout, $cordovaFileTransfer, $cordovaGeolocation, CONSTANTS) {
        var posOptions = { timeout: 10000, enableHighAccuracy: false };

        $cordovaGeolocation
            .getCurrentPosition(posOptions)
            .then(function (position) {
                var lat = position.coords.latitude
                var long = position.coords.longitude
                $rootScope.profileDetails.latitude = lat
                $rootScope.profileDetails.latitude = long

                //$scope.showAlert(lat + "  " + long);
            }, function (err) {
                // error
            });

        var imageType = 0;
        // An alert dialog
        $scope.showAlert = function (message) {
            var alertPopup = $ionicPopup.alert({
                title: 'Attention!',
                template: message
            });
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
        // When button is clicked, the popup will be shown...
        $scope.showPopup = function (type) {
            imageType = type;
            // Custom popup
            $scope.myPopup = $ionicPopup.show({
                templateUrl: 'views/signup/image_chooser.html',
                scope: $scope,
            });
        };

        //scope close the pop-up on cancel icon clicked
        $scope.closePopUp = function () {
            $scope.myPopup.close();
        }
        //camera funcitions 
        $scope.takePhoto = function () {
            $scope.myPopup.close();
            var options = {
                quality: 75,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 300,
                targetHeight: 300,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false
            };

            $cordovaCamera.getPicture(options).then(function (imageData) {
                if (imageType == 1) {
                    $rootScope.temp_profile_pic = "data:image/jpeg;base64," + imageData;
                    $scope.profile_pic = "data:image/jpeg;base64," + imageData;
                } else if (imageType == 2) {
                    $rootScope.temp_car_pic = "data:image/jpeg;base64," + imageData;
                    $scope.car_pic = "data:image/jpeg;base64," + imageData;
                }else if(imageType == 3) {
                    $scope.firstImage = "data:image/jpeg;base64," + imageData;
                    UploadImageService.uploadImage($scope.firstImage,1);
                }else if(imageType == 4) {
                    $scope.secondImage = "data:image/jpeg;base64," + imageData;
                    UploadImageService.uploadImage($scope.secondImage,2);
                }else if(imageType == 5) {
                    $scope.thirdImage = "data:image/jpeg;base64," + imageData;
                    UploadImageService.uploadImage($scope.thirdImage,3);
                }else if(imageType == 6) {
                    $scope.fourthImage = "data:image/jpeg;base64," + imageData;
                    UploadImageService.uploadImage($scope.fourthImage,4);
                }
            }, function (err) {
                // An error occured. Show a message to the user
            });
        }

        $scope.choosePhoto = function () {
            $scope.myPopup.close();
            var options = {
                quality: 75,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 300,
                targetHeight: 300,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false
            };

            $cordovaCamera.getPicture(options).then(function (imageData) {
                if (imageType == 1) {
                    $rootScope.temp_profile_pic = "data:image/jpeg;base64," + imageData;
                    $scope.profile_pic = "data:image/jpeg;base64," + imageData;
                } else if (imageType == 2) {
                    $rootScope.temp_car_pic = "data:image/jpeg;base64," + imageData;
                    $scope.car_pic = "data:image/jpeg;base64," + imageData;
                }else if(imageType == 3) {
                    $scope.firstImage = "data:image/jpeg;base64," + imageData;
                    UploadImageService.uploadImage($scope.firstImage,1);
                }else if(imageType == 4) {
                    $scope.secondImage = "data:image/jpeg;base64," + imageData;
                    UploadImageService.uploadImage($scope.secondImage,2);
                }else if(imageType == 5) {
                    $scope.thirdImage = "data:image/jpeg;base64," + imageData;
                    UploadImageService.uploadImage($scope.thirdImage,3);
                }else if(imageType == 6) {
                    $scope.fourthImage = "data:image/jpeg;base64," + imageData;
                    UploadImageService.uploadImage($scope.fourthImage,4);
                }
            }, function (err) {
                // An error occured. Show a message to the user
            });
        }

        $scope.getPlacePredictions = function(query){
            console.log(query)
            if(query !== "")
            {
                GooglePlacesService.getPlacePredictions(query)
                    .then(function(predictions){
                        $scope.predictions = predictions;
                    });
            }else{
                $scope.predictions = [];
            }
        };
        $scope.selectSearchResult = function(result){
            $scope.profileDetails.address = result.description;
            $scope.predictions = [];
        };

        //$scope.hideKeyboard = cordova.plugins.Keyboard.close();
        var profile = JSON.parse(window.localStorage.getItem('profile'));
        console.log(profile);
        $scope.profile_pic = CONSTANTS.PROFILE_IMAGE_URL + profile.profile_pic;
        $scope.car_pic = profile_pic = CONSTANTS.CAR_IMAGE_URL + profile.car_profile_pic;
        var date_of_birth = String(profile.date_of_birth).split("-");
        var _day = date_of_birth[2];
        var _month = date_of_birth[1];
        var _year = date_of_birth[0];
        $scope.enableInput = {
            mobile: false,
            address: false
        };

        //set dropdown through code in 
        $scope.dropDownData = {
            dates: ["Day", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"],
            months: ["Month", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            years: ["Year"],
            info: "Date of birth is required"
        };
        var date = new Date();
        for (var i = date.getYear(); i >= 0; i--) {
            $scope.dropDownData.years.push(1900 + i);
        }

        if ($location.url() == '/profile_one') {
            $rootScope.profileDetails = undefined;
            $rootScope.temp_profile_pic = undefined;
            $rootScope.temp_car_pic = undefined;
            $rootScope.profileDetails = {}
            $rootScope.profileDetails.first_name = profile.first_name;
            $rootScope.profileDetails.last_name = profile.last_name;
            $rootScope.profileDetails.about_your_description = profile.about_your_description;

            //load four images
            loadFourImages();
        } else {

            $rootScope.profileDetails.device_type = CONSTANTS.deviceType()
            $rootScope.profileDetails.session_token = window.localStorage.getItem("sess_tok")
            $rootScope.profileDetails.email = profile.email
            $rootScope.profileDetails.mobile = profile.mobile
            $rootScope.profileDetails.language = 'en'
            $rootScope.profileDetails.latitude = '0.0'
            $rootScope.profileDetails.longitude = '0.0'
            $rootScope.profileDetails.profile_pic = undefined
            $rootScope.profileDetails.address = profile.address
            $rootScope.profileDetails.day = _day
            $rootScope.profileDetails.month = _month
            $rootScope.profileDetails.year = _year
            $rootScope.profileDetails.reference_mode = profile.reference_mode
            $rootScope.profileDetails.quick_blox_id = profile.quick_blox_id
            $rootScope.profileDetails.make_id = profile.make_id
            $rootScope.profileDetails.model_id = profile.model_id
            $rootScope.profileDetails.car_profile_pic = ''

            //load car make and car model details
            loadCarMake();
            loadCarModel();
        }
        $scope.editField = function (type) {
            //disable all input fields first
            for (var key in $scope.enableInput) {
                $scope.enableInput[key] = true;
            }

            if (type == 'phone') {
                $timeout(function () {
                    $scope.enableInput.mobile = false;
                    document.getElementById('mobile').focus();
                    cordova.plugins.Keyboard.show();
                }, 0);
            } else if (type == 'address') {
                $timeout(function () {
                    $scope.enableInput.address = false;
                    document.getElementById('address').focus();
                    cordova.plugins.Keyboard.show();
                }, 0);
            }
        };

        $scope.showKey = function () {
            //cordova.plugins.Keyboard.close();
            cordova.plugins.Keyboard.show();
        }

        $scope.captureVideo = function () {

            var options = {
                limit: 1,
                duration: 10
            };

            navigator.device.capture.captureVideo(onSuccess, onError, options);

            function onSuccess(mediaFiles) {
                var i, path, len;

                for (i = 0, len = mediaFiles.length; i < len; i += 1) {
                    path = mediaFiles[i].fullPath;
                    console.log(mediaFiles);
                }

                //upload the video to the server
                var options = {
                    fileKey: "avatar",
                    fileName: "image.png",
                    chunkedMode: false,
                    mimeType: "image/png"
                };
                $cordovaFileTransfer.upload("http://192.168.56.1:1337/file/upload", "/android_asset/www/img/ionic.png", options).then(function (result) {
                    console.log("SUCCESS: " + JSON.stringify(result.response));
                }, function (err) {
                    console.log("ERROR: " + JSON.stringify(err));
                }, function (progress) {
                    $ionicLoading.show({
                       template:'uploading..'+progress
                    });
                });
            }

            function onError(error) {
                navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
            }

        };
        //function to move to the next page 
        $scope.moveToNext = function () {
            //copy all the profile details to the home myprofile service
            if (!$rootScope.profileDetails.first_name) {
                $scope.showAlert("First Name is required");
            } else if (!$scope.profileDetails.last_name) {
                $scope.showAlert("Last Name is required");
            } else {
                $location.path('profile_two');
            }
        }
        var formdata = new FormData();
        //update profile
        $scope.updateProfile = function () {
            if ($rootScope.profileDetails.day == "Day") {
                $scope.showAlert("Date is required");
            } else if ($rootScope.profileDetails.month == "Month") {
                $scope.showAlert("Month is required");
            } else if ($rootScope.profileDetails.year == "Year") {
                $scope.showAlert("Year is required");
            } else if (!$rootScope.profileDetails.email) {
                $scope.showAlert("Email Id is required");
            } else if (!CONSTANTS.validEmail($rootScope.profileDetails.email)) {
                $scope.showAlert("Email Id is not valid");
            } else if (!$rootScope.profileDetails.mobile) {
                $scope.showAlert("Phone number is required");
            } else if (!CONSTANTS.validPhoneNo($rootScope.profileDetails.mobile)) {
                $scope.showAlert("Phone number is not valid");
            } else if (!$rootScope.profileDetails.model_id) {
                $scope.showAlert("Car model is required");
            } else if (!$rootScope.profileDetails.make_id) {
                $scope.showAlert("Car Maker is required");
            } else if (!$rootScope.profileDetails.address) {
                $scope.showAlert("Address is required");
            }
            else if (!$rootScope.profileDetails.reference_mode) {
                $scope.showAlert("Please select your behaviour");
            } else {
                //call signup api
                for (var key in $rootScope.profileDetails) {
                    if (key == "profile_pic") {
                        if (typeof $rootScope.temp_profile_pic !== 'undefined') {
                            formdata.append(key, dataURItoBlob($rootScope.temp_profile_pic), 'profile_image' + '.jpeg');
                        }

                    } else if (key == "car_profile_pic") {
                        if (typeof $rootScope.temp_car_pic !== 'undefined') {
                            formdata.append(key, dataURItoBlob($rootScope.temp_car_pic), 'imagem' + '.jpeg');
                        }

                    } else {
                        formdata.append(key, $rootScope.profileDetails[key]);
                    }
                }
                //check for internet connection
                console.log($rootScope.profileDetails);
                $scope.showLoading();
                $scope.makeRequest();
            }
        };
        // NOW UPLOAD THE FILES.
        $scope.makeRequest = function () {
            var request = {
                method: 'POST',
                url: CONSTANTS.BASE_URL + 'editprofile',
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
                    //$scope.showAlert(JSON.stringify(d));
                    if (d.response_status == "1") {
                        $scope.showAlert(d.response_msg);
                        window.localStorage.setItem("profile", JSON.stringify(d.response_data.profile));

                        $rootScope.userDetail = d.response_data.profile;
                        $rootScope.profile_pic = CONSTANTS.PROFILE_IMAGE_URL + d.response_data.profile.profile_pic;

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
        function dataURItoBlob(dataURI) {
            var binary = atob(dataURI.split(',')[1]);
            var array = [];
            for (var i = 0; i < binary.length; i++) {
                array.push(binary.charCodeAt(i));
            }
            return new Blob([new Uint8Array(array)], { type: 'image/jpeg' });
        }

        //get make and model Id
        $scope.carMake = [
            {
                vehicle_make_id: "-1",
                vehicle_make_title: "Car Maker"
            }
        ]
        $scope.carModel = [
            {
                vehicle_model_id: "-1",
                vehicle_make_id: "-1",
                vehicle_model_title: "Car Model"
            }
        ]

        function loadCarMake() {
            GetCarInfo.getCarMake(function (carMakeArray) {
                $scope.carMake = carMakeArray;
                $scope.carMake.insert(0, {
                    vehicle_make_id: "-1",
                    vehicle_make_title: "Car Maker"
                });
            });
        }

        $scope.loadCarModel = loadCarModel();
        function loadCarModel() {
            console.log('called');
            GetCarInfo.getCarModel($scope.profileDetails.make_id,function (carMakeArray) {
                $scope.carModel = carMakeArray;

                console.log(carMakeArray)

                if ($scope.carModel.length == 0) {
                    $scope.carModel = [
                        {
                            vehicle_model_id: "-1",
                            vehicle_make_id: "-1",
                            vehicle_model_title: "Car model not available"
                        }
                    ]
                }
            });
        }
        $scope.clearIcon = false;
        $scope.showCurrentIcon = true;

        function loadFourImages() {
            LoadImagesService(function (imgArray) {
                for(var i = 0; i< imgArray.length; i++) {
                    var position = imgArray[i].position;
                    if(position == 1) {
                        $scope.firstImage = CONSTANTS.PROFILE_IMAGE_URL + imgArray[i].profile_pic;
                    }else if(position == 2) {
                        $scope.secondImage = CONSTANTS.PROFILE_IMAGE_URL + imgArray[i].profile_pic;
                    }else if(position == 3) {
                        $scope.thirdImage = CONSTANTS.PROFILE_IMAGE_URL + imgArray[i].profile_pic;
                    }else if(position == 4) {
                        $scope.fourthImage = CONSTANTS.PROFILE_IMAGE_URL + imgArray[i].profile_pic;
                    }
                }
            });
        }


    });