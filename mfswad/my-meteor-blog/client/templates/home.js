Template.home.created = function () {
    console.log('Created the home template');
};

Template.home.rendered = function () {
    console.log('Rendered the home template');

    // this.$('p').html('We just replaced that text!');
};


// Template.home.destroyed = function () {
//     console.log('Destroyed the home template');
// };


// Template helpers
Template.home.helpers({
    // exampleHelper: function () {
    //     return 'This text came from a helper with some <strong>HTML</strong>.';
    //     // if you use the version below, you can change the triple stache with two {{exampleHelper}} in your home.html
    //     // return new Spacebars.SafeString('This text came from a helper with some <strong>HTML</strong>.');
    // },

    // // Setting the data context for a template
    // dataContextHelper: function () {
    //     return {
    //         someText: 'This data was set using a helper of the parent template.',
    //         someNested: {
    //             text: 'That comes from "someNested.text"'
    //         }
    //     };
    // },

    // Listing posts
    postsList: function () {
        return Posts.find({}, {
            sort: {
                timeCreated: -1
            }
        });
    }
});

Template.home.events({
    'click button.lazyload': function (e, template) {
        var currentLimit = Session.get('lazyloadLimit');
        Session.set('lazyloadLimit', currentLimit + 2);
    }
});