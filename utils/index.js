module.exports = {
    sessionActive: req => (req.session?.currentUser ? true : false),
    role: (req, ...rolesToCheck) => rolesToCheck.includes(req.session.currentUser?.role),
}
