// Meteor.subscribe('all-posts');
// Meteor.subscribe('limited-posts');
// Meteor.subscribe('specificfield');
Session.setDefault('lazyloadLimit', 2);
Tracker.autorun(function () {
    Meteor.subscribe('lazyload-posts', Session.get('lazyloadLimit'));
});