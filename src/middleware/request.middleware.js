const requestMiddleware = (req, res, next) => {
    console.info(`[${new Date()}]: { URL: ${req.originalURL}, Method: ${req.method} }`)
    next()
}

export default requestMiddleware