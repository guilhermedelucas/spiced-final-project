# spiced-final-project
The final 6 weeks project will be an app which people can share their collectibles with their friends like games(disc), records (vynil, cd, dvd), movies, books, and comics. The main functionability will be the interaction between friends. They will be able to see their friend's list and borrow/exchange their collectibles. The app will track who borrowed your collectibles.
The project will be developed using React, Node.js and, as far as a database is concerned, it will be check the possibility of using postgres and/or Mongodb

## Features
* it's important to have a initial screen explaining the app with register / login page.
* The app will let users create lists of their collectibles. It's important all the items be categorized to be listed appropriately.
* The app will have a main page where you can see your friend's collectibles and also displaying yours.
* The user can register and login with their facebook account.
* If users connect with facebook, they will be redirected to the registration page in our app and complete the fields are empty (email if not provided by facebook, username and a password).
* If users want to register without facebook, we should ask for username, email and password.
* Only users who are logged in may use the webpage so there must be a mechanism for users to register and log in.
* Users may be able to see others people profile.
* People can make a wishlist, tracking their future acquisitions for asking for borrowing them.
* The app must have one search engine where the user can search specific items on the friends lists. Searching any input.
* The site must look good and it must look good on both desktops and phones. Think about responsive menus and displaying.
* When uploading a new item, all the items must have pictures. User can upload a picture (desktop or phone) or insert an URL picture. A placeholder will be set if user didn't provide one.

## Categories
* games
* albums (vynil / cd)
* movies
* comics
* books

     ex: Games/Playstation 3/Red Dead Redemption
         Albums/Vynil/Beatles/White Album

     Each category will have specific properties, like release date, purchase date, price.
     Each item will have the option to borrow, displaying a button on top, green if available and red if not.


More info....
