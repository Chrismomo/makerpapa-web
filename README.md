# makerpapa


--- codeship and heroku:

THis project includes api and front end.

This is a sample project of angular fulstack.

put --skip-ci into commit to skip codeship

After yo generating this project can work locally. (of couse you need run a mongodb locally at the same time, as this project needs a mongodb.)

But you will have issues to host it on heroku.

Solution

change the gruntfilejs, add:

grunt.registerTask('heroku', 'build');

add Procfile and add:

web: node dist/server/app.js

change package.json file. (the easiest way is copy all dev dependencies into prod section)

of cause you need setup a mongodb on heroku and set heroku env for it.

To run it locally, you just need run:

grunt serve

but please be aware that, heroku use:

node dist/server/app.js

Heroku env:

BUILDPACK_URL = https://github.com/jakeorr/heroku-buildpack-nodejs-grunt-compass-bower-configurable.git MONGOLAB_URI = mongodb://xxx:xxx@xxxx.mongolab.com:xxx/xxxx NODE_ENV = production



#Note: .env file is not work in the project, it is a keystonejs file. I tried but does not work, os it is useless now.

To change env of your local develop envorinment, you should use : /server/config/environment/development.js





---baidu:

To make an angluar project delopliable on baidu yun you should:

1, copy the app.conf file into your project root folder.

2, put below code into your package.json, for nodejs lunching in baidu yun:

  "scripts": {

    "start": "node server/app.js",

3, chang node port!

4, change db link

5, chang .gitingnore file to remove bower packages , bae doesn't manage it for you, so you need upload it.

6, because bae will close mongodb connect after each request, so we need change settings:

    in server/config/environment/index.js

      mongo: {
	    options: {
	      db: {
	        safe: true,
	        native_parser: true
	      },
	      server: { poolSize: 5 }
	    }
	  },


	in server/app.js , add close listener and open the connection again:

	 mongoose.connection.on('close', function() {
		mongoose.connect(config.mongo.uri, config.mongo.options);
	 });



This is not only a api project but also the front-end

This application is customized for bae.

1. The app.js has a part of special monogo connecting code. (add listener and reconnect when it is closed)
2. The app.js was also changed for the default setting of evn = "product" the port number was changed but it is useless.
3. server/config/environment/index.js was changed for BAE's port 18080 
4. server/config/environment/index.js was also changed for database url.
5. change the package.json file to point start command to dist folder.
6. the dist folder should be removed from .ginore file. because bae does not compile it for us. But it will run npm install so the node_module folder does not need to upload.
7. compile this project first to update dist before push to BAE.



To test this project locally, you need change the first line of server/app.js:

process.env.NODE_ENV = process.env.NODE_ENV || 'development';      --  this is local
process.env.NODE_ENV = process.env.NODE_ENV || 'production';       -- this production, 

