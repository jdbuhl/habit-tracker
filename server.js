import express from 'express';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpack from 'webpack';
import webpackConfig from './webpack.config.js';
import { resolve } from 'path';
import bodyParser from 'body-parser';

import { MongooseConnection } from './app/config.js';
import { Habit } from './app/models/habits.js';

export const app = express();
const compiler = webpack(webpackConfig);

const apiRouter = express.Router();
 
app.use(webpackDevMiddleware(compiler, {
  hot: true,
  filename: 'bundle.js',
  publicPath: '/',
  stats: {
    colors: true,
  },
  historyApiFallback: true,
}));

app.use(express.static(__dirname + '/www'));

app.use(bodyParser.json());

app.use('/api', apiRouter);

app.get('/*', (req, res) => {
  res.sendFile(resolve('./www', 'index.html'));
});

apiRouter.route('/test')
  .get((req, res) => {
    res.send('hello')
})

apiRouter.route('/habits')
.get((req, res) => {
  Habit.find({})
  .sort('-createdAt')
  .exec((err, habits) => {
    if(err) {
      console.log(err);
      res.send(err);
    } else {
      res.send(habits);
    }
  });
})

apiRouter.route('/updateHabit')
.put((req, res) => {
  Habit.findById(req.body._id, function(err, habit) {
    if(err) {
      res.status(500).send(err);
    } else {
      habit.name = req.body.name || habit.name;
      habit.description = req.body.description || habit.description;
      habit.count = req.body.count || habit.count;
      habit.status = req.body.status || habit.status;
      habit.lastCompletedOn = req.body.lastCompletedOn || habit.lastCompletedOn;
      habit.goal = req.body.goal || habit.goal;

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

apiRouter.route('/habit')
.post((req, res) => {
  let habit = new Habit(req.body);
  habit.save(function(err, habit) {
    if(err) {
      res.send(err);
    } else {
      res.send(habit);
    }
  })
})

apiRouter.route('/remove')
.post((req, res) => {
  Habit.remove({_id: req.body._id}, function(err) {
    if(err) {
      res.send(err);
    } else {
      res.send('done');
    }
  });
})

MongooseConnection();