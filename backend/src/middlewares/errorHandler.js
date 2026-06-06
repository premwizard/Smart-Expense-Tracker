const errorHandler = (err, _req, res, _next) => {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error. Please try again later.' });
};
export default errorHandler;
