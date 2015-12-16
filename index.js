


 $('#logMeIn').on('submit', function(e) {
    e.preventDefault();

    var credentials = form2object(this);

    var loginCallback = function(error, data){
      if(error){
        console.log(error);
      } else {
        window.location.href = 'indexFull.html'
      }
    };
    api.login(credentials, loginCallback);
});
