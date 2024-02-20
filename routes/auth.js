const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const db = require('../config/database');

const { validator } = require('../middleware/requestValidator');
const loginSchema = require('../requests/loginRequest');

const User = require('../models/User');

router.post('/login', validator(loginSchema), async function (req, res) {
  try {
    const { email, password, remember } = req.body;

    if (!(email && password)) {
      res.status(400).send('All input is required');
      return;
    }

    let valid;

    const user = await User.findOne({
      where: { email },
      attributes: { include: ['password'] },
    });

    if (!user) {
      return res.status(404).send('User tidak ditemukan!');
    } else {
      valid = await bcrypt.compare(password, user?.password);
    }

    if (valid) {
      let tokenData = {};
      let token;

      tokenData = {
        id: user.id,
        email: user.email,
      };
      
      const expiresIn = remember ? '365d' : '1d';
      // Create token
      token = jwt.sign(tokenData, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn,
      });

      let data = {
        token: token,
      };
      
      res.status(200).json({ status: true, data });
    } else {
      res.status(400).send('Email/Password salah!');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: error,
    });
  }
});

module.exports = router;
