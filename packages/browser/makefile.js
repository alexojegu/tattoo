import 'dotenv/config';
import 'shelljs/make.js';

target.start = () => {
  env['NODE_ENV'] = 'production';
  exec('serve --listen 8080 --single dist');
};

target.build = () => {
  env['NODE_ENV'] = 'production';
  rm('-fr', 'dist/*');
  exec('webpack --bail --color');
  cp('-r', 'public/robots.txt', 'dist');
};

target.watch = () => {
  env['NODE_ENV'] = 'development';
  exec('webpack serve --color --stats minimal');
};
