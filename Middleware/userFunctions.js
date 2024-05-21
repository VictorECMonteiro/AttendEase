//Checa as permissoes de usuario



function admin(req, res, next) {
    console.log(req.body.funcao)
    if (req.body.funcao!="admin") return res.status(403).send({
        ok: false,
        error: "Access denied."
    });

    next();
}

function editor(req, res, next) {
    if (req.body.funcao!="editor") return res.status(403).send({
        ok: false,
        error: "Access denied."
    });

    next();
}

function viewer(req, res, next) {
    if (req.body.funcao!="viewer") return res.status(403).send({
        ok: false,
        error: "Access denied."
    });

    next();
}

module.exports = { admin, editor, viewer };