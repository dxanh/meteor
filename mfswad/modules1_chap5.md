# Making Our App Versatile with Routing
## Adding the iron:router package
Go to our my-meteor-blog 

    meteor add iron:router
    
Start Meteor again by running the $ meteor command and will  see Error: iron:router
No route definitions found.

## Setting up the router

Create a file called routes.js directly in the root of my-meteor-blog folder 

```js
Router.configure({
       layoutTemplate: 'layout'
            });
            
Router.map(function() {
           this.route('Home', {
               path: '/',
               template: 'home'
           });
});

```
To prevent the double appearance of the layout, remove the {{> layout}} helper 
from the <body> tag inside index.html file
