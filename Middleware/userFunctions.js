//Checa as permissoes de usuario



function admin(req, res, next) {
    console.log(req.body.m2)
    if (req.body.m2!="admin") return res.status(403).send({
        ok: false,
        error: "Access denied."
    });

    next();
}

function editor(req, res, next) {
    if (req.body.m2!="editor") return res.status(403).send({
        ok: false,
        error: "Access denied."
    });

    next();
}

function viewer(req, res, next) {
    if (req.body.m2!="viewer") return res.status(403).send({
        ok: false,
        error: "Access denied."
    });

    next();
}

module.exports = { admin, editor, viewer };