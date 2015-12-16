'use strict';


  $('#registerForm').on('submit', function(e) {
    e.preventDefault();
    console.log("got here");
    window.location.href = 'login.html'

  });


$('#loginForm').on('submit', function(e) {
    e.preventDefault();
    console.log("got here");
    window.location.href = 'indexFull.html'
  });
