import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';

import './main.html';
import '../imports/ui/todo.js'; //imports todo.js from imports folder

var SPEEDUP = 1;

Template.timer.onCreated(function timerOnCreated() {
  this.pomodoroState = "paused";
  this.timerIntervalId = 0;
  Session.set("seconds_left", 25*60);
});



Template.timer.helpers({
  timer() {
    var secondsLeft = Session.get("seconds_left");
    var minutes = Math.floor(secondsLeft / 60);
    var seconds = secondsLeft - minutes * 60;
    var paddedSeconds = seconds < 10 ? "0" + seconds : seconds;
    var paddedMinutes = minutes < 10 ? "0" + minutes : minutes;
    return paddedMinutes + ":" + paddedSeconds;
  },
});

Template.timer.events({
  'click button#start'(event, instance) {
    console.log("Starting");
    if(instance.pomodoroState=="paused") {
      instance.pomodoroState = "running";
      instance.timerIntervalId = Meteor.setInterval(function () {
        var secondsLeft = Session.get("seconds_left");
        if(secondsLeft <= 0 ) {
          Meteor.clearInterval(instance.timerIntervalId);
        } else {
          Session.set("seconds_left", Session.get("seconds_left") - 1);
        }
      }, 1000 / SPEEDUP);
    }
  },
  'click button#pause'(event, instance) {
    console.log("Pausing");
    if(instance.pomodoroState=="running") {
      instance.pomodoroState = "paused";
      Meteor.clearInterval(instance.timerIntervalId);
    }
  },
  'click button#reset'(event, instance) {
    console.log("Resetting");
    instance.pomodoroState = "paused";
    Meteor.clearInterval(instance.timerIntervalId);
    Session.set("seconds_left", 25*60);
  }
});
    