'use strict';


  $('#registerForm').on('submit', function(e) {
    e.preventDefault();

    var credentials = form2object(this);

    if (credentials["password"] !== credentials["password2"])
      $('.registerStatus').text('Passwords do not match');

    var registerCallback = function(error, data){
      if(error){
        console.log(error);
        $('.registerStatus').text('Error in registration');
      } else {
        window.location.href = 'login.html';
      }
    };
    api.register(credentials, registerCallback);

  });


$('#loginForm').on('submit', function(e) {
    e.preventDefault();

    var credentials = form2object(this);

    var loginCallback = function(error, data){
      if(error){
        console.log(error);
        $('.loginStatus').text('Error in login');
      } else {
        window.location.href = 'indexFull.html'
      }
    };
    api.login(credentials, loginCallback);

  });


