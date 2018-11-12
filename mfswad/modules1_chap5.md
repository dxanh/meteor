# Making Our App Versatile with Routing

## Adding the iron:router package

Go to our my-meteor-blog

    meteor add iron:router

Start Meteor again by running the \$ meteor command and will see Error: iron:router
No route definitions found.

## Setting up the router

Create a file called routes.js directly in the root of my-meteor-blog folder

```js
Router.configure({
  layoutTemplate: 'layout'
})

Router.map(function() {
  this.route('Home', {
    path: '/',
    template: 'home'
  })
})
```

To prevent the double appearance of the layout, remove the {{> layout}} helper
from the <body> tag inside index.html file

## Switching to a layout template

Replace the {{> home}} inclusion helper inside layout.html template with {{> yield}}
The {{> yield}} helper is a placeholder helper provided by iron:router, where route templates get rendered.
After doing this, the browser still rendering the home template but this time dynamically.

Add a not found template to app by adding the following template to layout.html

```html
<template name="notFound">
  <div class="center">
    <h1>Nothing here</h1>
    <br />
    <h2>You hit a page which doesn't exist!</h2>
  </div>
</template>
```

Add the notFoundTemplate property to the Router

```js
Router.configure({
  layoutTemplate: 'layout',
  notFoundTemplate: 'notFound'
})
```

Navigate to http://localhost:3000/anything in browser,
will see the notFound template being rendered instead of home template

## Adding another route

Create an About route , edit routes.js

```js
Router.map(function() {
  this.route('Home', {
    path: '/',
    template: 'home'
  })
  this.route('About', {
    path: '/about',
    template: 'about'
  })
})
```

Switch between our Home and About pages on browse

## Moving the posts subscription to the Home route

The iron:router has a special function called subscriptions() ,
which is ideal for load the right data for each page, subscription
in the routes instead of keeping it in the separate subscriptions.js file

To see it in action, add the subscriptions() function to our Home route:

```js
this.route('Home', {
  path: '/',
  template: 'home',
  subscriptions: function() {
    return Meteor.subscribe('lazyload-posts', Session.get('lazyloadLimit'))
  }
})
```

The Session.setDefault('lazyloadLimit', 2) line from the subscriptions.js file
needs to be placed at the start of the routes.js file and before the Router.configure() function:

```js
if (Meteor.isClient) {
  Session.setDefault('lazyloadLimit', 2)
}
```

Delete the my-meteor-blog/client/subscriptions.js file

Check the browser and refresh the page will see the home template still shows all the example posts.

## Setting up the post route

Create a file called post.html inside our my-meteor-blog/client/templates

```html
<template name="post">
  <h1>{{title}}</h1>
  <h2>{{description}}</h2>
  <small> Posted {{formatTime timeCreated "fromNow"}} by {{author}} </small>
  <div class="postContent">{{#markdown}} {{text}} {{/markdown}}</div>
</template>
```

## Creating a single-post publication

Add the following publication

```js
Meteor.publish('single-post', function(slug) {
  return Posts.find({ slug: slug })
})
```

## Adding the post route

Add the following template to my-meteor-blog/client/templates/layout.html

```html
<template name="loading">
  <div class="center"><h1>Loading</h1></div>
</template>
```

Loading template to Router.configure()

```js
Router.configure({
  layoutTemplate: 'layout',
  notFoundTemplate: 'notFound',
  loadingTemplate: 'loading'
})
```

and Router.map()

```js
this.route('Post', {
  path: '/posts/:slug',
  template: 'post',
  waitOn: function() {
    return Meteor.subscribe('single-post', this.params.slug)
  },
  data: function() {
    return Posts.findOne({ slug: this.params.slug })
  }
})
```

Open the my-meteor-blog/client/templates/postInList. html file and change the link as follows:

```html
<h2><a href="posts/{{slug}}">{{title}}</a></h2>
```

## Changing the website's title

Edit routes.js

```js
Router.configure({
  layoutTemplate: 'layout',
  notFoundTemplate: 'notFound',
  onAfterAction: function() {
    var data = Posts.findOne({ slug: this.params.slug })
    if (_.isObject(data) && !_.isArray(data))
      document.title = 'My Meteor Blog - ' + data.title
    else document.title = 'My Meteor Blog - ' + this.route.getName()
  }
})
```
