import express from 'express';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpack from 'webpack';
import webpackConfig from './webpack.config.js';
import bodyParser from 'body-parser';

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

app.use(bodyParser.json());

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

app.put('/updateHabit', function(req, res) {
  Habit.findById(req.body._id, function(err, habit) {
    if(err) {
      res.status(500).send(err);
    } else {
      habit.name = req.body.name || habit.name;
      habit.description = req.body.description || habit.description;
      habit.count = req.body.count || habit.count;
      habit.status = req.body.status || habit.status;

      // Save the updated document back to the database
      habit.save(function (err, habit) {
          if (err) {
              res.status(500).send(err)
          }
          res.send(habit);
      });
    }
  })
})

MongooseConnection();
 
// const server = app.listen(3001, function() {
//   const host = server.address().address;
//   const port = server.address().port;
//   console.log('Example app listening at http://%s:%s', host, port);
// });