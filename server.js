import express from 'express';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpack from 'webpack';
import webpackConfig from './webpack.config.js';

import { MongooseConnection } from './app/config.js';
import { Habit } from './app/models/habits.js';

export const app = express();
 
const compiler = webpack(webpackConfig);
 
app.use(express.static(__dirname + '/www'));
 
app.use(webpackDevMiddleware(compiler, {
  hot: true,
  filename: 'bundle.js',
  publicPath: '/',
  stats: {
    colors: true,
  },
  historyApiFallback: true,
}));

app.get('/test', function (req, res) {
  res.send('Hello World!');
});

app.get('/habits', function(req, res) {
  Habit.find(function(err, habits) {
    if(err) {
      console.log(err);
      res.send(err);
    } else {
      console.log(habits);
      res.send(habits);
    }
  });
});

MongooseConnection();
 
// const server = app.listen(3001, function() {
//   const host = server.address().address;
//   const port = server.address().port;
//   console.log('Example app listening at http://%s:%s', host, port);
// });