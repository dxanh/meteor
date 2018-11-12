# Building HTML Templates

## Writing templates in Meteor

Create an index.html file in my-meteor-blog/client

```html
<head>
  <title>My Meteor Blog</title>
</head>
<body>
  Hello World
</body>
```

Run app

     cd my-meteor-blog
     meteor

Navigate to http://localhost:3000 and see app

Creating a file called layout.html in the my-meteor-blog/client/templates folder

```html
<template name="layout">
  <header>
    <div class="container">
      <h1>My Meteor Single Page App</h1>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
      </ul>
    </div>
  </header>
  <div class="container"><main></main></div>
</template>
```

Create a file named home.html in same folder

```html
<template name="home">
  {{#markdown}} ## Welcome to my Blog Here I'm talking about my latest
  discoveries from the world of JavaScript. {{/markdown}}
</template>
```

Creat about.html template

```html
<template name="about">
  {{#markdown}} ## About me Lorem ipsum dolor sit amet, consectetur adipisicing
  elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
  enim ad minim veniam, quis nostrud **exercitation ullamco** laboris nisi ut
  aliquip ex ea commodo consequat. Link to my facebook: [facebook.com][1] [1]:
  http://facebook.com {{/markdown}}
</template>
```

Add markdown

    meteor add markdown

## Adding templates and partials

Edit index.html

```html
<head>
  <title>My Meteor Blog</title>
</head>

<body>
  {{> layout}}
</body>
```

Edit layout.html

```html
<template name="layout">
  <header>
    <div class="container">
      <h1>My Meteor Single Page App</h1>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
      </ul>
    </div>
  </header>

  <div class="container"><main>{{> home}}</main></div>
</template>
```

## Displaying data with template helpers

Create a file called home.js and save it to my-meteor-blog/client/templates/ folder

```js
Template.home.created = function(){
         console.log('Created the home template');
  };
Template.home.rendered = function(){
  console.log('Rendered the home template');
};
Template.home.destroyed = function(){
  console.log('Destroyed the home template');
};

Template.home.helpers({
     exampleHelper: function(){
       return 'This text came from a helper with some <strong>HTML</
   strong>.';
} });
```

Add the {{exampleHelper}} helper after the {{markdown}} in home.html

## Setting the data context for a template

Create a file called examples.html in my- meteor-blog/client/templates folder

```html
<template name="contextExample">
  <p>{{someText}}</p>
</template>
```

Add the helper to home.html templates helpers

```html
Template.home.helpers({ // other helpers ... dataContextHelper: function(){
return { someText: 'This text was set using a helper of the parent template.',
someNested: { text: 'That comes from "someNested.text"' } }; } });
```

## Adding events

To make template a bit more dynamic, we will add a simple event,
which will reactively rerun the logContext helper we created earlier.

Add a button to contextExample template:

```js
<button>Get some random number</button>
```

To catch the click even, add the following event function to examples.js

```html
Template.contextExample.events({ 'click button': function(e, template){
Session.set('randomNumber', Math.random(0,99)); } });
```

To see this in action, we will add a Session.get() call
to the logContext helper, and return the former set's random number as follows:

```html
Template.contextExample.helpers({ logContext: function(){ console.log('Context
Log Helper',this); return Session.get('randomNumber'); } });
```

Go to the browser http://localhost:3000/, we will see the Get some random number button.
When we click on it, we see a random number appearing just above the button.

## Listing posts

Create a file called postInList.html in my-meteor-blog/client/ templates folder
and save it with the following code

```html
<template name="postInList">
  <div class="postListItem">
    <h2><a href="#">{{title}}</a></h2>
    <p>{{description}}</p>
    <div class="footer">Posted by {{author}}</div>
  </div>
</template>
```

Add a {{#each}} helper to the home template, as follows:

```html
{#each postsList}} {{> postInList}} {{/each}}
```

Ad the postsList helper in our home.js file to the template helpers

```html
Template.home.helpers({ // other helpers ... postsList: function(){ return [ {
title: 'My Second entry', description: 'Borem sodum color sit amet, consetetur
sadipscing elitr.', author: 'Fabian Vogelsteller', timeCreated:
moment().subtract(3, 'days').unix() }, { title: 'My First entry', description:
'Lorem ipsum dolor sit amet, consetetur sadipscing elitr.', author: 'Fabian
Vogelsteller', timeCreated: moment().subtract(7, 'days').unix() } ]; } });
```

To display timeCreated from our post item in the correct format,
we need to create a helper function to format the timestamp.
Create a file named template-helpers.js as global helper and save
it to our my-meteor-blog/client folder.

```html
Template.registerHelper('formatTime', function(time, type){ switch(type){ case
'fromNow': return moment.unix(time).fromNow(); case 'iso': return
moment.unix(time).toISOString(); default: return
moment.unix(time).format('LLLL'); } });
```

Add the helper to postInList template by replacing the content of the footer with the following code:

```html
<div class="footer">
  <time datetime="{{formatTime timeCreated "iso"}}">Posted
  {{formatTime timeCreated "fromNow"}} by {{author}}</time>
</div>
```
