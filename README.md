# The Social Conejito

The Social Conejito is a social network composed in short messages named 'Squeals or Screams' 
for user expression who everyone can see, like and comment. If you want to like or comment 
you need to sign up, once authenticated you can view or edit 
your personal information.

The user recieve notifications when another user liked or commented his 'Scream or Squeal'.

### The app is formed in three pages: Home Page, Scream Page, and User Page

* The Home Page:

Can be visited by anyone and it is filled with recent Squeals or Screams of app's users.
This page change according to user's authentication.

When user is not authenticated:

The navigation bar has three buttons: Home, Login and Signup. On click one of these will
redirect the user to the corresponding page. Next to the list of Screams there is a small
box with Login and Signup buttons with same navigation bar's functionality.

The Signup page provides a form in which the user can create a new account, if the signup
is succesful the app will authenticate the user automatically and gives default data.

The Login page permit a user who already have an account to authenticate, if the login is
succesful the app will autheticate with his personal and customized data previously edited
and saved.

When user is authenticated:

The navigation Bar is formed in three buttons: The Post Scream button marked with a '+' symbol,
the Home button and the Notifications button marked with a bell.

The user can see his profile card with his personal information and profile
picture next to the list of Screams. In the profile card there are buttons with tooltips which allow 
the user to edit his personal information, change his profile picture and logout.

* The User Page:

Can be visited by any user but only authenticated users and can edit their corresponding page information.
Here, the user's Screams and personal information are shown. The buttons to edit user's information 
are only present if it is the owner user.

* The Scream Page:

This can be reached through 'see more' button present on each Scream Card. It is a small 
window with all related scream info.
Can be visited by anyone but only authenticated users can post a comment and like on the scream.
