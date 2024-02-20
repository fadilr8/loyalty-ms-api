const validator = (schema) => async (req, res, next) => {
  try {
    req.body = await schema.validate(req.body);

    return next();
  } catch (error) {
    return res.status(400).json({ error });
  }
};

const paramsValidator = (schema) => async (req, res, next) => {
  try {
    req.query = await schema.validate(req.query);
    return next();
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};

module.exports = {
  validator,
  paramsValidator,
};
