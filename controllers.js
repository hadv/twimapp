exports.AccountController = function($scope, $routeParams, $http) {
  $http.get('/api/v1/user/' + encodeURIComponent($routeParams.username)).
  success(function(data) {
    $scope.user = data.user;
  }).error(function(data) {
    $scope.haserror = true;
    $scope.errormessage = data.error;    
  });

  setTimeout(function() {
    $scope.$emit('AccountController');
  }, 0);
};

// Login controller
exports.LoginController = function($scope, $http, $auth, $window, localStorageService) {
  if (localStorageService.get('user') != null) {
    $scope.currentUser = localStorageService.get('user');
    $scope.loggedin = localStorageService.get('user') != null;
  };

  $scope.login = function(user) {
    $auth.login(user, function() {
      $window.location.reload(true);
    });
  };

  $scope.logout = function() {
    $auth.logout();
    $window.location.reload(true);
  };

  setTimeout(function() {
    $scope.$emit('LoginController');
  }, 0);
};

// Category controller
exports.CategoryListController = function($scope, $http) {
  $http.get('/api/v1/category/list').
  success(function(data) {
    $scope.categories = data.categories;
  }).error(function(data) {
    $scope.haserror = true;
    $scope.errormessage = data.error;
  });

  $scope.deleteCategory = function(index) {
    var category_id = $scope.categories[index]._id;
    $http.delete('/api/v1/category/id/' + category_id).
    success(function(del) {
      $scope.categories.splice(index, 1);
    }).error(function(data) {
      $scope.haserror = true;
      $scope.errormessage = data.error;
    });
  };

  setTimeout(function() {
    $scope.$emit('CategoryListController');
  }, 0);
};

exports.CategoryDetailsController = function($scope, $routeParams, $http, $location, $Base64Image) {
  $http.
    get('/api/v1/category/id/' + encodeURIComponent($routeParams.id)).
    success(function(data) {
      $scope.category = data.category;
    }).error(function(data) {
      $scope.haserror = true;
      $scope.errormessage = data.error;
    });

  $scope.updateCategory = function(category) {

    $http.
      put('/api/v1/category/id/' + category._id, {category: category}).
      success(function(data) {
        $scope.updated = true;
        $location.path('/category/list');
      }).error(function(data) {
        $scope.haserror = true;
        $scope.errormessage = data.error;
      });
  };

  $scope.upload = function(el) {
    if (el.files && el.files[0]) {
      $Base64Image.convert(el.files[0], function(base64) {
        $scope.category.icon = base64;
      });
    }
  };

  setTimeout(function() {
    $scope.$emit('CategoryDetailsController');
  }, 0);
};

exports.CategoryCreateController = function($scope, $http, $location, $Base64Image) {

  $scope.createCategory = function(category) {
    $scope.category.icon = $scope.icon;
    $http.
      post('/api/v1/category/add', {category: category}).
      success(function(data) {
        $scope.haserror = false;
        $scope.category = data.category;
        $scope.created = true;
        $location.path('/category/list');
      }).
      error(function(data) {
        $scope.haserror = true;
        $scope.errormessage = data.error;
      });
  };

  $scope.upload = function(el) {
    if (el.files && el.files[0]) {
      $Base64Image.convert(el.files[0], function(base64) {
        $scope.icon = base64;
      });
    }
  };

  setTimeout(function() {
    $scope.$emit('CategoryCreateController')
  }, 0);
};

// Topic controller
exports.TopicListController = function($scope, $http) {
  $http.
    get('/api/v1/topic/list').
    success(function(data) {
      $scope.topics = data.topics;
  }).error(function(data) {
    $scope.haserror = true;
    $scope.errormessage = data.error;
  });

  $scope.deleteTopic = function(index) {
    var topic_id = $scope.topics[index]._id;
    $http.delete('/api/v1/topic/id/' + topic_id).
    success(function(del) {
      $scope.topics.splice(index, 1);
    }).error(function(data) {
      $scope.haserror = true;
      $scope.errormessage = data.error;
    });
  };

  setTimeout(function() {
    $scope.$emit('TopicListController')
  }, 0);
};

exports.TopicDetailsController = function($scope, $routeParams, $http, $location, $Base64Image) {
  $http.
    get('/api/v1/topic/id/' + encodeURIComponent($routeParams.id)).
    success(function(data) {
      $scope.topic = data;
  }).error(function(data) {
    $scope.haserror = true;
    $scope.errormessage = data.error;
  });

  $http.
    get('/api/v1/category/list').
    success(function(data) {
      $scope.categories = data.categories;
  }).error(function(data) {
    $scope.haserror = true;
    $scope.errormessage = data.error;
  });

  $scope.updateTopic = function(topic) {

    $http.
      put('/api/v1/topic/id/' + topic._id, {topic: topic}).
      success(function(data) {
        $scope.updated = true;
        $scope.topic = data.topic;
        $location.path('/topic/list');
      }).error(function(data) {
        $scope.haserror = true;
        $scope.errormessage = data.error;
      });
  };

  $scope.upload = function(el) {
    if (el.files && el.files[0]) {
      $Base64Image.convert(el.files[0], function(base64) {
        $scope.topic.icon = base64;
      });
    }
  };

  setTimeout(function() {
    $scope.$emit('TopicDetailsController')
  }, 0);
};

exports.TopicCreateController = function($scope, $http, $location, $Base64Image) {
  $http.
    get('/api/v1/category/list').
    success(function(data) {
      $scope.categories = data.categories;
  }).error(function(data) {
    $scope.haserror = true;
    $scope.errormessage = data.error;
  });

  $scope.createTopic = function(topic) {
    $scope.topic.icon = $scope.icon;
    $http.
      post('/api/v1/topic/add', {topic: topic}).
      success(function(data) {
        $scope.topic = data.topic;
        $scope.created = true;
        $location.path('/topic/list');
      }).error(function(data) {
        $scope.haserror = true;
        $scope.errormessage = data.error;
      });
  };

  $scope.upload = function(el) {
    if (el.files && el.files[0]) {
      $Base64Image.convert(el.files[0], function(base64) {
        $scope.icon = base64;
      });
    }
  };

  setTimeout(function() {
    $scope.$emit('TopicCreateController')
  }, 0);
};
