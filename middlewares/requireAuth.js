const requireAuth = (req, res, next) => {
    if (req.session.userId) {
        next(); // User is authenticated, continue to next middleware
    } else {
        res.status(401).send('login'); // User is not authenticated, redirect to login page
    }
}


module.exports={
    requireAuth
}
