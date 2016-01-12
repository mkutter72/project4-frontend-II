 'use strict';

var externAppsFunctions = externAppsFunctions || {};

var allEvents;

var socket = io('https://intense-cove-9531.herokuapp.com');

var messageToBeSent = "";
var currentMessageBoard = "";

function sendBoardMessage()
{
  socket.emit('chat message', messageToBeSent);
};

$(document).ready(function () {

  $('#createBoardID').on('click',function (e){
    e.preventDefault();

    if ($('#boardNameID').val() === "") {
      $('#chatspace').val("Please enter a name for the new message board.");
      return;
    }

    currentMessageBoard = $('#boardNameID').val();
    var boardData = {
      "boardname": currentMessageBoard
        };

    $('#chatspace').val("");
    var newButtonText = currentMessageBoard + '   <span class="caret">';
    document.getElementById("dropdownMenu1").innerHTML = newButtonText;
    api.createMessageBoard(boardData,addOrRemoveBoardCallback);
    });

 $('#postMessageID').on('click',function (e){
    e.preventDefault();

    if (currentMessageBoard === "") {
      $('#chatspace').val("Please select a message board");
      return;
    }

    var messageData = {
      "boardname": currentMessageBoard,
      "messagetext": $('#messageTextID').val()
      };

    // Get the message ready.   It will be sent after the database transaction has completed
    var d = new Date();
    messageToBeSent = "MSG" + sessionStorage.currentUser + " " + d.toLocaleString() + "\n" + $('#messageTextID').val() + "\n\n";

    sendBoardMessage();
    api.updateMessageBoard(messageData,generalCallback);
    $('#messageTextID').val("");
    });

 $('#deleteBoardID').on('click',function (e){
    if (currentMessageBoard === "") {
      $('#chatspace').val("Please select a message board to delete.");
      return;
    }
    e.preventDefault();
    $('#chatspace').val("");
    document.getElementById("dropdownMenu1").innerHTML = 'Select Message Board   <span class="caret">';
    api.deleteMessageBoard(currentMessageBoard,addOrRemoveBoardCallback);
    });


  $("#mboardDropDown").on("click", "li", function(e){
    e.preventDefault();
    currentMessageBoard = $(this).text();
    var newButtonText = currentMessageBoard + '   <span class="caret">';
    document.getElementById("dropdownMenu1").innerHTML = newButtonText;
    api.getMessageBoard(currentMessageBoard,displayMessagesCallback);
  })


  socket.on('chat message', function(msg){
    if (msg.startsWith("MSG")) {
      var newMessage = msg.replace("MSG","");
      allMessages += newMessage;
      $('#chatspace').val(allMessages);
      console.log(newMessage);
      }
    });

    // fill selection dropdown
    api.getMessageBoardNames(displayBoardNamesCallback);
});

externAppsFunctions['sendBoardMessage'] = sendBoardMessage;


