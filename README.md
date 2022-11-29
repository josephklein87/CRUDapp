# CRUDapp
# THE UNWATCHABLES
## A BAD MOVIE DATABASE by JOE KLEIN

Link to project: https://desolate-inlet-57881.herokuapp.com/

In this project, my goal was to make a fully functional RESTful database of bad movies, where users could create accounts, post the movies they think are bad, and other users could agree, disagree and comment on their posts. In addition, users should be able to edit or delete their posts, and only their own posts.

## FEATURES

### 1) RESTFul database with all routes. 

Users are able to post, edit, delete, view an index of all posts, and view individual post information. This was accomplished using Mongo DB atlas, Mongoose, and Express. We have a movie database with a variety of information which is displayed in format by multiple EJS pages.

### 2) User Creation, Session Creation and Login functionality. 

This was accomplished using express-session, bcrypt, dotenv, and Mongoose. Users can create accounts, and are unable to post, edit or delete unless they are logged in. In addition, only the user who created the post can edit or delete it. This is accomplished by saving the account username into a key-value pair contained in the schema. On the EJS page we check that the current user's username matches the username that was saved into the database when posted with an if statement. If it does not match, the edit and delete buttons do not appear. We get the username of the poster when they post a movie by automatically populating the form value with their username using req.session.currentUser, and making that section of the form uneditable.


### 3) User Creation Password Parameters and Username Tracking. 

When the user creates an account, the form dynamically tracks certain parameters every key input. The user is notified of their accounts eligibility for creation by both error messages that appear beneath the form AND visual icons as they type in the information. The user's password must be 8 characters in length, and contain at least one digit and one letter. In addition, when creating a password they must confirm it in a second input field which is checked against the first to make sure both fields match. Both of these ar accomplished using if/then statements. Finally, using an AJAX request of the list of usernames, we check whether their username is already taken. A red X in the usename field signifies that your current typed username is already in the database, while a green check means it's available.

All three of these functions are also connected to three globally scoped variables. These variables (key1, key2, key3) operate as a locking mechanism. All three must be set to true to enable the create account button, each of which will be when the correspondending form field matches the set parameters. If the form field no longer matches the parameters, it will set its key back to false, preventing the user from creating an account. 

User can also toggle to view/hide their typed password with a clickable icon that changes the class of the password field from "password" to "text" and back again. 



For the two fields matching, used this stackoverflow post as a starting point and then customized it to my own specifications:
https://stackoverflow.com/questions/9142527/can-you-require-two-form-fields-to-match-with-html5

### 4) User Comment and User Voting. 

Users can comment and vote on posts they agree or disagree with. Comments are pushed into the database entry for the movie using $push in Mongoose, as well as the username of the poster. Again we get the username of the poster by automatically populating the form value with their username using req.session.currentUser, and making that section of the form uneditable. Posting a comment refreshes the show page, populating all comments on the bottom in the order which they are posted.

User Voting is accomplished by two buttons, set to Agree or Disagree. Pushing a button will increase the value of either the Agree or Disagree key saved into the schema of the movie. It will also $push the ID number of whatever database entry they are currently viewing into either an upvote or downvote key in their own account's entry in the user database, and $pull the ID from the opposite key if it should exist. Using Javascript, we check on page load with an AJAX request of the current user's database entry. If it contains the ID of the show page they are currently viewing in either the upvote or downvote category, the corresponding button will be disabled. If they want to switch their vote, it will read the same information, and based on that will know whether they had previously upvoted or downvoted and increase or decrease the value in the movies collection entry accordingly. 

Then using JQUERY and another nested AJAX request, it will update the HTML of the buttons to record the total number of upvotes or downvotes for the movie.

### 5) Searchability

The user can search the database using a search form on the main page. This will open a new Search ResultsEJS that displays the results. Using REGEX the user can search for any term and it will case insensitve and return partial matches. This search bar will search all key-value pairs using the $or functionality in the corresponding route, so if you search for "comedy" anything containing the word comedy will come up (excluding the review section), either it is the genre, tag, title, etc. 

In addition to this, when users view a movie's show page, they can click on the username, tag, genre, actor or director section entries and be taken to a search results page that displays all movies that have the same entry, allowing for a more specific search by those parameters. This was accomplished using routes with URL parameters. 

## PROBLEMS/SOLUTIONS

### 1) Multiple AJAX requests crashing site

In the user upvote/downvote system, originally I had it so the user could switch back and forth between upvote and downvote at will and it would update dynamically. However this would crash the site as I believe there were too many AJAX requests happening. 

I then set it to disable both buttons after the vote but re-enable the correct button on page reload, so they can still change their vote if they wish, they just can't do it more than once per page load. 

### 2) Passing variables from Mongoose to Javascript

I had issues accessing information from our Mongo DB in certain sections where I needed to access specific information that was being shown on the page. For some things I used an AJAX request to get the information, like when I needed the list of all usernames to check for username validation. But if I wanted to access information like the movie ID of the current show-page in the Javascript, I created an div in the EJS that I set to display:none so it would be invisible. In this div I referenced whatever variable I was passing in from the route and then used javascript to take the value of the div and save it as a string inside a variable in the javascript. I then passed that variable into whatever functions I needed it for. 