angular.module('starter.controllers', ['ionic.cloud'])

.controller('DashCtrl', function($scope, $ionicAuth, $ionicFacebookAuth, $ionicUser) {

  $scope.details = {'email': '', 'password': ''};
  $scope.logado = $ionicAuth.isAuthenticated();

  $scope.cadastrar = function(){ 
    
    $ionicAuth.signup($scope.details).then(function() {
      // `$ionicUser` is now registered
      alert('usuário cadastrado');

      $ionicUser.set('birthdate', '5/17/1985');

    }, function(err) {
      for (var e of err.details) {

        /*
        required_email  Missing email field
        required_password Missing password field
        conflict_email  A user has already signed up with the supplied email
        conflict_username A user has already signed up with the supplied username
        invalid_email The email did not pass validation. 
        */    

          switch(e)
          {
            case 'conflict_email':
              alert('Este e-mail já existe.');
              break;
            case 'required_email':
              alert('Missing email field.');
              break; 
            case 'required_password':
              alert('Missing password field.');
              break; 
            case 'conflict_username':
              alert('A user has already signed up with the supplied username.');
              break;  
            case 'invalid_email':
              alert('The email did not pass validation.');
              break; 
            default:
              alert('erro não identificado');
              break;
          }

        }
      });
  };

  $scope.autenticar = function(){

    var _details =  $scope.details;

//    var _details = {'email': 'hi@ionic.io', 'password': 'puppies123'};

    $ionicAuth.login('basic', _details).then( function(response){

      alert('ok');

      $ionicUser.set('birthdate', '5/17/1985');
      
      $scope.logado = $ionicAuth.isAuthenticated();

       alert($ionicUser.get('birthdate'));

    }, function(err) {
      
      alert(err);

      });

  };

  $scope.logout = function(){

    $ionicAuth.logout();

    $scope.logado = $ionicAuth.isAuthenticated();
  };

  $scope.resetPass = function()
  {
    $ionicAuth.requestPasswordReset('janynnegomes@gmail.com');
  };

  $scope.confirmPassReset = function(){

    $ionicAuth.confirmPasswordReset('791960', 'davisouza123');

  };

  $scope.logarFacebook = function(){

    $ionicFacebookAuth.login().then( 
      function(){

        alert('deu');
      },
      function(){
        alert('erro');
      } );
  };

})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
