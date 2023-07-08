const User = require("../app/models/users")

const isAdmin = (req, res, next) => {
  if (req.user.role == "1" ) {
    next()
  } else {
    res.status(401).json({
      status: "failed",
      message: "hanya bisa diakses oleh admin",
    })
  }
}
module.exports = isAdmin;
