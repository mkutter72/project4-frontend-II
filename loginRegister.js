'use strict';

var loginCallback = function(error, data){
    if(error){
       $('#myModal').modal('show');
    } else {
      window.location.href = 'indexFull.html'
    }
  };

  $('#registerForm').on('submit', function(e) {
    e.preventDefault();

    var credentials = form2object(this);

    if (credentials["password"] !== credentials["password2"]) {
        $('.modal-body').text("Passwords do not match");
        $('#myModal').modal('show');
    }
    else {
      var registerCallback = function(error, data){
        if(error){
          $('.modal-body').text("Username may already be in use");
          $('#myModal').modal('show');
        } else {
          window.location.href = 'login.html';
        }
        };
      api.register(credentials, registerCallback);
      };
  });


$('#loginForm').on('submit', function(e) {
    e.preventDefault();

    var credentials = form2object(this);
    sessionStorage.currentUser = credentials["username"];

    api.login(credentials, loginCallback);

  });



$('#logOut').on('click', function(e) {
    e.preventDefault();
    sessionStorage.currentUser = "";

    var logoutCallback = function(error, data){
      if(error)
        console.log(error);

      window.location.href = 'index.html';
    };

    api.logout(logoutCallback);

  });


 $('#logMeIn').on('submit', function(e) {
    e.preventDefault();

    var credentials = form2object(this);
    sessionStorage.currentUser = credentials["username"];

    api.login(credentials, loginCallback);
});
