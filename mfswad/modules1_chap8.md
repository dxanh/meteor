# Security with the Allow and Deny Rules

To make it possible to insert and update documents in our database,
we need to set constraints so that not everybody can change our database.
This is done using the allow and deny rules.

## Adding a function to generate slugs

Use the underscore-string library to generate slugs from our post's titles
Run the following command from the terminal in our my-meteor-blog folder:

    meteor add wizonesolutions:underscore-string

## Creating a new post

Create a JavaScript file for our editPost template by saving a
file called editPost.js and add an event for the Save button
to the my-meteor-blog/client/templates

```js
Template.editPost.events({
  'submit form': function(e, template) {
    e.preventDefault()
    console.log('Post saved')
  }
})
```

Go to the http://localhost:3000/create-post route and click on the Save Post button,
the Post saved log should appear in the browser's console

## Saving a post

Redirect to the newly created post page by extend click event with the following lines of code

```js
Template.editPost.events({
  'submit form': function(e, tmpl) {
    e.preventDefault()
    var form = e.target,
      user = Meteor.user()
    var slug = _.slugify(form.title.value)
    Posts.insert(
      {
        title: form.title.value,
        slug: slug,
        description: form.description.value,
        text: form.text.value,
        timeCreated: moment().unix(),
        author: user.profile.name,
        owner: user._id
      },
      function(error) {
        if (error) {
          // display the error to the user
          alert(error.reason)
        } else {
          // Redirect to the post
          Router.go('Post', {
            slug: slug
          })
        }
      }
    )
  }
})
```

Back to browser, create new post, fill in the form, and click on the Save button,
we should have created our first own post

## Updating the current post

Since we set the data context of the editPost template,
we can simply use the presence of the post's \_id field as
an indicator to update

```js
Template.editPost.events({
  'submit form': function(e, tmpl) {
    e.preventDefault()
    var form = e.target,
      user = Meteor.user(),
      _this = this // we need this to reference the slug in the callback
    // Edit the post
    if (this._id) {
      Posts.update(
        this._id,
        {
          $set: {
            title: form.title.value,
            description: form.description.value,
            text: form.text.value
          }
        },
        function(error) {
          if (error) {
            // display the error to the user
            alert(error.reason)
          } else {
            // Redirect to the post
            Router.go('Post', {
              slug: _this.slug
            })
          }
        }
      )
      // SAVE
    } else {
      // The insertion process ...
    }
  }
})
```

## Removing the insecure package

Make that no client can simply make changes to our database without
passing our allow and deny rules, we need to remove the insecure package

Quit the running meteor instance using Ctrl + C in the terminal
and run the following command:

    meteor remove insecure

After that, run meteor again, try to edit any post, we will see an
alert window stating Access denied

## Adding our first allow rules

To make our posts editable again, we need to add allow rules to enable database updates again

Add the following allow rules to our my-meteor-blog/ collections.js

```js
if (Meteor.isServer) {
  Posts.allow({
    insert: function(userId, doc) {
      // The user must be logged in, and the document must be owned by the user
      return userId && doc.owner === userId && Meteor.user().roles.admin
    },
    update: function(userId, doc, fields, modifier) {
      // User must be an admin
      return Meteor.user().roles.admin
    },
    // make sure we only get this field from the documents
    fetch: ['owner']
  })
}
```

If we now try to edit a post in our website,
we should be able to edit all posts as well as create new ones.

## Adding a deny rule

To improve security, we can fix the owner of the post and the time when it was created.
We can prevent changes to the owner and the timeCreated and slug fields by adding an
additional deny rule to our Posts collection, as follows:

```js
if (Meteor.isServer) {
  // Allow rules
  Posts.deny({
    update: function(userId, docs, fields, modifier) {
      // Can't change owners, timeCreated and slug
      return (
        _.contains(fields, 'owner') ||
        _.contains(fields, 'timeCreated') ||
        _.contains(fields, 'slug')
      )
    }
  })
}
```
