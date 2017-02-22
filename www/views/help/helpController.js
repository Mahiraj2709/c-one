/**
 * Created by maahi on 11/02/17.
 */
angular.module('starter')
    .controller('HelpCtrl', function ($scope, $stateParams, $location, HelpFactory, services) {
        $scope.pageTitle = HelpFactory.pageTitle
        services.getstaticcontent($stateParams.parentId, function (response) {
            if (response.response_status == '1') {
                $scope.helps = response.response_data.staticcontent;
            }
        })
        $scope.nextPage = function (help) {
            HelpFactory.pageTitle = help.name
            if (help.name != undefined && help.name != '') {
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
            if (help.content == undefined && help.content == '') {
                $location.url('help_page_two/' + help.id)
            } else {
                $location.url('help_content/' + help.content)
            }
        }
    })
    .controller('ContentCtrl', function ($scope, $stateParams, $location, HelpFactory, services) {
        $scope.pageTitle = 'dgdfgdg'
        $scope.helpContent = $stateParams.content
    })
    .factory('HelpFactory', function () {
        return {
            pageTitle: 'Help'
        }
    });

