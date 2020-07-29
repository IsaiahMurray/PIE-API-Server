module.exports = (req, res, next) => {
    res.header('access-control-allow-origin', '*'); //Allows anyone to come to the webpage
    res.header('access-control-allow-methods', 'GET, POST, PUT, DELETE'); //Allows certain methods
    res.header('access-control-allow-headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    //Authorization check for content that requires authentication

    next(); 
}