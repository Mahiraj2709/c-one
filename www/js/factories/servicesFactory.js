/**
 * Created by maahi on 10/02/17.
 */
angular.module('starter')
  .factory('services', function ($http, CONSTANTS,$ionicLoading) {
    function logout(responseCallback) {
      $ionicLoading.show({
        template: 'Loading...'
      });
      var formdata = new FormData()
      formdata.append("device_type", CONSTANTS.deviceType());
      formdata.append("session_token", window.localStorage.getItem("sess_tok"))
      formdata.append("language", "en")
      var request = {
        method: 'POST',
        url: CONSTANTS.BASE_URL + 'logout',
        data: formdata
      };
      // SEND THE FILES.
      $http(request)
        .success(function (res) {
          $ionicLoading.hide()
          responseCallback(res)
        })
        .error(function (err) {
          $ionicLoading.hide()
          console.log(err);
          //$scope.showAlert(err);
        });
    }

    function sendMessage(message,appointment_id) {
      var formdata = new FormData();
      formdata.append('device_type', CONSTANTS.deviceType());
      formdata.append('session_token', window.localStorage.getItem("sess_tok"));
      formdata.append('chat_message', message);
      formdata.append('app_appointment_id', appointment_id);
      formdata.append('language', 'en');

      console.log(formdata)

      var request = {
        method: 'POST',
        url: CONSTANTS.BASE_URL + 'appointmentchat',
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
        .success(function (res) {
          //console.log(d)
          //responseCallback(res)
        })
        .error(function (err) {

        });
    }

    function getChatHistory(appointment_id,responseCallback) {
      $ionicLoading.show({
        template: 'Loading previous chat...'
      });
      var formdata = new FormData();
      formdata.append('device_type', CONSTANTS.deviceType());
      // formdata.append('session_token', window.localStorage.getItem("sess_tok"));
      formdata.append('session_token', 'Mjk3MjBmZDhlY2IyMDQ0ZTRhZWMyYjdkOGEzYjJkMzI');
      formdata.append('app_appointment_id', appointment_id);
      formdata.append('language', 'en');

      console.log(formdata)

      var request = {
        method: 'POST',
        url: 'http://cleanosaurapp.onsisdev.info/customerapi/'+ 'chathistory',
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
        .success(function (res) {
          console.log(res)
          $ionicLoading.hide()
          responseCallback(res)
        })
        .error(function (err) {
          $ionicLoading.hide()
        });
    }

    function petProfileVideo(responseCallback) {
      $ionicLoading.show({
        template: 'Loading...'
      });
      var formdata = new FormData();
      formdata.append('device_type', CONSTANTS.deviceType());
      formdata.append('session_token', window.localStorage.getItem("sess_tok"));


      var request = {
        method: 'POST',
        url: CONSTANTS.BASE_URL + 'getuploadedprofilevideo',
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
        .success(function (res) {
          console.log(res)
          $ionicLoading.hide()
          responseCallback(res)
        })
        .error(function (err) {
          $ionicLoading.hide()
        });
    }
    return{
      logout:logout,
      sendMessage:sendMessage,
      getChatHistory:getChatHistory,
      petProfileVideo:petProfileVideo
    }
  });
