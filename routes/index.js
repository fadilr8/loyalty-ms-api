const express = require('express');
const app = express();

const router = express.Router();
const useChecker = express.Router();

const authRoute = require('./auth');
const memberRoute = require('./members');
const tierRoute = require('./tiers');
const itemRoute = require('./items');
const loyaltyRoute = require('./programs')
const communityRoute = require('./community');
const transactionRoute = require('./transactions')

const auth = require('../middleware/auth');

router.use('/auth', authRoute);

useChecker.use('/members', auth, memberRoute);
useChecker.use('/tiers', auth, tierRoute);
useChecker.use('/items', auth, itemRoute);
useChecker.use('/programs', auth, loyaltyRoute);
useChecker.use('/community', auth, communityRoute);
useChecker.use('/transactions', auth, transactionRoute);

app.use(router);
app.use(useChecker);

app.all('*', (req, res, next) => {
  res.status(404).json({ status: 404, message: 'Where are we?' });
});

module.exports = app;
