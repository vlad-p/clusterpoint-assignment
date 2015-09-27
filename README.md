### Setup instructions

You must have [Node.js](https://nodejs.org/) installed to build and run this project. You also have to install [grunt-cli](https://www.npmjs.com/package/grunt-cli) and [Bower](https://www.npmjs.com/package/bower).

Setup steps:

1. Clone repository
2. In project root directory run: `npm install`
3. In project root directory run: `bower install`
4. In project root directory run: `grunt` (this will build the development code, start the development server (Express) and open the project in a new browser window)

#### Grunt tasks
This project has several Grunt tasks registered:

1. `grunt` - builds and runs development code on development server (Express)
2. `grunt prod` - builds and runs production code (concatenated and uglyfied) on production server (Express)
3. `grunt build` - builds production code (concatenated and uglyfied) but does not run it

#### Grunt options

By default this application uses remote PHP back-end for API calls. If you have a properly configured local server and wish to make API calls to that server specify Grunt option `--server=local` e.g. `grunt --server=local`. Also, you should add your local API endpoint URLs to the file `ConfigLocal.ts`.