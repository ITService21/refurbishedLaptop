const authService = require("../services/authService");

exports.loginUser = async (req, res, next) => {
  try {
    const { status, payload } = await authService.handleLogin(req.body || {});
    res.status(status).json(payload);
  } catch (err) {
    next(err);
  }
};

exports.registerUser = async (req, res, next) => {
  try {
    const result = await authService.handleRegister(req.body || {});
    return res.status(result.status).json(result.payload);
  } catch (error) {
    next(error);
  }
};
