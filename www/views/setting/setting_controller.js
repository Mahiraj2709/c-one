/**
 * Created by admin on 3/6/2017.
 */
angular.module('starter')
    .controller('SettingCtrl',function ($scope,$rootScope) {

    })
    .controller('SuggestInvite',function ($scope) {
        $scope.facebookInvite = function () {
            facebookConnectPlugin.appInvite(
                {
                    url: "https://play.google.com/store/apps/details?id=com.app.cleanosaur",
                    picture: "https://lh3.googleusercontent.com/Um20qwcKVBjSNrXEtVn0gQTpFJFxorT3ruCxLSnPEXRKVE0CbAN5mBRYZIi3wF63KQ=w300-rw"
                },
                function(obj){
                    if(obj) {
                        if(obj.completionGesture == "cancel") {
                            // user canceled, bad guy
                        } else {
                            // user really invited someone :)
                        }
                    } else {
                        // user just pressed done, bad guy
                    }
                },
                function(obj){
                    // error
                    console.log(obj);
                }
            );
        }
    })
    .controller('ContactCtrl',function ($scope,$cordovaSocialSharing) {
        $scope.$on('$ionicView.loaded', function () {
            function onSuccess(contacts) {
                $scope.contacts = contacts;
                console.log(contacts)
                //alert('Found ' + contacts.length + ' contacts.');
            };

            function onError(contactError) {
                //alert('onError!');
            };

// find all contacts with 'Bob' in any name field
            var options      = new ContactFindOptions();
            options.multiple = true;
            //options.desiredFields = [navigator.contacts.fieldType.id];
            options.hasPhoneNumber = true;
            var fields       = [navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.name];
            navigator.contacts.find(fields, onSuccess, onError, options);
        })

        $scope.invite = function (phoneNos) {
            // access multiple numbers in a string like: '0612345678,0687654321'
            var message = "Hi, I have downloaded cleanosaur App to clean and its awesome. Get Cleanosuaur here 'https://play.google.com/store/apps/details?id=com.app.cleanosaur'"
            $cordovaSocialSharing
                .shareViaSMS(message, phoneNos)
                .then(function(result) {
                    // Success!
                }, function(err) {
                    // An error occurred. Show a message to the user
                });
        }
    })
