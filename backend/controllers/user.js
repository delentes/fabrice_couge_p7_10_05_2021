const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
require('dotenv').config();

console.log(process.env.dbport,process.env.host)

const connection = mysql.createConnection({
    host: process.env.host,
    dbport: process.env.port,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
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
                    lastname: escape(req.body.lastname),
                    firstname: escape(req.body.firstname),
                    email: escape(req.body.email),
                    password: hash,
            }
        connection.query('INSERT INTO user SET ?', [record], function(err, result, field) {
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
        else if (!result[0]) 
            return res.status(401).json({ err: 'Utilisateur non trouvé !'});
        else {
            bcrypt.compare(password, result[0].password)
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({ err: 'Mot de passe incorrect !'});
                }
                const userId = result[0].id;
                const isadmin = result[0].isadmin;
                res.status(200).json({userId, isadmin,
                    token: jwt.sign(
                        { userId: result[0].id },
                        process.env.tokenkey,
                        {expiresIn: '24h'}
                    )
                });
            })
            .catch(err => res.status(500).json({ err: 'Serveur indisponible'}));
        };
    });
};

exports.getOneUser = (req, res, next) => {
    connection.query('SELECT * FROM user WHERE id = ?', req.body.decodedToken.userId, function(err, result, field) {
        if (err) throw err;
        res.status(200).json(result[0])
    });
};

exports.deleteUser = (req, res, next) => {
    try {
        connection.query('SELECT id FROM user WHERE id = ?', req.body.decodedToken.userId, function(err, result, field) {
            if (err) throw err;
            if (req.body.decodedToken.userId && req.body.decodedToken.userId !== result[0].id) {
                return res.status(401).json( new Error ('Identifiant invalide')) ;
            } else {
                connection.query('DELETE FROM user WHERE id = ?', result[0].id, function(err, result, field) {
                    if (err) throw err;
                    res.status(200).json({ message: 'Utilisateur supprimé !'})
                });
            }
        })
    } catch {
        res.status(401).json({ err: new Error('Requête invalide')});
    }    
};


// Admin management
exports.getAllUser = (req, res, next) => {
    connection.query('SELECT isadmin FROM user WHERE id = ?', req.body.decodedToken.userId, function(err, result, field) {
        if (err) throw err;
        if (result[0].isadmin === 0 ) {
            res.status(403).json({ message: 'Vous n\'avez pas les droits d\'administration'});
        } else 
            connection.query('SELECT * FROM user', function(err, result, field) {
                if (err) throw err;
                res.status(200).json(result)
            });
    });
};

exports.addAdmin = (req, res, next) => {
    connection.query('SELECT isadmin FROM user WHERE id = ?', req.body.decodedToken.userId, function(err, result, field) {
        if (err) throw err;
        if (result[0].isadmin === 0) {
            res.status(403).json({ message: 'Vous n\'avez pas les droits d\'administration'})
        } else {
            connection.query('SELECT isadmin FROM user WHERE id = ?',req.body.id, function(err, result, field) {
                if (err) throw err
                if (result[0].isadmin === 0) {
                    console.log('test admin1', result[0].isadmin)
                    connection.query('UPDATE user SET isadmin = 1 WHERE id = ?', req.body.id, function(err, result, field) {
                        if (err) throw err;
                        res.status(200).json({ message: 'Administrateur ajouter !'});
                    })
                } else {
                    console.log('test admin0', result[0].isadmin)
                    connection.query('UPDATE user SET isadmin = 0 WHERE id = ?', req.body.id, function(err, result, field) {
                        if (err) throw err;
                        res.status(200).json({ message: 'Administrateur retirer !'});
                    })
                }
            });
        };
    });
};

exports.adminDeleteUser = (req, res, next) => {
    connection.query('SELECT isadmin FROM user WHERE id = ?', req.body.decodedToken.userId, function(err, result, field) {
        if (err) throw err;
        if (result[0].isadmin === 0){
            res.status(403).json({ err: 'Vous n\'avez pas les droits d\'administration'});
        } else {
            console.log('test userid', req.body.id);
            connection.query('DELETE FROM user WHERE id = ?', req.body.id, function(err, result, field){
                if (err) throw err;
                res.status(200).json({ message: 'Utilisateur supprimé !'});
            });
        }
    });
};