# BarBot UI
*Author: Eric Udlis*

This is the UI for my Automatic Bartending Robot project. 

It's backend is an Express webserver running diskdb (NoSQL version of SQLite) to have non-volatile file storage. The backend also includes a Python Flask webserver to drive WS2812 Neopixels.

It's frontend is a React app development server being shown using an Electron window.

This has libraries meant to interface with a Raspberry Pi and will not run unless RPI gpio is present.

Global packages `Foreman` and `nodemon` are expected as well as `Python3` and `pip3`.


## Starting the BarBot UI

To start the process cd into the directory and run `npm start`

This project uses Foreman to spin up all 4 processes at once. I suggest setting up a way to run this command on startup. I use `PM2` to start this service on boot.

## Remote Development

To develop on your own machine on the network. Simply clone the repository to your computer to edit. Run the project on the Raspberry Pi so that React and Express are listening for file changes. When ready to push changes run `make rem`

## Future Plans
- Some sort of transaction per drink (venmo, cashapp, paypal)
- A remote queueing system to make drinks remotely
- Ejecting the website so that I don't have to wait for the developement server to load everytime. (Using the development server is just quicker for developing)


## React 
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

#### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

#### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

#### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

#### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

#### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

#### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

#### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

#### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
