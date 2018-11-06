
# 2. Building HTML Templates
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
               <li>
                 <a href="/">Home</a>
</li> <li>
                 <a href="/about">About</a>
               </li>
</ul> </div>
</header>
         <div class="container">
           <main>
           </main>
         </div>
</template>
```
Create a file named home.html in same folder
```html
<template name="home">
       {{#markdown}}
       ## Welcome to my Blog
       Here I'm talking about my latest discoveries from the world of
       JavaScript.
       {{/markdown}}
</template>
```
Creat about.html

```html
<template name="about">
       {{#markdown}}
       ## About me
       Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
       eiusmod
       tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
       minim veniam,
       quis nostrud **exercitation ullamco** laboris nisi ut aliquip ex
       ea commodo
       consequat.
       Link to my facebook: [facebook.com][1]
       [1]: http://facebook.com
       {{/markdown}}
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

<body>{{> layout}}</body>
```
Edit layout.html
```html
<template name="layout">
    <header>
        <div class="container">
            <h1>My Meteor Single Page App</h1>
            <ul>
                <li>
                    <a href="/">Home</a>
                </li>
                <li>
                    <a href="/about">About</a>
                </li>
            </ul>
        </div>
    </header>

    <div class="container">
        <main>
            {{> home}}
        </main>
    </div>
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
Template.home.helpers({
         // other helpers ...
         dataContextHelper: function(){
           return {
             someText: 'This text was set using a helper of the parent
       template.',
             someNested: {
               text: 'That comes from "someNested.text"'
             }
            }; }
});
```

