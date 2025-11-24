
/**
 * Global error handling middleware
 * Catches all errors and sends consistent error responses
 * @param {Error} err - Error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const errorHandler = (err, req, res, next) => {
    // Log error details for debugging
    console.error('🚨 Error occurred:');
    console.error('📍 Path:', req.path);
    console.error('🔍 Method:', req.method);
    console.error('💥 Error Message:', err.message);
    console.error('📝 Stack:', process.env.NODE_ENV === 'development' ? err.stack : 'Hidden in production');
    
    // Default error response
    let errorResponse = {
      message: 'Internal server error',
      success: false,
      timestamp: new Date().toISOString()
    };
    
    let statusCode = 500;
    
    // Handle specific error types
    if (err.code === 'ER_DUP_ENTRY') {
      // MySQL duplicate entry error
      statusCode = 400;
      errorResponse.message = 'Duplicate entry - this resource already exists';
    } 
    else if (err.code === 'ER_NO_REFERENCED_ROW' || err.code === 'ER_NO_REFERENCED_ROW_2') {
      // MySQL foreign key constraint error
      statusCode = 400;
      errorResponse.message = 'Referenced resource not found';
    }
    else if (err.code === 'ECONNREFUSED') {
      // Database connection error
      statusCode = 503;
      errorResponse.message = 'Database connection failed - service temporarily unavailable';
    }
    else if (err.name === 'ValidationError') {
      // Mongoose validation error (if using MongoDB)
      statusCode = 400;
      errorResponse.message = 'Validation failed';
      errorResponse.errors = err.errors;
    }
    else if (err.name === 'JsonWebTokenError') {
      // JWT error
      statusCode = 401;
      errorResponse.message = 'Invalid token';
    }
    else if (err.name === 'TokenExpiredError') {
      // JWT expired error
      statusCode = 401;
      errorResponse.message = 'Token expired';
    }
    
    // Include error details in development mode
    if (process.env.NODE_ENV === 'development') {
      errorResponse.error = err.message;
      errorResponse.stack = err.stack;
    }
    
    // Send error response
    res.status(statusCode).json(errorResponse);
  };
  
  // Export error handler middleware
  module.exports = errorHandler;