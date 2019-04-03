module.exports = isAdmin

function isAdmin(req, res, next) {
  if (req.user && req.user.isAdmin) {
    return next()
  }
  res.sendStatus(403)
}
