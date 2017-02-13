/**
 * Created by maahi on 11/02/17.
 */
angular.module('starter')
  .controller('HelpCtrl', function ($scope, $stateParams, $location,HelpFactory) {

    $scope.pageTitle = HelpFactory.pageTitle
    services.getstaticcontent($stateParams.parentId, function (response) {
      if (response.response_status == '1') {
        $scope.helps = response.response_data.staticcontent;
      }
    })

    $scope.nextPage = function (help) {
      HelpFactory.pageTitle = help.name

      if(help.content != undefined && help.content != '') {
        
      }
      $location.url('page_two/' + help.id)
    }
  }).factory('HelpFactory',function () {
   return {
     pageTitle:'Help'
   }
})
