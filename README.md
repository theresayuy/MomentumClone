# Momentum Clone
Clone of the popular browser new tab page extension, [Momentum](https://chrome.google.com/webstore/detail/momentum/laookkfknpbbblfpciffpaejjkokdgca?hl=en) by [momentumdash.com](https://momentumdash.com/). 

## Features
- Random quote and background image generated once a day
- Search Google
- Local weather info
- Digital Clock
- Type your most important task on the center of the screen (also crossout, edit and delete it)
- Add, edit, delete, and crossout tasks from a todo list
- Create, edit, and delete bookmarks of any website

## Technologies Used
- React for frontend
- Express for backend
- MySQL as a database for bookmarks and tasks
- https://type.fit/api/quotes for giant array of quotes
- [Lorum Picsum](https://picsum.photos/) for background images
- [OpenWeatherMap API](https://openweathermap.org/api) for weather info
- Google Shared Stuff (S2) service to generate favicon of websites using its URL

## Installation Guide
 Install and setup the following on your computer:
- node
- git 
- MySQL (here are guides for [Linux](https://www.geeksforgeeks.org/how-to-install-mysql-on-linux/), [MacOS](https://www.geeksforgeeks.org/how-to-install-mysql-on-macos/), and [Windows](https://www.geeksforgeeks.org/how-to-install-mysql-in-windows/))

Open a terminal window and run Create React App:
```
npx create-react-app momentumclone
```

```
cd momentumclone
```

Delete the all the files except for the `node_modules` folder from the root of the project folder. Clone the repo by running the following:
```
git clone https://github.com/theresayuy/MomentumClone.git
```

Run the following to install the dependencies in the root of the project folder
```
npm install
```

Create  an `.env` file in the root of the project folder. Insert the following into it:
```
PORT=3000
DB_USER=
DB_PASSWORD=
DB=momentumclonedb
DB_TASKS_TABLE=tasks
DB_BM_TABLE=bookmarks
REACT_APP_TABLE_URL_TASKS=http://localhost:3000/tasks
REACT_APP_TABLE_URL_BM=http://localhost:3000/bookmarks
REACT_APP_API_KEY_OWM=
```
Set the values of `DB_USER` and `DB_PASSWORD` to the values you used to setup MySQL. Set the value of `REACT_APP_API_KEY_OWM` to the OpenWeatherMap API key that you generated from your account.

Open `db.js` file located in the root of the project folder and comment out line 8 and uncomment lines 11-29.

Run the following to create the database and the two tables:
```
node db.js
```

Uncomment line 8 and comment back lines 11-29 of `db.js`.

## Usage Guide
Run this to start the backend
```
node server.js
```

Run this to start the frontend
```
npm start
```

---


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
