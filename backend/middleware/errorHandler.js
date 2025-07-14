// ===========================================
// Centralized Express error handling middleware
// ===========================================
export const errorHandler = (err, req, res, next) => {
  // Log the full error stack to the console (useful during development)
  console.error(err.stack);

  // Send error response to the client
  // Use the error's message if available, otherwise use a generic message
  res.status(500).json({
    error: err.message || 'Internal Server Error'
  });
};
