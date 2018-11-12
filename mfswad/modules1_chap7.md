# Users and Permissions

In this chapter, we will add our backend login and create the admin user.
We will also create the template to edit posts and make an edit button
visible to the admin user so that they can edit and add new content.

## Meteor's accounts packages

Meteor makes it very easy to add authentication to our web app using its accounts package.
The accounts package is a complete login solution tied to Meteor's core.
Created users can be identified by ID in many of Meteor's server-side functions,
for example, in a publication:

```js
   Meteor.publish("examplePublication", function () {
     // the current loggedin user id can be accessed via
     this.userId;
}
```

Additionally, we can add support for login via Facebook, GitHub, Google, Twitter, Meetup,
and Weibo by simply adding one or more of the accounts-\* core packages.

## Adding the accounts packages

Navigate to our my-meteor-blog folder, and type the following command:

       meteor add accounts-ui accounts-password

To prevent the creation of additional user accounts by our visitors,
we need to disallow this functionality in our accounts package, config

Open up our my-meteor-blog/main.js file and remove all of the code. Then add
the following lines of code to this file, but make sure don't use if(Meteor.isClient)

```js
Accounts.config({
  forbidClientAccountCreation: true
})
```

This will forbid any call of Accounts.createUser() on the client and the
accounts-ui package will not show the Register button to our visitors.

## Adding admin functionality to our templates

We will add a Create new post link to our home template,
then add the Edit post link to the post's pages template,
and finally add the login buttons and form to the main menu.

## Adding a link for new posts

Create new post link.
Open the home template at my-meteor- blog/clients/templates/home.html
and add the following lines of code just above the {{#each postsList}} block helper

```html
{{#if currentUser}}
<a href="/create-post" class="createNewPost">Create new post</a> {{/if}}
```

## Adding the link to edit posts

To edit posts, we simply add an Edit post link to our post template.

Open up post.html from the same folder and add {{#if currentUser}}..{{/if}} after {{author}}, as follows:

## Adding the login form

Now that we have both links to add and edit posts, let's add the login form.
We can create our own form, but Meteor already comes with a simple login form,
which we can style to fit our design

Since we added the accounts-ui package previously,
Meteor provides us with the {{> loginButtons}} template helper, which works as a drop-in-place template.

To add this, we will open our layout.html template and add the following
helper inside our menu's <ul></ul> tags, as follows:

```html
<h1>My Meteor Single Page App</h1>
<ul>
  <li><a href="/">Home</a></li>
  <li><a href="/about">About</a></li>
</ul>
{{> loginButtons}}
```

## Creating the template to edit posts

Create a file called editPost.html inside our my-meteor-blog/client/templates folder,
and fill it with the following lines of code:

```html
<template name="editPost">
  <div class="editPost">
    <form>
      <label>
        Title
        <input
          type="text"
          name="title"
          placeholder="Awesome title"
          value="{{title}}"
        />
      </label>
      <label>
        Description
        <textarea
          name="description"
          placeholder="Short description
   displayed in posts list"
          rows="3"
        >{{description}}</textarea>
      </label>
      <label>
        Content
        <textarea
          name="text"
          rows="10"
          placeholder="Brilliant
   content"
        >{{text}}</textarea>
      </label>
      <button type="submit" class="save">Save Post</button>
    </form>
  </div>
</template>
```

If we now check http://localhost:3000/, we will notice that we can't see any
of the changes we made so far, apart from the Sign in link in the corner
of our website.

## Creating the admin user

Open the my-meteor-blog/server/main.js file and add the following
lines of code somewhere inside Meteor.startup(function(){...}):

```js
if (Meteor.users.find().count() === 0) {
  console.log('Created Admin user')

  var userId = Accounts.createUser({
    username: 'johndoe',
    email: 'johndoe@example.com',
    password: '1234',
    profile: {
      name: 'John Doe'
    }
  })
  Meteor.users.update(userId, {
    $set: {
      roles: {
        admin: true
      }
    }
  })
}
```

If we now go to our browser, we should be able to log in using the user
we just created, and we immediately see that all the edit links appear.
However, when we click any of the edit links, we will see the notFound
template appearing because we didn't create any of our admin routes yet.

## Adding permissions

Meteor's account package doesn't come by default with configurable permissions for users.
To add permission control, we can add a third-party package such as the deepwell:authorization package,
which can be found on Atmosphere at http://atmospherejs.com/deepwell/authorization
and which comes with a complex role model.

By default, Meteor publishes the username, emails, and profile properties of the currently logged-in user.
To add additional properties, such as our custom roles property, we need to add a publication,
to access the roles property on the client as well, as follows:

Open the my-meteor/blog/server/publications.js file and add the following publication:

```js
Meteor.publish('userRoles', function() {
  if (this.userId) {
    return Meteor.users.find({ _id: this.userId }, { fields: { roles: 1 } })
  } else {
    this.ready()
  }
})
```

In the my-meteor-blog/main.js file, we add the subscription as follows:

```js
if (Meteor.isClient) {
  Meteor.subscribe('userRoles')
}
```

Now that we have the roles property available on the client,
we can change {{#if currentUser}}..{{/if}} in the home and post templates
to {{#if currentUser.roles.admin}}..{{/if}} so that only admins can see the buttons.

## Creating routes for the admin

To add the route to create posts, let's open up our my-meteor-blog/routes.js file
and add the following route to the Router.map() function:

```js
this.route('Create Post', {
  path: '/create-post',
  template: 'editPost'
})
```

To make the edit post route work, we need to add subscriptions similar to those
we did for the Post route itself. To keep things DRY (which means Don't Repeat Yourself),
we can create a custom controller, which both routes will use, as follows:

Add the following lines of code after the Router.configure(...); call:

```js
PostController = RouteController.extend({
  waitOn: function() {
    return Meteor.subscribe('single-post', this.params.slug)
  },
  data: function() {
    return Posts.findOne({ slug: this.params.slug })
  }
})
```

Now we can simply edit the Post route,
remove the waitOn() and data() functions, and add PostController instead:

```js
this.route('Post', {
  path: '/posts/:slug',
  template: 'post',
  controller: 'PostController'
})
```

Now we can also add the Edit Post route by just changing the path and the
template properties:

```js
this.route('Edit Post', {
  path: '/edit-post/:slug',
  template: 'editPost',
  controller: 'PostController'
})
```

## Preventing visitors from seeing the admin routes

To prevent visitors from seeing admin routes,
we need to check whether the user is logged in before we show them the routes.

Add the following code snippet at the end of the routes.js file:

```js
   var requiresLogin = function(){
       if (!Meteor.user() ||
           !Meteor.user().roles ||
           !Meteor.user().roles.admin) {
           this.render('notFound');
       } else {
           this.next();
} };
   Router.onBeforeAction(requiresLogin, {only: ['Create Post','Edit
   Post']});
```
