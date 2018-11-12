# Storing Data and Handling Collections

## Meteor and databases

Meteor currently uses MongoDB by default to store data on the server

MongoDB is a NoSQL database. This means it is based on a flat document
structure instead of a relational table structure. Its document approach
makes it ideal for JavaScript as documents are written in BJSON, which is
very similar to the JSON format.

MongoDB uses a data structure called collection, which is the equivalent of a
table in a SQL database. Collections contain documents, where each document
has its own unique ID.

These collections are used to store data in the server's MongoDB as well as
the client- side minimongo collection, which is an in-memory database mimicking
the behavior of the real MongoDB.

## Setting up a collection

Create a file called collections.js inside our my-meteor-blog folder.
We need to create it in the root folder so that it will be available
on both the client and the server.

Add the following line of code to the collections.js file:

```js
Posts = new Mongo.Collection('posts')
```

## Adding post examples

Create a file called main.js inside our my-meteor-blog/server folder.

We then add the post example, but only when the collection is empty.
So to prevent this, we add them every time we restart the server, as follows:

```js
import '/collections.js'

Meteor.startup(function() {
  console.log('Server started')

  // #Storing Data -> Adding example posts
  if (Posts.find().count() === 0) {
    console.log('Adding dummy posts')

    var dummyPosts = [
      {
        title: 'My First entry',
        slug: 'my-first-entry',
        description: 'Lorem ipsum dolor sit amet.',
        text:
          'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
        timeCreated: moment()
          .subtract(7, 'days')
          .unix(),
        author: 'John Doe'
      },
      {
        title: 'My Second entry',
        slug: 'my-second-entry',
        description: 'Borem ipsum dolor sit amet, consetetur sadipscing.',
        text:
          'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
        timeCreated: moment()
          .subtract(5, 'days')
          .unix(),
        author: 'John Doe'
      },
      {
        title: 'My Third entry',
        slug: 'my-third-entry',
        description:
          'Dorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor.',
        text:
          'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
        timeCreated: moment()
          .subtract(3, 'days')
          .unix(),
        author: 'John Doe'
      },
      {
        title: 'My Fourth entry',
        slug: 'my-fourth-entry',
        description: 'Sorem ipsum dolor sit amet, consetetur sadipscing.',
        text:
          'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
        timeCreated: moment()
          .subtract(2, 'days')
          .unix(),
        author: 'John Doe'
      },
      {
        title: 'My Fifth entry',
        slug: 'my-fifth-entry',
        description: 'Korem ipsum dolor sit amet, consetetur sadipscing elitr.',
        text:
          'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
        timeCreated: moment()
          .subtract(1, 'days')
          .unix(),
        author: 'John Doe'
      }
    ]

    // we add the dummyPosts to our database
    _.each(dummyPosts, function(post) {
      Posts.insert(post)
    })
  }
})
```

## Querying a collection

To list these newly inserted posts in our front page, we need to replace the content
of our postsList helper in the home.js file with the following lines of code:

```js
Template.home.helpers({
  postsList: function() {
    return Posts.find({}, { sort: { timeCreated: -1 } })
  }
})
```
