# React Go Cats

## Exercise: CatLover
Create a React application with a Go backend for cat lovers. The first view displays a list of 10 random cat images and a button to load more. Clicking on any of those images opens a modal view with the image and the information about the cat’s breed if available. This would be a link to the second view below - the breed detail. The modal should also contain a form to mark the image as your favourite (a part of the third view as well). Make sure you can copy-paste the url of the modal and send it to your friends - they should see the same image as you can see.

The second view displays a list of cat breeds. Each breed opens a modal again with a description of that breed and a few photos of cats that belong to that breed.

The third view allows you do the following things:

Display your favourite cats
Remove an image from your favourites (use any UX option you like)

We give you a lot of freedom in technologies and ways of doing things. We only insist on you using React and Go. Note that we have omitted a lot of details in this description which we hope you will fill in and thus prove to us that you are aware of industry best practices and that you also follow them. Get creative as much as you want, we WILL appreciate it. You will not be evaluated based on how well you follow these instructions, but based on how sensible your solution will be. In case you are not able to implement something you would normally implement for time reasons, make it clear with a comment.

Also bear in mind that we don’t actually require you to have correct cat breed names or even have the cat photos assigned to the correct breed. 

Submission
Just a make a PR to the current repo! Good luck, potential colleague!

___

## Solution summary

Based on the above exercise on Cat lovers app, a Go REST API and a ReactJS apps have been built under the `src` folder. The whole app and infrastructure can be run using the [docker-compose.yml](src/docker-compose.yml). There an initialization [script](src/backend/scripts/db.sql) that is executed only once, to create some sample data. By default React App runs in DEMO mode in order to avoid user registration / login. The following screenshot shows the ReactJS app home page.

![](img/front-end-home-page.png)

___

## Leftovers / Known missing improvements
1. User registration UI pages (only backend implementation was implemented)
2. Another React context whould be implemented to handle users authentication
3. Richer error handling mostly on the ReactJS app
4. CI/CD pipeline
5. Code coverage is quite low, while I tried to create a few unit tests per component type, for demonstration purposes
6. A better security implementation for user password (e.g. bcrypt, PBKDF2)