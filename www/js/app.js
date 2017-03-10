// Ionic Starter App
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter',
    [
        'ionic',
        'starter.controllers',
        'starter.services',
        'ngCordova',
        'ngCordovaOauth',
        'ionic.cloud',
        'ngTwitter'
    ]
)
    .run(function ($ionicPlatform, $location, $ionicPopup, $ionicHistory) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
        $ionicPlatform.registerBackButtonAction(function () {
            if ($location.path() === "/home" || $location.path() === "home") {
                var confirmPopup = $ionicPopup.confirm({
                    title: 'Exit',
                    template: 'Are you sure you want exit?'
                });
                confirmPopup.then(function (res) {
                    if (res) {
                        navigator.app.exitApp();
                    } else {
                        console.log('You are not sure');
                    }
                });
            } else {
                $ionicHistory.goBack();
            }
            // if (true) {
            //   //navigator.app.exitApp();
            // } else {
            //   //handle back action!
            // }
        }, 100);
    })
    .constant('CONSTANTS', {
        url: 'https://ionic-songhop.herokuapp.com',
        fbAppId: '1287344741322935',
        twitterApiKey: '	F10TwLSYjuahegNC3T10FB75N',
        twitterApiSectet: 'paCiWQE8TXO9n1gq3jLFIgAmyJP1fj1BtaQsdCuAaAJpyVaZnY',
        BASE_URL: 'http://cleanosaurapp.onsisdev.info/cleanerapi/',
        PROFILE_IMAGE_URL: 'http://cleanosaurapp.onsisdev.info/public/media/cleaner/',
        CUSTOMER_PROFILE_IMAGE_URL: 'http://cleanosaurapp.onsisdev.info/public/media/customer/',
        CAR_IMAGE_URL: 'http://cleanosaurapp.onsisdev.info/public/media/carphoto/',
        validEmail: function (email) {
            var atpos = email.indexOf("@");
            var dotpos = email.lastIndexOf(".");
            if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= email.length) {
                return false;
            } else {
                return true;
            }
        },
        validPhoneNo: function (phoneNo) {
            var phoneno = /^\d{10}$/;
            if (String(phoneNo).match(phoneno)) {
                return true;
            } else {
                return false;
            }
        },
        deviceType: function () {
            var isIOS = ionic.Platform.isIOS();
            var isAndroid = ionic.Platform.isAndroid();
            if (isIOS) {
                return 2;
            } else if (isAndroid) {
                return 1;
            } else {
                return 3;
            }
        }
    })
    .config(function ($stateProvider, $urlRouterProvider, $ionicCloudProvider) {
        $ionicCloudProvider.init({
            "core": {
                "app_id": "bb7068c9"
            },
            "push": {
                "sender_id": "541166918614",
                "pluginConfig": {
                    "ios": {
                        "badge": true,
                        "sound": true
                    },
                    "android": {
                        "iconColor": "#343434"
                    }
                }
            }
        });
        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

        // setup an abstract state for the tabs directive
        //splash router
            .state('splash', {
                url: '/splash',
                templateUrl: 'views/splash/splash.html',
                controller: 'SplashCtrl'
            })
            .state('login', {
                url: '/login',
                templateUrl: 'views/login/login.html'
            })
            .state('reset_password', {
                url: '/reset_password',
                templateUrl: 'views/reset_password/reset_password.html',
                controller: 'ResetPasswordCtrl'
            })
            //sign up router
            .state("sign_up", {
                url: '/sign_up',
                templateUrl: 'views/signup/signup.html'
            })

            //forgot password
            .state('forgot_password', {
                url: '/forgot_password',
                templateUrl: 'views/forgot_password/forgot_password.html',
                controller: 'ForgotPasswordCtrl'
            })
            //home router
            .state('home', {
                url: '/home',
                templateUrl: 'views/home/home.html',
                controller: 'HomeCtrl'
            })

            //profile router
            .state('profile_one', {
                url: '/profile_one',
                templateUrl: 'views/my_profile/profile_one.html',
                controller: 'ProfileCtrl'
            })

            //profile second page router
            .state('profile_two', {
                url: '/profile_two',
                templateUrl: 'views/my_profile/profile_two.html',
                controller: 'ProfileCtrl'
            })

            //about page router
            .state('about', {
                url: '/about',
                templateUrl: 'views/about/about.html',
                controller: 'AboutCtrl'
            })

            //customer profile
            .state('customer_profile', {
                url: '/customer_profile/:customer_id',
                templateUrl: 'views/customer_profile/customer_profile.html',
                controller: 'CustomerProfileCtrl'
            })

            //i am on the way
            .state('on_the_way', {
                url: '/on_the_way',
                templateUrl: 'views/on_the_way/on_the_way.html',
                controller: 'OnTheWayCtrl'
            })
            //chat room
            .state('chat_room', {
                url: '/chat_room/:app_appointment_id',
                templateUrl: 'views/chat_room/chat_room.html',
                controller: 'ChatCtrl'
            })
            //your bill
            .state('bill', {
                url: '/bill',
                templateUrl: 'views/bill/bill.html',
                controller: 'BillCtrl'
            })

            //payment screens
            .state('history', {
                url: '/history',
                templateUrl: 'views/service_history/service_history.html',
                controller: 'HistoryCtrl'
            })

            //payment screens
            .state('pending_appointment', {
                url: '/pending_appointment',
                templateUrl: 'views/pending_appointment/pending_appointment.html',
                controller: 'PendingAppointmentCtrl'
            })

            //service history details
            .state('history_detail', {
                url: '/history_detail/:app_appointment_id',
                templateUrl: 'views/service_history/service_history_detail.html',
                controller: 'HistoryDetailCtrl'
            })

            //service history details
            .state('notification', {
                url: '/notification',
                templateUrl: 'views/notification/notification.html',
                //controller: 'HistoryCtrl'
            })

            //work as cleaner
            .state('help', {
                url: '/help',
                templateUrl: 'views/help/help.html',
                controller: 'HelpCtrl'
            })
            //work as cleaner
            .state('help_page_two', {
                url: '/help_page_two/:parent_id',
                templateUrl: 'views/help/page_two.html',
                controller: 'PageTwoCtrl'
            })//work as cleaner
            .state('help_content', {
                url: '/help_content/:content',
                templateUrl: 'views/help/content_page.html',
                controller: 'ContentCtrl'
            })
            .state('clean_cost_review', {
                url: '/clean_cost_review',
                templateUrl: 'views/help/clean_cost_review.html',
                controller: 'CleanReviewCtrl'
            })

            .state('clean_cost_review_detail', {
                url: '/clean_cost_review_detail',
                templateUrl: 'views/help/clean_cost_detail.html',
                controller: 'CleanReviewDetailCtrl'
            })

            //work as cleaner
            .state('work_as_customer', {
                url: '/work_as_customer',
                templateUrl: 'views/sign_as_customer/become_a_customer.html',
                controller: 'SignAsCustomer'
            })
            //work as cleaner
            .state('suggest_invite', {
                url: '/suggest_invite',
                templateUrl: 'views/setting/suggest_invite.html',
                controller: 'SuggestInvite'
            })
            .state('contact_list', {
                url: '/contact_list',
                templateUrl: 'views/setting/contact_list.html',
                controller: 'ContactCtrl'
            })
            .state('edit_notification', {
                url: '/edit_notification',
                templateUrl: 'views/setting/edit_notification.html',
                controller: 'SettingCtrl'
            })

            //settings
            .state('setting', {
                url: '/setting',
                templateUrl: 'views/setting/setting.html',
                controller: 'SettingCtrl'
            })

            // Each tab has its own nav history stack:
            .state('tab.dash', {
                url: '/dash',
                views: {
                    'tab-dash': {
                        templateUrl: 'templates/tab-dash.html',
                        controller: 'DashCtrl'
                    }
                }
            })
            .state('tab.chats', {
                url: '/chats',
                views: {
                    'tab-chats': {
                        templateUrl: 'templates/tab-chats.html',
                        controller: 'ChatsCtrl'
                    }
                }
            })
            .state('tab.chat-detail', {
                url: '/chats/:chatId',
                views: {
                    'tab-chats': {
                        templateUrl: 'templates/chat-detail.html',
                        controller: 'ChatDetailCtrl'
                    }
                }
            })
            .state('tab.account', {
                url: '/account',
                views: {
                    'tab-account': {
                        templateUrl: 'templates/tab-account.html',
                        controller: 'AccountCtrl'
                    }
                }
            })
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/splash');
    });
