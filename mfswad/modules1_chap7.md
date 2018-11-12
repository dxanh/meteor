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
