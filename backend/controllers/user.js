const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host:'localhost',
    port:'3306',
    user:'admin',
    password:'admin',
    database:'groupomania',
});

exports.signup = (req, res, next) => {
    const validEmail = /[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;
    const validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const verifyEmail = validEmail.test(req.body.email);
    const verifyPassword = validPassword.test(req.body.password);
    if (req.body.lastname == null || req.body.firstname == null || req.body.email == null || req.body.password == null) {
        return res.status(400).json({ err: 'Merci de remplir les champs !'})
    }
    else if (verifyEmail != true ) {
        return res.status(400).json({ err: 'merci de saisir une adresse email valide !'})
    } 
    else if (verifyPassword != true ){
        return res.status(400).json({ err: 'Merci de saisir un mot de passe avec au moins une majuscule, une minuscule, un chiffre et un caractère spécial'})
    }
    else {
        bcrypt.hash(req.body.password, 10)
            .then(hash => {
                const record = {
                    lastname: req.body.lastname,
                    firstname: req.body.firstname,
                    email: req.body.email,
                    password: hash,
            }
        connection.query('INSERT INTO user SET ?', record, function(err, result, field) {
            if (err) throw err;
                res.status(201).json({ message: 'Utilisateur créé !'});
            });
        });
    };
};

exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    connection.query('SELECT * FROM user WHERE email = ?', [email], function(err, result, field) {
        if (err) throw err;
        else if (!req.body.email) 
            return res.status(401).json({ err: 'Utilisateur non trouvé !'});
        else {
            bcrypt.compare(password, result[0].password)
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({ err: 'Mot de passe incorrect !'});
                }
                res.status(200).json({
                    token: jwt.sign(
                        { userId: result[0].id },
                        'RANDOM_SECRET_TOKEN',
                        {expiresIn: '24h'}
                    )
                });
            })
            .catch(err => res.status(500).json({ err }));
        };
    });
};

exports.deleteUser = (req, res, next) => {
    try {
        if (req.body.decodedToken && req.body.decodedToken.userId !== user.id) {
            throw 'Identifiant invalide';
        } else {
            connection.query('DELETE FROM user WHERE id = ?', userId, function(err, result, field) {
                if (err) throw err;
                res.status(200).json({ message: 'Utilisateur supprimé !'})
            });
        }
    } catch {
        res.status(401).json({ err: new Error('Requête invalide')});
    }    
};

exports.getOneUser = (req, res, next) => {
    connection.query('SELECT id FROM user', function(err, result, field) {
        if (err) throw err;
        console.log(result)
        if (req.body.decodedToken === result[0].id) {
            connection.query('SELECT * FROM user WHERE id = ?', req.body.decodedToken, function(err, result, field) {
                if (err) throw err;
                res.send(data);
            });
        }
    }); 
};

// Admin management
exports.getAllUser = (req, res, next) => {
    connection.query('SELECT id, lastname, firstname, email, password FROM user', function(err, result, field) {
        if (err) throw err;
        console.log(result)
        res.status(200).json(result)
    });
};

exports.adminDeleteUser = (req, res, next) => {
    connection.query('SELECT isadmin FROM user WHERE id = ?', req.params.id, function(err, result, field) {
        if (err) throw err;
        if (user.isadmin === 0){
            res.status(403).json({ err: 'Vous n\'avez pas les droits d\'administration'});
        } else {
            ('DELETE FROM user WHERE id = ?', req.body.id, function(err, result, field){
                if (err) throw err;
                res.status(200).json({ message: 'Utilisateur supprimé !'})
            });
        }
    });
};