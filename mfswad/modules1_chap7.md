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
<strong>{{> loginButtons}}</strong>
```

## Creating the template to edit posts
