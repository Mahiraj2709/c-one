/**
 * Created by maahi on 11/02/17.
 */
angular.module('starter')
    .controller('HelpCtrl', function ($scope, $stateParams, $location, HelpFactory, services) {
        var mapOptions = {
            center: new google.maps.LatLng('0.0', '0.0'),
            zoom: 15,
            disableDefaultUI: true, // a way to quickly hide all controls
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        $scope.map = new google.maps.Map(document.getElementById("googlMap"), mapOptions);
        $scope.pageTitle = HelpFactory.pageTitle
        services.getstaticcontent('0', function (response) {
            if (response.response_status == '1') {
                $scope.last_clean = response.response_data.last_clean[0];
                $scope.helps = response.response_data.staticcontent;
            }
        })
        $scope.nextPage = function (help) {
            console.log(help)
            HelpFactory.pageTitle = help.name
            console.log(HelpFactory)
            if (help.name != undefined && help.name != '') {
                if (help.id == '1') {
                    //lauch clean and cost review page
                    $location.url('clean_cost_review')
                } else
                    $location.url('help_page_two/' + help.id)
            }
        }
    })
    .controller('PageTwoCtrl', function ($scope, $stateParams, $location, HelpFactory, services) {
        $scope.pageTitle = HelpFactory.pageTitle
        console.log($scope.pageTitle)
        services.getstaticcontent($stateParams.parent_id, function (response) {
            if (response.response_status == '1') {
                $scope.helps = response.response_data.staticcontent;
            }
        })
        $scope.nextPage = function (help) {
            HelpFactory.pageTitle = help.name
            if (help.content == undefined || help.content == '') {
                $location.url('help_page_two/' + help.id)
            } else {
                $location.url('help_content/' + help.content)
            }
        }
    })
    .controller('CleanReviewCtrl', function ($scope, $stateParams, HistoryServices, $location, HelpFactory, services, CONSTANTS) {
        HistoryServices.getHistory('2017-01-01', new Date().toISOString().split('T')[0], function (appointmentArray) {
            $scope.appointmentArray = appointmentArray;
        });
        $scope.getProfileImage = function (profile_pic) {
            return CONSTANTS.CUSTOMER_PROFILE_IMAGE_URL + profile_pic;
        }

        $scope.setMap = function () {
            var mapOptions = {
                center: new google.maps.LatLng('0.0', '0.0'),
                zoom: 15,
                disableDefaultUI: true, // a way to quickly hide all controls
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            /*$scope.map = */
            new google.maps.Map(document.getElementsByClassName("help_map"), mapOptions);
        }
        $scope.lauchNextPage = function (apmt) {
            HelpFactory.appointment = apmt;
            $location.url('clean_cost_review_detail')
        }
        //new google.maps.Map(e.target, mapOptions);
    })
    .controller('CleanReviewDetailCtrl', function ($scope, $stateParams, $location, HelpFactory, services,CONSTANTS) {

        $scope.appointment = HelpFactory.appointment;
        services.getstaticcontent('1', function (response) {
            if (response.response_status == '1') {
                $scope.helps = response.response_data.staticcontent;
            }
        })
        $scope.nextPage = function (help) {
            HelpFactory.pageTitle = help.name
            if (help.content == undefined || help.content == '') {
                $location.url('help_page_two/' + help.id)
            } else {
                $location.url('help_content/' + help.content)
            }
        }
        $scope.getProfileImage = function (profile_pic) {
            return CONSTANTS.CUSTOMER_PROFILE_IMAGE_URL + profile_pic;
        }
    })
    .controller('ContentCtrl', function ($scope, $stateParams, $location, HelpFactory, services) {
        $scope.pageTitle = HelpFactory.pageTitle
        $scope.helpContent = $stateParams.content
    })
    .factory('HelpFactory', function () {
        return {
            pageTitle: 'Help',
            appointment:{}
        }
    });
