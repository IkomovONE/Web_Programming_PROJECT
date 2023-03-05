const jwt = require("jsonwebtoken");

//importing jwt

module.exports = function(req, res, next) {
    const authHeader = req.headers["authorization"];

    //setting authorization header
    
    let token;
    if(authHeader) {
        token = authHeader

        //setting token if variable is not null
        
        
    } else {
        token = undefined;
    }
    if(token == undefined) return res.sendStatus(401);

    //returning error if no token
    console.log("Token found");
    jwt.verify(token, process.env.SECRET, (err, user) => {
        if(err) return res.sendStatus(401)
        req.user = user;

        //verifying token, then setting user

        
        
        next();

        //allowing further commands to execute
    });


    
};



//this function is used to validate token, it was taken from the teacher's source code from one of the lectures