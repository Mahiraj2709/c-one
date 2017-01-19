angular.module('starter')
    .controller('SplashCtrl', function ($scope, $timeout,$ionicSideMenuDelegate,$location,$ionicPush) {
        $ionicSideMenuDelegate.canDragContent(false);
        $timeout(function () {
            var loggedIn = localStorage.getItem('login');
            if (!loggedIn) {
                $location.url('/login');
            } else {
                $location.url('/home');
            }
        }, 2000);

        $ionicPush.register().then(function(t) {
            return $ionicPush.saveToken(t);
        }).then(function(t) {
        });
    });