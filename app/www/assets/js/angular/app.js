var myapp = angular.module('myapp',['ngRoute']);

window.fbAsyncInit = function() {
    FB.init({
      appId      : '1680522818852113',
      xfbml      : true,
      version    : 'v2.5'
    });
  };

(function(d, s, id){
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

myapp.controller('fbloginController',function functionName($scope,$http, $window) {
  $scope.fblogin = function() {
    console.log(1);
    FB.login(function(response) {
      console.log(response);
      var url = '/api/facebook/token?access_token=' + response.authResponse.accessToken;
      $http({
        method: 'GET',
        url: url
      }).then(function(data) {
        console.log(data);
        $scope.$parent.profile = data.data.profile;
        $scope.$parent.userislogin = true;
      });
    });
  };
});

myapp.controller('loginController',function ($scope,$http, $window) {
  $scope.submit = function () {
    $http.post('/api/login',{
      username  : $scope.username,
      password  : $scope.password
    }).then(function(data) {
      $scope.$parent.profile = data.data.profile;
      $scope.$parent.userislogin = true;
      $scope.username='';
      $scope.password='';
    }).catch(function(err) {
      $window.alert('cannot find combination of your username and your password');
    });
  };
});

myapp.controller('registerController',function($scope,$http, $window) {
  $scope.username='';
  $scope.password='';
  var checkpassword = function() {
    if($scope.confirmPassword === undefined){
      return false;
    }
    if($scope.password.localeCompare($scope.confirmPassword) !== 0){
      return false;
    }
    return true;
  };
  $scope.submit = function() {
    if(!checkpassword()){
      return $window.alert('please check your password');
    }
    $http.post('/api/register',{
      username  : $scope.username,
      password  : $scope.password
    }).then(function(data) {
      $scope.$parent.profile = data.data.profile;
      $scope.$parent.userislogin = true;
      $scope.username='';
      $scope.password='';
      $scope.confirmPassword = '';
    }).catch(function(err) {
      console.log(err);
      if(err.status == 409){
        $window.alert('used username');
      }
    });
  };
});

myapp.controller('reciplyController', function($scope,$http, $window) {
  console.log($window);
  $http({
    method: 'GET',
    url: '/api/reciplys'
  }).then(function (response) {
    $scope.reciplys = response.data.reciplys;
    console.log($scope.reciplys);
  });
  $scope.mini = true;
  $scope.clickthis = function(n) {
    $scope.mini = false;
    $scope.large = n;
    console.log(n);
  };
});
myapp.config(function($routeProvider, $locationProvider){
  $routeProvider
  .when('/reciply/:reciplyId',{
    templateUrl: 'reciplelarge.html',
    controller: function ($scope,$window) {
      $scope.large = $scope.$parent.large;
      $scope.back = function() {
        $scope.$parent.large = null;
        $window.history.back();
      };
    }
  })
  .when('/uploads',{
    templateUrl : 'upload.html',
    controller : function ($scope) {

    }
  })
  .when('/editprofile',{
    templateUrl : 'editprofile.html',
    controller : function ($scope,$http,$window) {
      $scope.submit = function () {
        $scope.$parent.profile.nickname = $scope.nickname;
        $scope.$parent.profile.email = $scope.email;
        $http.patch('/api/profile',{
          profile  : $scope.$parent.profile,
        });
        $window.location.href ='/';
      };
      $scope.cancel =function() {
        $scope.nickname = '';
        $scope.email = '';
        $window.history.back();
      };
    }
  })
  .otherwise({
    templateUrl: 'reciplemini.html',
    controller: function ($scope) {
      $scope.$parent.thisreciplys.then(function () {
        $scope.reciplys = $scope.$parent.reciplys;
      });
      $scope.clickthis = function(n) {
        $scope.$parent.large = n;

      };
    }
  });
});


myapp.controller('mainController',function($scope,$http, $window) {
  $scope.thisreciplys = $http({
    method: 'GET',
    url: '/api/reciplys'
  }).then(function (response) {
    $scope.reciplys = response.data.reciplys;
  });
  $scope.userislogin = false;
  $http({
    method: 'GET',
    url: '/api/islogin'
  }).then(function (response) {
    $scope.userislogin = true;
    $http({
      method: 'GET',
      url: '/api/profile'}).then(function(response) {
        $scope.profile=response.data.profile;
      });
  }).catch(function (response) {
    $scope.userislogin = false;
  });
  $scope.logout = function () {
    $http({
    method: 'GET',
    url: '/api/logout'
  }).then(function (response) {
    }).catch(function (response) {
    });
    $scope.profile = null;
    $scope.userislogin = false;
  };
});

// -------- Sine --------
myapp.controller("SearchController", function($scope, $http, $window) {
    console.log("Search Field");
    console.log($scope.searchkey);
  $scope.searchAll = function() {
      console.log("Search Field submit");
    $http.post('/api/reciplySearch',{
      searchkey  : $scope.searchkey
    }).then(function(data) {
        console.log($scope);
        $scope.$parent.reciplys = data.data.reciplys;
        window.location="#reciplemini.html";
    }).catch(function(err) {
      $window.alert('cannot search : ' + err);
    });
  };
});
// --------- End ----------
