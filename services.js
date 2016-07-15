var status = require('http-status');

exports.$auth = function($rootScope, $http, localStorageService) {
  return {
    login: function(user, done) {
      $http.post('api/v1/user/login', {user: user})
      .success(function(data) {
        if (data && data.user) {
          localStorageService.set('user', data.user);
        } else {
          localStorageService.remove('user');
        }
        done();
      }).error(function() {
        localStorageService.remove('user');
      });
    },

    logout: function() {
      localStorageService.remove('user');
    },

    isLoggedIn: function() {
      return localStorageService.get('user') != null;
    }
  }
};

exports.$Base64Image = function() {
  return {
    convert: function(file, callback) {
      var fr = new FileReader();
      fr.onload = function(e) {
        callback(e.target.result)
      };
      fr.readAsDataURL(file);
    }
  }
};
