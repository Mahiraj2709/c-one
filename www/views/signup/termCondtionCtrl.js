/**
 * Created by admin on 1/5/2017.
 */
angular.module('starter')
    .controller('TermsConditionCtrl',function ($scope,TermCondition) {

        $scope.pageContent = '';
        $scope.loadTermsCondition = function () {
            TermCondition.getTermCondition(function (content) {
                $scope.pageContent = content;
            });
        }
    });
