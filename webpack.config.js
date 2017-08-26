const path = require('path');

module.exports = {
 context: path.join(__dirname, 'src'),
 entry: [
   './main.js',
 ],
 output: {
   path: path.join(__dirname, 'www'),
   filename: 'bundle.js',
 },
 module: {
   rules: [
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
      },
     {
       test: /\.js$/,
       exclude: /node_modules/,
       use: [
         'babel-loader',
       ],
     }
   ],
 },
 resolve: {
   modules: [
     path.join(__dirname, 'node_modules'),
   ],
 },
};