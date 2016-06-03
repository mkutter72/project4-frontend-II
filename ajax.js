'use strict';
var externAppsFunctions = externAppsFunctions || {};

var allMessages = "";

function addMessageCallback(error,data)
{
    if (error) {

      $('#result').val('status: ' + error.status + ', error: ' +error.error);
      return;
    }

  externAppsFunctions.sendBoardMessage();
};

function fillCalendarCallback(error, data) {
    if (error) {

      $('#result').val('status: ' + error.status + ', error: ' +error.error);
      return;
    }

    // keeping this around just incase I need to turn back on displaying all returns from DB
    var dataStr = JSON.stringify(data, null, 4);

    var oneThing = data[0];
    var size = data.length;
    for (var i = 0; i < data.length; i++)
        externAppsFunctions.addCalendarEvent(data[i]["date"],data[i]["userName"],data[i]["description"],data[i]["time"]);

  };

function displayMessagesCallback(error, data) {
    if (error) {

      $('#chatspace').val('status: ' + error.status + ', error: ' +error.error);
      return;
    }

    if (data) {
      // keeping this around just incase I need to turn back on displaying all returns from DB
      var dataStr = JSON.stringify(data, null, 4);

      allMessages = "";
      var oneThing = data.messages;
      var size = oneThing.length;
      for (var i = 0; i < size; i++) {
        allMessages += oneThing[i]["userName"] + "  ";
        allMessages += oneThing[i]["mesageTime"] + "\n";
        allMessages += oneThing[i]["messageText"] + "\n\n";
        }
      $('#chatspace').val(allMessages);
    } else {
      $('#chatspace').val("error, no messages found");
    }

  };

function displayBoardNamesCallback(error, data) {
    if (error) {

      $('#chatspace').val('status: ' + error.status + ', error: ' +error.error);
      return;
    }

    if (data) {
      // keeping this around just incase I need to turn back on displaying all returns from DB
      var dataStr = JSON.stringify(data, null, 4);

      var oneThing = data.boardnames;
      var size = oneThing.length;

      $('#mboardDropDown').empty();
      var list = document.getElementById("mboardDropDown");

      for (var i = 0; i < size; i++){
        var opt = oneThing[i];
        var li = document.createElement("li");
        var link = document.createElement("a");
        var text = document.createTextNode(opt);
        link.appendChild(text);
        link.href = "#";
        li.appendChild(link);
        list.appendChild(li);
        }

    } else {
      $('#chatspace').val("No message boards found");
    }

  };

function displayWallPostsCallback(error, data) {
    if (error) {

      console.log('status: ' + error.status + ', error: ' +error.error);
      return;
    }

    if (data) {
      // keeping this around just incase I need to turn back on displaying all returns from DB
      var dataStr = JSON.stringify(data, null, 4);

      // clear the page first
      $("#wallStart").empty();

      // go to the top of the page
      $('body').scrollTop(0);

      for (var i = data.length-1; i >= 0; i--) {
        var outputStr = "<h2 class=\"section-heading\">" + data[i].title + "</h2>";
        outputStr += "<p>" + data[i].text + "</p>";

        if (data[i].photo) {
          outputStr += "<a><img class=\"img\" src=\""
          if (data[i].imageWidth > 4000 || data[i].imageHeight > 4000) {
            outputStr += data[i].photo + "\" width=\"" + data[i].imageWidth/10  + "\"height=\"" + data[i].imageHeight/10 + "\"></a>";
          } else
          if (data[i].imageWidth > 2000 || data[i].imageHeight > 2000) {
            outputStr += data[i].photo + "\" width=\"" + data[i].imageWidth/6  + "\"height=\"" + data[i].imageHeight/6 + "\"></a>";
          } else
          if (data[i].imageWidth > 1000 || data[i].imageHeight > 1000) {
            outputStr += data[i].photo + "\" width=\"" + data[i].imageWidth/3  + "\"height=\"" + data[i].imageHeight/3 + "\"></a>";
          } else
            outputStr += data[i].photo + "\"></a>";
          }

        outputStr += "<span class=\"caption text-muted\">Posted by ";
        outputStr += data[i].userName + " on "+ data[i].date + "</span><hr>";

        $("#wallStart").append(outputStr);
        }
    }
  };


function createWallPostsCallback(error, data) {
    if (error) {
      alert("Error in creating wallpost");
      console.log('status: ' + error.status + ', error: ' +error.error);
    } else {
      api.getWallPosts(displayWallPostsCallback);
    }
};

function generalCallback(error, data) {
    if (error) {

      console.log('status: ' + error.status + ', error: ' +error.error);
      return;
    }

    // keeping this around just incase I need to turn back on displaying all returns from DB
    var dataStr = JSON.stringify(data, null, 4);

  };

var api = {
  url: 'http://localhost:3000',
  ajax: function(config, cb) {
    $.ajax(config).done(function(data, textStatus, jqxhr) {
      cb(null, data);
    }).fail(function(jqxhr, status, error) {
      cb({jqxher: jqxhr, status: status, error: error});
    });
  },
  register: function(credentials, callback) {
    this.ajax({
      method: 'POST',
      url: this.url + '/signup',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(credentials)
      // dataType: 'json'
    }, callback);
  },
  login: function(credentials, callback) {
    this.ajax({
      method: 'POST',
      url: this.url + '/login',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(credentials)
    }, callback);
  },
  logout: function(callback) {
    this.ajax({
      method: 'PATCH',
      url: this.url + '/logout',
    }, callback);
  },

  getCalendar: function (callback) {
    this.ajax({
      method: 'GET',
      url: this.url + '/appointment',
    }, callback);
  },

  createAppointment: function(appointmentData, callback) {
    this.ajax({
      method: 'POST',
      url: this.url + '/appointment/makenew',
      contentType: 'application/json',
      data: JSON.stringify(appointmentData)
    }, callback);
  },

 createMessageBoard: function(boardData, callback) {
    this.ajax({
      method: 'POST',
      url: this.url + '/mboard/makenew',
      contentType: 'application/json',
      data: JSON.stringify(boardData)
    }, callback);
  },

  updateMessageBoard: function(messageData, callback) {
    this.ajax({
      method: 'PATCH',
      url: this.url + '/mboard/update',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(messageData)
    }, callback);
  },

  getMessageBoard: function (boardName, callback) {
      this.ajax({
        method: 'GET',
        url: this.url + '/mboard?q=' + boardName,
        dataType: 'json'
      }, callback);
  },

 getMessageBoardNames: function (callback) {
      this.ajax({
        method: 'GET',
        url: this.url + '/mboard',
        dataType: 'json'
      }, callback);
  },

  deleteMessageBoard: function (boardName, callback) {
    this.ajax({
      method: 'DELETE',
      url: this.url + '/mboard/destroy?q=' + boardName,
    }, callback);
  },

  clearDate: function (dateStr, callback) {
    this.ajax({
      method: 'DELETE',
      url: this.url + '/appointment/destroy?q=' + dateStr,
    }, callback);
  },

  getWallPosts: function (callback) {
    this.ajax({
      method: 'GET',
      url: this.url + '/wallpost',
    }, callback);
  },

  createWallPost: function (data,callback) {
    this.ajax({
      method: 'POST',
      url: this.url + '/wallpost/makenew',
      contentType: false,
      processData: false,
      data: data
    }, callback);
  },
};



function addOrRemoveBoardCallback(error, data) {
    if (error) {

      $('#result').val('status: ' + error.status + ', error: ' +error.error);
      return;
    }

    api.getMessageBoardNames(displayBoardNamesCallback);
  };
