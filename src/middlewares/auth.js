const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET;

// Execute esse codigo
// (req) Faca alteracoes na solicitacao e nos objetos de resposta
// (res) Encerrar o ciclo de solicitacao-resposta
// (next) Chama o proximo middleware na fila OUUUUU NESSE CASO chame o controllerrrrr

// quero checar a autorizacao do usuario
exports.checkAuth = (req,res,next) => {
    
    const authHeader = req.get('authorization');
    if (!authHeader) {
        return res.status(401).send({
            message: 'Sem autorizacao',
            statusCode: 401
        });
    }
    
    const token = authHeader.split(' ')[1];
    console.log("tokenzinhooo", token)
    
    if (!token) {
        return res.status(401).send({
            message: "erro no token"
        })
    }
    
    try {
        jwt.verify(token, SECRET, (err) => {
            if(err) {
                return res.status(401).send({
                    message: "Nao autorizada"
                })    
            }
            next();
        })
    } catch(err) {
        console.error(err)
    }
}
