const Candidate = require('../models/Candidate');


module.exports = {
    async register(req, res) {

        const { email, sexo, nome, cep } = req.body;

        const newCandidate = new Candidate();

        newCandidate.email = email;
        newCandidate.nome = nome;
        newCandidate.sexo = sexo;
        newCandidate.cep = cep;

        newCandidate.save((err, savedCandidate) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Erro!');
            }

            return res.status(200).send(savedCandidate);
        });
    },



};