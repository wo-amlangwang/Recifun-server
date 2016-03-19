var myapp = angular.module('myapp',[]);

myapp.controller('registerController',function($scope,$http, $window) {
  console.log($scope);
  $scope.username='';
  $scope.password='';
  $scope.submit = function() {
    if($scope.confirmPassword === undefined){
      return $window.alert('please confirm the password');
    }
    if($scope.password.localeCompare($scope.confirmPassword) !== 0){
      $scope.confirmPassword='';
      return $window.alert('please enter the same password');
    }
  };
  //if($scope.password.localeCompare($scope.confirmPassword) !== 0){
    //console.log('err');
  //}
});

myapp.controller('mainController',function($scope,$http, $window) {
  $scope.userislogin = true;
  $http({
  method: 'GET',
  url: '/api/islogin'
}).then(function (response) {
    $scope.userislogin = false;
  }).catch(function (response) {
    $scope.userislogin = true;
  });
  $scope.logout = function () {
    $http({
    method: 'GET',
    url: '/api/logout'
  }).then(function (response) {
    }).catch(function (response) {
    });
    $scope.userislogin = true;
  };
});
