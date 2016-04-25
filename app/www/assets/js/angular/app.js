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
  .when('/uploads', {
      templateUrl: 'upload.html',
      controller : function ($scope, $http, $window) {
          $scope.submit = function () {
              if (!$scope.recipeDetail.$valid || $scope.ingredients == [] || $scope.steps == []) {
                  $scope.submitted = true;
              } else {
                  console.dir($scope);
                  console.dir($scope.ingredients);
                  console.dir($scope.steps);
                  var req = {
                      method: 'POST',
                      url: 'api/reciply',
                      data: {
                          name          : $scope.title,
                          profile       : $scope.$parent.profile,
                          author        : $scope.$parent.profile._id,
                          video         : $scope.video,
                          description   : $scope.description,
                          ingredients   : $scope.ingredients,
                          steps         : $scope.steps,
                          lastmodfide   : new Date()
                      }
                  }
                  $http(req);
                  $window.location.href ='/';
              }
          };
          $scope.cancel =function() {
            $scope.title = '';
            $scope.$parent.profile = '';
            $scope.$parent.profile._id = '';
            $scope.picture = '';
            $scope.video = '';
            $scope.description = '';
            $scope.ingredients = null;
            $scope.steps = null;
            $window.location.href ='/';
        };
      }
  })
  .when('/editprofile',{
    templateUrl : 'editprofile.html',
    controller : function ($scope,$http,$window) {
      $scope.submit = function () {
          if (!$scope.profileEdit.$valid) {
              $scope.submitted = true;
          } else {
              $scope.$parent.profile.nickname = $scope.nickname;
              $scope.$parent.profile.email = $scope.email;
              $http.patch('/api/profile',{
                  profile  : $scope.$parent.profile,
              });
              $window.location.href ='/';
          }
      };
      $scope.cancel =function() {
        $scope.nickname = '';
        $scope.email = '';
        $window.location.href ='/';
      };
    }
  })
  .when('/myRecipe',{
      templateUrl: 'reciplemini.html',
      controller: function ($scope, $http) {
          console.log($scope.$parent.profile.user);
          $http({
            method: 'POST',
            url: '/api/myReciplys',
            data: {
                userid : $scope.$parent.profile.user
            }
          }).then(function (response) {
            $scope.reciplys = response.data.reciplys;
            $scope.imgUrl = [];
            for (var i = 0; i < $scope.reciplys.length; i++) {
                if (i % 4 == 1) {
                    $scope.imgUrl.push("images/pic03.jpg");
                } else if (i % 4 == 2) {
                    $scope.imgUrl.push("images/pic04.jpg");
                } else if (i % 4 == 3) {
                    $scope.imgUrl.push("images/pic07.jpg");
                } else {
                    $scope.imgUrl.push("images/pic01.jpg");
                } console.log("for loop" + i + " " + $scope.imgUrl[i]);
            }
          });
          $scope.mini = true;
          $scope.clickthis = function(n) {
            $scope.mini = false;
            $scope.large = n;
            console.log(n);
          };
      }
  })
  .when('/myFavorite',{
      templateUrl: 'reciplemini.html',
      controller: function ($scope, $http) {
          console.log($scope.$parent.profile.user);
          $http({
              method: 'POST',
              url: '/api/myFavorites',
              data : {
                  userid : $scope.$parent.profile.user
              }
          }).then(function (response) {
              $scope.favorites = response.data.favorites;
              $scope.reciplys = [];
              $scope.imgUrl = [];
              for (var i = 0; i <  $scope.favorites.length; i++) {
                  $scope.reciplys[i] = $scope.favorites[i].recipe;
                  if (i % 4 == 1) {
                      $scope.imgUrl.push("images/pic03.jpg");
                  } else if (i % 4 == 2) {
                      $scope.imgUrl.push("images/pic04.jpg");
                  } else if (i % 4 == 3) {
                      $scope.imgUrl.push("images/pic07.jpg");
                  } else {
                      $scope.imgUrl.push("images/pic01.jpg");
                  }
              }
          });
          $scope.mini = true;
          $scope.clickthis = function(n) {
            $scope.mini = false;
            $scope.large = n;
            console.log(n);
          };
      }
  })
  .otherwise({
    templateUrl: 'reciplemini.html',
    controller: function ($scope) {
        console.log($scope);
      $scope.$parent.thisreciplys.then(function () {
        $scope.reciplys = $scope.$parent.reciplys;
        $scope.imgUrl = [];
        for (var i = 0; i < $scope.reciplys.length; i++) {
            if (i % 4 == 1) {
                $scope.imgUrl.push("images/pic03.jpg");
            } else if (i % 4 == 2) {
                $scope.imgUrl.push("images/pic04.jpg");
            } else if (i % 4 == 3) {
                $scope.imgUrl.push("images/pic07.jpg");
            } else {
                $scope.imgUrl.push("images/pic01.jpg");
            } console.log("for loop" + i + " " + $scope.imgUrl[i]);
        }
      });
      $scope.clickthis = function(n) {
        $scope.$parent.large = n;
      };
    }
  });
});


myapp.controller('mainController',function($scope, $http, $window) {
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
  $scope.searchAll = function() {
      console.log("Search Field submit");
    $http.post('/api/reciplySearch',{
      searchkey  : $scope.searchkey
    }).then(function(data) {
        console.log($scope);
        $scope.$parent.reciplys = data.data.reciplys;
        $window.location="#reciplemini.html";
    }).catch(function(err) {
      $window.alert('cannot search : ' + err);
    });
  };
});

myapp.controller("IngredientController", function($scope, $window) {
  $scope.$parent.ingredients = [];
  $scope.addOneIng = function() {
    $scope.ingredients.push({
    });
  };
  $scope.addOne = function(ingredients, $index) {
      console.dir($scope.$parent);
      $scope.$parent.ingredients[$index].name = ingredients[$index].name;
      $scope.$parent.ingredients[$index].quantity =  ingredients[$index].quantity;
      console.dir(ingredients);
  };
  $scope.remove = function (ingredients, $index) {
    $scope.ingredients.splice($index, 1);
    console.dir(ingredients);

  };
});

myapp.controller("StepController", function($scope, $window) {
    $scope.$parent.steps = [];
    $scope.addOneStep = function() {
        $scope.steps.push({
        });
    };
    $scope.addOne = function(steps) {
        for (var i = 0; i < steps.length; i++) {
            $scope.$parent.steps[i].detail = steps[i].detail;
            $scope.$parent.steps[i].stepNum = i;
        }
        console.dir(steps);
    };
    $scope.remove = function (steps, $index) {
        $scope.steps.splice($index, 1);
        console.dir(ingredients);
    };
    console.log($scope);
});

myapp.controller("FavoriteController", function($scope, $window, $http) {

    if($scope.$parent.userislogin == true) {
        $http.post('/api/liked',{
          recipe  : $scope.$parent.large
        }).then(function(data) {
            // +1
            if (data.data.favorite == null) {
                $scope.liked = false;
            } else {
                $scope.liked = true;
            }
        }).catch(function(err) {
            $window.alert('Server Error!');
        });
    }

    $scope.like = function() {
        if($scope.$parent.userislogin == true) {
            $http.post('/api/like',{
              recipe  : $scope.$parent.large
            }).then(function(data) {
                // +1
                $scope.liked = true;
            }).catch(function(err) {
                $window.alert('Server Error!');
            });
        } else {
            $window.alert('Please Login!');
        }
    }

    $scope.unlike = function() {
        if($scope.$parent.userislogin == true) {
            $http.post('/api/unlike',{
              recipe  : $scope.$parent.large
            }).then(function(data) {
                // -1
                $scope.liked = false;
            }).catch(function(err) {
                $window.alert('Server Error!');
            });
        } else {
            $window.alert('Please Login!');
        }
    }
});

myapp.controller("CommentController", function($scope, $window, $http) {
    console.log($scope);
    $scope.comments = [];
    $http.post('/api/getComments',{
      recipe  : $scope.$parent.large,
    }).then(function(data) {
        $scope.comments = data.data.comments;
    }).catch(function(err) {
        $window.alert('Server Error!');
    });

    $scope.submit = function (contents) {
        console.log(contents);
        if (!$scope.commentEdit.$valid) {
            $scope.submitted = true;
        } else {
            $http.post('/api/comment', {
                recipe : $scope.$parent.large,
                contents : contents,
                commPicture : $scope.$parent.profile.picture,
                commName : $scope.$parent.profile.nickname,
                commUser : $scope.$parent.profile.user
            }).then(function(data) {
                $scope.contents = "";
                $http.post('/api/getComments',{
                  recipe  : $scope.$parent.large,
                }).then(function(data) {
                    $scope.comments = data.data.comments;
                }).catch(function(err) {
                    $window.alert('Server Error!');
                });
            }).catch(function(err) {
                $window.alert('Server Error!');
            });
        }
    };
});

// --------- End ----------
