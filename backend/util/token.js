const jwt = require('jsonwebtoken');

verifyToken = (req,resp, next) => {

    const headerWithToken = req.headers['authorization'];
    console.log(req.headers);
    if (typeof headerWithToken !== 'undefined'){
        const bearer = headerWithToken.split(' ');
        req.token = bearer[1];
        console.log(bearer[1]);
        next();
    }else {
        resp.sendStatus(403);
    }

};

roleFilter = (req,resp,next, role) => {
    console.log(req.token);
    jwt.verify(req.token, 'SECRET', (err, authData) => {
        if (err) {
            console.log('err in token: ' + err);
            resp.status(403);
        } else {
            if (authData.role === role){
                next();
            }else{
                console.log('Invalid role');
                resp.status(403);
            }
        }
    })
};

module.exports = verifyToken;
module.exports = roleFilter;