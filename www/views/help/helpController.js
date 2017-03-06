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
  .controller('CleanReview', function ($scope, $stateParams, HistoryServices, $location, HelpFactory, services) {

    HistoryServices.getHistory('2017-01-01', new Date().toISOString().split('T')[0], function (appointmentArray) {
      $scope.appointmentArray = appointmentArray;
    });

  })
  .controller('ContentCtrl', function ($scope, $stateParams, $location, HelpFactory, services) {
    $scope.pageTitle = HelpFactory.pageTitle
    $scope.helpContent = $stateParams.content
  })
  .factory('HelpFactory', function () {
    return {
      pageTitle: 'Help'
    }
  });
/*
 <<<<<<< HEAD
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
 })*/
