const User = require("../app/models").Users;

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (user.role === 1) return next();
    throw new Error();
  } catch (err) {
    res.status(403).json({
      status: 'failed',
      message: 'hanya bisa diakses oleh admin',
    });
  }
};
module.exports = isAdmin;
