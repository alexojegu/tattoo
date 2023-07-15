import 'dotenv/config';
import 'shelljs/make.js';

target.lint = () => {
  exec('eslint --color "**/*.{graphql,js,jsx,ts,tsx}"');
  exec('stylelint --color "**/*.css"');
};

target.fix = () => {
  exec('eslint --color --fix "**/*.{graphql,js,jsx,ts,tsx}"');
  exec('stylelint --color --fix "**/*.css"');
};

target.style = () => {
  exec('prettier --write .');
};
