import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
//import { Session } from 'meteor/session';
import { Tasks } from '../api/tasks.js';

import './task.js';
import './todo.html';
import './timer.js'

Template.todo.helpers({
  tasks() {
    // Show newest tasks at the top
    return Tasks.find({}, { sort: { createdAt: -1 } });
  },
});

Template.todo.events({
  'submit .new-task'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    console.log(event);

    // Get value from form element
    const target = event.target;

    const title = target.title.value;
    const description = target.description.value;

    // Insert a task into the collection
    Tasks.insert({
      title,
      description,
      cycles: 0,
      createdAt: new Date(), // current time
    });

    // Clear form
    target.title.value = '';
    target.description.value = '';
  },
});

