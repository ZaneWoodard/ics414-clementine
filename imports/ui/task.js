import {Template} from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var'
import {Tasks} from '../api/tasks.js';

import './task.html';

Template.task.onCreated(function timerOnCreated() {
    this.showDescription = new ReactiveVar(false);
});

Template.task.events({
    'click .toggle-checked'() {
        // Set the checked property to the opposite of its current value
        Tasks.update(this._id, {
            $set: {checked: !this.checked},
        });
    },
    'click .delete'() {
        Tasks.remove(this._id);
    },
    'click .card-title'() {
        var show = Template.instance().showDescription;
        show.set(!show.get());
    }
});

Template.task.helpers({
    showMore: function(){
        return Template.instance().showDescription.get();
    }
})