module.exports = function(){

 var client = './src/client';

  var config = {
      alljs:['./src/**/*.js'],
      temp: './.tmp',
      less: [ client + '/styles/**/*.less'],
      sass: [ client + '/sass/**/*.scss'],
      css: client + '/css'
  };

   return config;
};
