# Controlling the Data Flow

## Removing the autopublish package
    meteor remove autopublish 

## Publishing data
Create a file called publications.js inside the my-meteor-blog/ server folder

```js
  Meteor.publish('all-posts', function () {
     return Posts.find();
});
```

Create a file called subscriptions.js inside the my-meteor-blog/client folder

```js
Meteor.subscribe('all-posts');
```
View change on http://localhost:3000/

## Publishing only parts of data

Create a new publication called limited-posts in publications

```js
 Meteor.publish('limited-posts', function () {
     return Posts.find({}, {
        limit: 2,
        sort: {timeCreated: -1}
     });
});

```
Change the subscription in subscriptions.js
```js
Meteor.subscribe('limited-posts');

```
See change of post

## Publishing specific fields

Add another publication to publications.js

```js
 Meteor.publish('specificfields-posts', function () {
     return Posts.find({}, {
       fields: {
         title: 1
} });
});
```
Change the subscription in our subscriptions.js

```js
Meteor.subscribe('specificfields-posts');
```
## Lazy loading posts

Add thebutton at the end of home.html template, right below the {{#each postsList}} block helper:
```html
<button class="lazyload">Load more</button>
```
Edit publications.js
```js
Meteor.publish('lazyload-posts', function (limit) {
         return Posts.find({}, {
           limit: limit,
           fields: {
text: 0 },
           sort: {timeCreated: -1}
         });
});
```
Edit subscription.js file
```js
       Session.setDefault('lazyloadLimit', 2);
       Tracker.autorun(function(){
       Meteor.subscribe('lazyload-posts', Session.get('lazyloadLimit'));
       });
 ```
 Add the following lines of code to home.js
 
 ```js
 Template.home.events({
         'click button.lazyload': function(e, template){
         var currentLimit = Session.get('lazyloadLimit');
         Session.set('lazyloadLimit', currentLimit + 2);
} });
 ```

