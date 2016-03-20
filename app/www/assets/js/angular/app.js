var myapp = angular.module('myapp',[]);

myapp.controller('registerController',function($scope,$http, $window) {
  console.log($scope);
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
    if(this.checkpassword()){
      return $window.alert('please check your password');
    }
  };
  //if($scope.password.localeCompare($scope.confirmPassword) !== 0){
    //console.log('err');
  //}
});

myapp.controller('mainController',function($scope,$http, $window) {
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
    $scope.userislogin = false;
  };
});
