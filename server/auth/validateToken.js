const jwt = require("jsonwebtoken");





module.exports = function(req, res, next) {
    const authHeader = req.headers["authorization"];
    
    let token;
    if(authHeader) {
        token = authHeader
        
        
    } else {
        token = undefined;
    }
    if(token == undefined) return res.sendStatus(401);
    console.log("Token found");
    jwt.verify(token, process.env.SECRET, (err, user) => {
        if(err) return res.sendStatus(401)
        req.user = user;

        
        
        next();
    });


    
};
