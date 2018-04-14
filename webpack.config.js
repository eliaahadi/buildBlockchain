// var path = require('path');
// var webpack = require('webpack');
// const OpenBrowserPlugin = require('open-browser-webpack-plugin');

const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const path = require('path');

module.exports = {
	entry: `${path.resolve(__dirname, 'src')}/index.js`,
	module: {
		loaders: [
			{
				loaders: ['style-loader', 'css-loader'],
				test: /\.(css|png)$/,
			},
			{
				exclude: /node_modules/,
				include: path.join(__dirname, 'src'),
				loader: 'babel-loader',
				query: {
					presets: ['react', 'es2015'],
				},
				test: /\.jsx?$/,
			},
		],
	},
	devtool: 'source-map',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'public'),
		publicPath: '/public',
	},
	plugins: [
		new OpenBrowserPlugin({ url: 'http://localhost:4000' }),

	],
	resolve: {
		extensions: ['.webpack.js', '.js', '.jsx'],
	},
	devServer: {
		contentBase: path.join(__dirname, 'public'),
		compress: true,
		port: 4000,
		proxy: {
			'/api': 'http://localhost:4001',
		},
	},
};

/*
module.exports = {
  entry: './index.js',
  output: { path: path.resolve(__dirname, 'public'), filename: 'bundle.js' },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['react', 'es2015'],
          plugins: ['transform-class-properties']
        }
      },
      {
        test: /.css?$/,
        loader: ['style-loader', 'css-loader'],
        exclude: /node_modules/
      }
    ]
  },
  devtool: 'source-map',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/public',
  },
  plugins: [
    new OpenBrowserPlugin({ url: 'http://localhost:4000' }),

  ],
  resolve: {
    extensions: ['.webpack.js', '.js', '.jsx'],
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    port: 4000,
    proxy: {
      '/api': 'http://localhost:4001',
    },
  },
};




module.exports = {
  entry: `${path.resolve(__dirname, 'src')}/index.js`,
  module: {
    loaders: [
      {
        loaders: ['style-loader', 'css-loader'],
        test: /\.(css|png)$/,
      },
      {
        exclude: /node_modules/,
        include: path.join(__dirname, 'src'),
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'],
        },
        test: /\.jsx?$/,
      },
    ],
  },
  devtool: 'source-map',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/public',
  },
  plugins: [
    new OpenBrowserPlugin({ url: 'http://localhost:4000' }),

  ],
  resolve: {
    extensions: ['.webpack.js', '.js', '.jsx'],
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    port: 4000,
    proxy: {
      '/api': 'http://localhost:4001',
    },
  },
};



module.exports = {
  entry: `${path.resolve(__dirname, 'src')}/index.js`,
  module: {
    loaders: [
      {
        loaders: ['style-loader', 'css-loader'],
        test: /\.(css|png)$/,
      },
      {
        exclude: /node_modules/,
        include: path.join(__dirname, 'src'),
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'],
        },
        test: /\.jsx?$/,
      },
    ],
  },
  devtool: 'source-map',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/public',
  },
  plugins: [
    new OpenBrowserPlugin({ url: 'http://localhost:4000' }),

  ],
  resolve: {
    extensions: ['.webpack.js', '.js', '.jsx'],
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    port: 4000,
    proxy: {
      '/api': 'http://localhost:4001',
    },
  },
};
*/