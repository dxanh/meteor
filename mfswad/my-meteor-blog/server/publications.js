Meteor.publish('all-posts', function () {
    return Posts.find()
});

Meteor.publish('limited-posts', function () {
    return Posts.find({}, {
        limit: 2,
        sort: {
            timeCreated: -1
        }
    });
});
Meteor.publish('specificfield', function () {
    return Posts.find({}, {
        fields: {
            title: 1
        }
    });
});
Meteor.publish('lazyload-posts', function (limit) {
    return Posts.find({}, {
        limit: limit,
        fields: {
            text: 0
        },
        sort: {
            timeCreated: -1
        }
    });
});