var app = angular.module('ratsValidator.services', []);
var db = null;

app.factory('Entry', function($http) {
  var form = {
    username: '',
    password: ''
  };

  return {
    form: function() {
      return form;
    },

    // Simply reset each value in the form
    resetForm: function() {
      form = {
        username: '',
        password: ''
      };
    },

    login: function() {
      // Source: http://goo.gl/wPHJrE
      // Send login form data to the server
      return $http({
        method: 'POST',
        url: 'rest-api-server-address:port/login',
        // headers: {
        //   'Content-Type': 'application/x-www-form-urlencoded'
        // },
        // transformRequest: function(obj) {
        //   var str = [];
        //   for (var p in obj) {
        //     str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        //   }

        //   return str.join("&");
        // },
        data: form
      });
    },

    signup: function() {
      // Source: http://goo.gl/wPHJrE
      // Send sign up form data to the server
      return $http({
        method: 'POST',
        url: 'rest-api-server-address:port/signup',
        // headers: {
        //   'Content-Type': 'application/x-www-form-urlencoded'
        // },
        // transformRequest: function(obj) {
        //   var str = [];
        //   for (var p in obj) {
        //     str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        //   }

        //   return str.join("&");
        // },
        data: form
      });
    }
  }
});