const adminAuth = (req, res, next) => {
    try {
        
        if (!req.user.isAdmin) {
            return res.status(403).json({
                success: false,
                error: 'Admin access required'
            });
        }
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            error: 'Not authorized'
        });
    }
};

module.exports = adminAuth;