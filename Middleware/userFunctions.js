//Checa as permissoes de usuario



function admin(req, res, next) {
    console.log(req.body.funcao)
    if (req.body.funcaous!="admin") return res.status(403).send({
        ok: false,
        error: "Access denied."
    });

    next();
}

function editor(req, res, next) {
    if (req.body.funcaous!="editor") return res.status(403).send({
        ok: false,
        error: "Access denied."
    });

    next();
}

function viewer(req, res, next) {
    if (req.body.funcaous!="viewer") return res.status(403).send({
        ok: false,
        error: "Access denied."
    });

    next();
}

module.exports = { admin, editor, viewer };