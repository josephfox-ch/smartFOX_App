const checkAccessControl = (requiredRole) => {
    return (req, res, next) => {
      const userRole = req.user.role; 
  
      if (userRole !== requiredRole) {
        return res.status(403).json({
          success: false,
          message: 'Access denied',
        });
      }
  
      next();
    };
  };
  
  export default checkAccessControl;
  