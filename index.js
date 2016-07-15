var controllers = require('./controllers');
var directives = require('./directives');
var services = require('./services');
var _ = require('underscore');

var components = angular.module('twimapp.components', ['ng']);

_.each(controllers, function(controller, name) {
  components.controller(name, controller);
});

_.each(directives, function(directive, name) {
  components.directive(name, directive);
});

_.each(services, function(factory, name) {
  components.factory(name, factory);
});

var app = angular.module('twimapp',
  [
    'twimapp.components',
    'ngRoute',
    'ui.tinymce',
    'LocalStorageModule',
    'ngFileUpload'
  ]
);

app.config(function($routeProvider) {
  $routeProvider.
    when('/category/list', {
      template: '<category-list></category-list>'
    }).
    when('/category/id/:id', {
      template: '<category-details></category-details>'
    }).
    when('/category/create', {
      template: '<category-create></category-create>'
    }).
    when('/topic/list', {
      template: '<topic-list></topic-list>'
    }).
    when('/topic/id/:id', {
      template: '<topic-details></topic-details>'
    }).
    when('/topic/create', {
      template: '<topic-create></topic-create>'
    }).
    when('/home', {
      templateUrl: '/templates/home.html',
    }).
    when('/profile/:username', {
      template: '<profile></profile>'
    }).
    otherwise({
      redirectTo: '/home'
    });
});

app.run(function($http) {
  $http.defaults.headers.common.Authorization = 'Bearer suMwoiihHZkYuYq';
});

app.config(function (localStorageServiceProvider) {
  localStorageServiceProvider
    .setPrefix('twimapp@eagri.vn');
});

app.run(function ($rootScope, $location, $auth) {

  // enumerate routes that don't need authentication
  var routesThatDontRequireAuth = ['/error', '/home'];

  // check if current location matches route
  var routeClean = function (route) {
    return _.find(routesThatDontRequireAuth,
      function (noAuthRoute) {
        return route.startsWith(noAuthRoute);
      });
  };

  $rootScope.$on('$routeChangeStart', function (event, next, current) {
    // if route requires auth and user is not logged in
    if (!routeClean($location.url()) && !$auth.isLoggedIn()) {
      // redirect back to login
      event.preventDefault();
      $location.path('/home');
    }
  });
});

app.controller('TinyMCEController', function($scope) {
  $scope.tinymceOptions = {
    inline: false,
    automatic_uploads: false,
    // language: 'ja',
    plugins: [
      'advlist autolink lists link image charmap print preview hr anchor pagebreak',
      'searchreplace wordcount visualblocks visualchars code fullscreen',
      'insertdatetime media nonbreaking noneditable save table contextmenu directionality',
      'template paste textcolor colorpicker textpattern imagetools'
    ],
    external_plugins : {
      'tinyvision': '../tinyvision/build/plugin.min.js'
    },
    tinyvision: {
      source: '/api/v1/file/images/?access_token=suMwoiihHZkYuYq'
    },
    remove_script_host : false,
    convert_urls : false,
    imagetools_toolbar: "rotateleft rotateright | flipv fliph | editimage imageoptions",
    toolbar1: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
    toolbar2: 'print preview media | forecolor backcolor | template | code fullscreen',
    noneditable_noneditable_class: "twimNonEditable",
    image_advtab: true,
    skin: 'lightgray',
    theme : 'modern',
    templates: [
      {title: 'VN/JP Template', description: 'VN/JP Template', content: '<p>初めまして、宜しくお願い申し上げます！</p><div class="lang-vn"><span class="twimNonEditable">[VN]:&nbsp;&nbsp;</span><div class="lang-vn-content" style="display: inline"><em>Rất hân hạnh được gặp anh, mong anh giúp đỡ!</em></div></div><br>'}
    ]
  };
});
