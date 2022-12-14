import 'dotenv/config';
import 'shelljs/make.js';

target.lint = () => {
  exec('eslint --color .');
};

target.style = () => {
  exec('prettier --write . !**/dist');
};
