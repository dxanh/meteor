# 1. Getting Started with Meteor
## Installing Meteor

    curl https://install.meteor.com/ | sh
## Create fisrt app

    meteor create my-meteor-blog
    
    cd my-meteor-bloh
    meteor
## Creating a good folder structure
- my-meteor-blog
  - server
  - client
    - styles
    - templates
## Adding a core package

    meteor add less
 
## Adding a third-party package
  
    meteor add jeeeyul:moment-with-langs

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
