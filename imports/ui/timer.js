import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { ReactiveVar } from 'meteor/reactive-var';
import {Tasks} from '../api/tasks.js';

import './timer.html'

var SPEEDUP = 1;

Template.timer.onCreated(function timerOnCreated() {
    this.pomodoroState = "paused";
    this.timerIntervalId = 0;
    this.seconds_left = new ReactiveVar(25*60);
});



Template.timer.helpers({
    timer() {
        var seconds_left = Template.instance().seconds_left.get();
        var minutes = Math.floor(seconds_left / 60);
        var seconds = seconds_left - minutes * 60;
        var paddedSeconds = seconds < 10 ? "0" + seconds : seconds;
        var paddedMinutes = minutes < 10 ? "0" + minutes : minutes;
        return paddedMinutes + ":" + paddedSeconds;
    }
});

Template.timer.events({
    'click button#start'(event, instance) {
        console.log("Starting");
        if(instance.pomodoroState=="paused" && instance.seconds_left.get()>0) {
            instance.pomodoroState = "running";
            var self = this;
            instance.timerIntervalId = Meteor.setInterval(function () {
                if(instance.seconds_left.curValue <= 0 ) {
                    Meteor.clearInterval(instance.timerIntervalId);

                    var cycleCount = Session.get(instance.data.parentID);
                    Session.set(instance.data.parentID, cycleCount+1);

                    Tasks.update(instance.data.parentID, {
                        $set: {cycles: cycleCount+1 },
                    });
                } else {
                    instance.seconds_left.set(instance.seconds_left.get()-1);

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
        instance.seconds_left.set(25*60);
    }
});
