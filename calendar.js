'use strict';

var externAppsFunctions = externAppsFunctions || {};

var allEvents;

//var socket = io('http://localhost:3030');

function addLeadingZero (num) {
 if (num < 10) {
   return "0" + num;
 } else {
   return "" + num;
 }
};

function addCalendarEvent(key,userName,description,time)
{
  var events = allEvents.options.events;
  var currentAppointments = {}
  currentAppointments[key] = events[key];

  if (events[key]) {
    currentAppointments[key].number +=  1;
    var newindex = currentAppointments[key].dayEvents.length;
    var newAppointment = {
      "userName": userName,
      "description": description,
      "time": time
    };

    currentAppointments[key].dayEvents[newindex] = newAppointment;

    $(".responsive-calendar").responsiveCalendar('edit', currentAppointments);
  } else {

    var editData = {};
    editData[key] = {
      "number": 1,
      "dayEvents": [{
        "userName": userName,
        "description": description,
        "time": time
      }]
    };

    $(".responsive-calendar").responsiveCalendar('edit', editData);
  };
};



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

$(document).ready(function () {
  $('#showEvents').on('click',function (event){
    var resultString = JSON.stringify(allEvents.options.events);
    $('#result').val(resultString);
  });

  $('#createBoardID').on('click',function (e){
    var boardData = {
      "boardname": $('#boardNameID').val()
        };

    e.preventDefault();
    api.createMessageBoard(boardData,generalCallback);
    });

 $('#postMessageID').on('click',function (e){
   var messageData = {
      "boardname": $('#boardNameID').val(),
      "messagetext": $('#messageTextID').val()
        };

    e.preventDefault();
    api.updateMessageBoard(messageData,generalCallback);
 //   socket.emit('chat message', $('#messageTextID').val());
  });

  $('#seleectBoardID').on('click',function (e){
    e.preventDefault();
    api.getMessageBoard($('#boardNameID').val(),displayMessagesCallback);
  });

  // socket.on('chat message', function(msg){
  //     $('#chatspace').val(msg);
  //   });

  $('#create-appointment').on('submit', function(e) {
    e.preventDefault();
    var appointmentData = form2object(this);

    var events = allEvents.options.events;
    var currentAppointments = {}
    var key = appointmentData.appDate;
    currentAppointments[key] = events[key];

    if (events[key]) {
      currentAppointments[key].number +=  1;
      var newindex = currentAppointments[key].dayEvents.length;
      var newAppointment = {
        "userName": appointmentData.appUsername,
        "description": appointmentData.appDescription,
        "time": appointmentData.appTime
      };

      currentAppointments[key].dayEvents[newindex] = newAppointment;

      $(".responsive-calendar").responsiveCalendar('edit', currentAppointments);
    } else {

      var editData = {};
      editData[appointmentData.appDate] = {
        "number": 1,
        "dayEvents": [{
          "userName": appointmentData.appUsername,
          "description": appointmentData.appDescription,
          "time": appointmentData.appTime
        }]
      };

      $(".responsive-calendar").responsiveCalendar('edit', editData);
    }
    $('#create-appointment').trigger("reset");
    api.createAppointment(appointmentData,generalCallback);
  });

$('#clearEvents').on('click',function (){
  console.log("got click");

  $(".responsive-calendar").responsiveCalendar('clearAll');

});


$(".responsive-calendar").responsiveCalendar({
  time: '2015-12',
  startFromSunday: true,
  allRows: false,

  onDayHover: function(events) {
    var key = $(this).data('year')+'-'+addLeadingZero( $(this).data('month') )+'-'+addLeadingZero( $(this).data('day') );
    var  thisDayEvent = events[key];

    var resultString = key;

    if (thisDayEvent) {
      resultString += JSON.stringify(thisDayEvent);
      }
    $('#result').val(resultString);
    },


  onDayClick: function(events) {
    var key = $(this).data('year')+'-'+addLeadingZero( $(this).data('month') )+'-'+addLeadingZero( $(this).data('day') );

    $("#appointment-date").val(key);

    },

  onInit: function() {
   allEvents = this;
   api.getCalendar(fillCalendarCallback);
    }

  })
});


externAppsFunctions['addCalendarEvent'] = addCalendarEvent;

