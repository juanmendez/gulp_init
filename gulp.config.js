module.exports = function(){

    var client = './src/client/';
    var clientApp = client + "app/";
    var server = "./src/server/"
    var temp = './.tmp/';

    var config = {


      less: [ client + 'styles/**/*.less'],
      sass: [ client + 'sass/**/*.scss'],
      css: client + 'css/',


      index: client + "index.html",
      alljs:[ './src/**/*.js', './*.js' ],
      js:[ clientApp + "**/*.js", clientApp + "**./*.js" ],
      client: client,
      server: server,
      temp: temp,

      /**bower npm locations**/
      bower:{
          json: require( './bower.json'),
          directory: './bower_components',
          ignorePath: '../..'
      },

        /**
         * nodesettings
         */
        defaultPort: 7203,
        nodeServer: "./src/server/app.js"
    };

    config.getWiredepDefaultOptions = function(){
        var options = {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath,
            devDependencies: true
        }
    
        return options;
    };

   return config;
};
