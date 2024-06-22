//Checa as permissoes de usuario



function admin(req, res, next) {
    if (req.body.funcaous!=="admin") return res.status(403).send({
        ok: false,
        error: "Access denied."
    });

    next();
}

function viewer(req, res, next) {
    console.log(req.body.funcaous)
    switch(req.body.funcaous){
        case 'viewer':
            next()
        case 'admin':
            next()
    }
    
}

module.exports = { admin, viewer };