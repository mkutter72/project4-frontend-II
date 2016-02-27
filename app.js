'use strict';


var form2object = function(form) {
    var data = {};
    $(form).find("input").each(function(index, element) {
      var type = $(this).attr('type');
      if ($(this).attr('name') && type !== 'submit' && type !== 'hidden') {
        data[$(this).attr('name')] = $(this).val();
      }
    });
    return data;
  };

$(function() {
    $.ajaxSetup({
       xhrFields: {
         withCredentials: true
    }
    });

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
