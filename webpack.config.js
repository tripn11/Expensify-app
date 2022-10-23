const path = require('path'); //an object for creating a path
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

process.env.NODE_ENV = process.env.NODE_ENV || 'development'; //the environment(production/development) = the environment that its running in but by default it should be development

if (process.env.NODE_ENV === 'test') {
  require('dotenv').config({ path: '.env.test' }); //dotenv gets the environment variables from the path and loads it into process.env
} else if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({ path: '.env.development' });
}

module.exports = (env) => { //the function's first arguement is the current environment being built
  const isProduction = env === 'production';
  const CSSExtract = new ExtractTextPlugin('styles.css'); //extracts all css into a seperate file styles.css instead of packing everything in bundle.js

  return { 
    entry: ['babel-polyfill','./src/app.js'], //babel polyfill corrects all browser variation issues with the js, then the normal entry point for webpack for compiling.
    output: {
      path: path.join(__dirname, 'public', 'dist'), //root/public/dist, thats where the bundle.js lives and in line with the index.html file
      filename: 'bundle.js'
    },
    module: {
      rules: [{
        loader: 'babel-loader', //loads files for conversion from es6 and react to regular es5
        test: /\.js$/, //all files ending in .js
        exclude: /node_modules/ //except files in node_modules folder
      }, {
        test: /\.s?css$/, //all files ending in .scss or .css
        use: CSSExtract.extract({ //extract every file inside into the styles.css file
          use: [
            {
              loader: 'css-loader', //compiles all css files into a string of css
              options: {
                sourceMap: true //allows the usage of original lines in devtools
              }
            },
            {
              loader: 'sass-loader', //compiles all scss files into a string of scss
              options: {
                sourceMap: true
              }
            }
          ]
        })
      }]
    },
    plugins: [
      CSSExtract,
      new webpack.DefinePlugin({//DefinePlugin is used for defining variables(like variables whose value depend on the environment)
        'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY), //these are variables for the configuration of firebase depending on weather we are testing or in actual production environment
        'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
        'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
        'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
        'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
        'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID)
      })
    ],
    devtool: isProduction ? 'source-map' : 'inline-source-map', //different sourcemaps to use in case of the environment for finding the exact line of code an error exists
    devServer: {
      contentBase: path.join(__dirname, 'public'), //folder or files to pass to the server to serve. As if you are using the normal html,css,js combo
      historyApiFallback: true, //for navigtion or changing the url, when reloading, it remembers the exact path we are on, instead of going back to index.html and outputting an error
      publicPath: '/dist/' //the relative path from public for webpack to run all webpack generated codes from
    }
  };
};

//i haven't seen the actual importance of devServer.publicPath, the app still runs after removing it.
