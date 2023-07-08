import 'dotenv/config';
import 'shelljs/make.js';

target.lint = () => {
  exec('eslint --color .');
};

target.fix = () => {
  exec('eslint --color --fix .');
};

target.style = () => {
  exec('prettier --write .');
};
