exports.navBar = function() {
  return {
    controller: 'LoginController',
    templateUrl: '/templates/nav_bar.html'
  };
};

exports.categoryList = function() {
  return {
    controller: "CategoryListController",
    templateUrl: '/templates/category_list_view.html'
  };
};

exports.categoryDetails = function() {
  return {
    controller: "CategoryDetailsController",
    templateUrl: '/templates/category_details.html'
  };
};

exports.categoryCreate = function() {
  return {
    controller: "CategoryCreateController",
    templateUrl: '/templates/category_create.html'
  };
};

exports.topicList = function() {
  return {
    controller: "TopicListController",
    templateUrl: '/templates/topic_list_view.html'
  }
};

exports.topicDetails = function() {
  return {
    controller: "TopicDetailsController",
    templateUrl: '/templates/topic_details.html'
  }
};

exports.topicCreate = function() {
  return {
    controller: "TopicCreateController",
    templateUrl: '/templates/topic_create.html'
  };
};

exports.errorHandle = function() {
  return {
    controller: "ErrorHandleController",
    templateUrl: "/templates/error.html"
  }
};

exports.profile = function() {
  return {
    controller: "AccountController",
    templateUrl: "/templates/profile.html"
  }
};
