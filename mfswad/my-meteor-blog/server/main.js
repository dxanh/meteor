import "/collections.js";

Meteor.startup(function () {

  console.log('Server started');


  // #Users and Permissions -> -> Creating the admin user
  if (Meteor.users.find().count() === 0) {

    console.log('Created Admin user');

    var userId = Accounts.createUser({
      username: 'johndoe',
      email: 'johndoe@example.com',
      password: '1234',
      profile: {
        name: 'John Doe'
      }
    });
    Meteor.users.update(userId, {
      $set: {
        roles: {
          admin: true
        },
      }
    })
  };

  // #Storing Data -> Adding example posts
  if (Posts.find().count() === 0) {

    console.log('Adding dummy posts');

    var dummyPosts = [{
        title: 'My First entry',
        slug: 'my-first-entry',
        description: 'Lorem ipsum dolor sit amet.',
        text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
        timeCreated: moment().subtract(7, 'days').unix(),
        author: 'John Doe'
      },
      {
        title: 'My Second entry',
        slug: 'my-second-entry',
        description: 'Borem ipsum dolor sit amet, consetetur sadipscing.',
        text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
        timeCreated: moment().subtract(5, 'days').unix(),
        author: 'John Doe'
      },
      {
        title: 'My Third entry',
        slug: 'my-third-entry',
        description: 'Dorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor.',
        text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
        timeCreated: moment().subtract(3, 'days').unix(),
        author: 'John Doe'
      },
      {
        title: 'My Fourth entry',
        slug: 'my-fourth-entry',
        description: 'Sorem ipsum dolor sit amet, consetetur sadipscing.',
        text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
        timeCreated: moment().subtract(2, 'days').unix(),
        author: 'John Doe'
      },
      {
        title: 'My Fifth entry',
        slug: 'my-fifth-entry',
        description: 'Korem ipsum dolor sit amet, consetetur sadipscing elitr.',
        text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
        timeCreated: moment().subtract(1, 'days').unix(),
        author: 'John Doe'
      }
    ];

    // we add the dummyPosts to our database
    _.each(dummyPosts, function (post) {
      Posts.insert(post);
    });
  }
});

// Publications

// Meteor.publish('all-posts', function () {
//   return Posts.find()
// });

// Meteor.publish('limited-posts', function () {
//   return Posts.find({}, {
//     limit: 2,
//     sort: {
//       timeCreated: -1
//     }
//   });
// });
// Meteor.publish('specificfield', function () {
//   return Posts.find({}, {
//     fields: {
//       title: 1
//     }
//   });
// });

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

Meteor.publish("single-post", function (slug) {
  return Posts.find({
    slug: slug
  });
});

Meteor.publish("userRoles", function () {
  if (this.userId) {
    return Meteor.users.find({
      _id: this.userId
    }, {
      fields: {
        roles: 1
      }
    });
  } else {
    this.ready();
  }
});