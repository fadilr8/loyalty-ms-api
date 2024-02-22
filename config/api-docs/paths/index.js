const auth = require('./auth_path.json');
const members = require('./members_path.json');

const paths = {
  ...auth,
  ...members,
};

module.exports = paths;
