import 'dotenv/config';
import 'shelljs/make.js';

target.start = () => {
  env['NODE_ENV'] = 'production';
  exec('node dist/main.js');
};

target.build = () => {
  env['NODE_ENV'] = 'production';
  rm('-fr', 'dist/*');
  exec('tsc --pretty');
  ls('src/schemas/**/*.graphql').forEach((file) => {
    cp('-f', file, file.replace('src', 'dist'));
  });
};

target.watch = () => {
  env['NODE_ENV'] = 'development';
  exec('nodemon --config .nodemonrc.json');
};
