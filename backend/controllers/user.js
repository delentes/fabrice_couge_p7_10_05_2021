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
console.log('test2');
exports.signup = (req, res, next) => {
    console.log(req.body);
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
        connection.query(function(err, result, field){
            if (err) throw err;
            
            bcrypt.hash(req.body.password, 10)
            .then(hash => {
                let record = [
                    lastname = mysql.escape(req.body.lastname),
                    firstname = mysql.escape(req.body.firstname),
                    email = mysql.escape(req.body.email),
                    password = hash,
                    isadmin = 0,
                ];
                console.log(record);
                ('INSERT INTO user VALUE = ?', [record], function(err, result, field) {
                    if (err) throw err;
                    else result.status(201).json({ message: 'Utilisateur créé !'});
                })
            })
            .catch(err => result.status(500).json({ err }));
        })
    }
};

exports.login = (req, res, next) => {
    connection.query('SELECT * FROM user WHERE email = ?', req.body.email, function(err, result, field) {
        if (err) throw err;
        else if (!user) 
            return result.status(401).json({ err: 'Utilisateur non trouvé !'});
        else {
            bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if (!valid) {
                    return result.status(401).json({ err: 'Mot de passe incorrect !'});
                }
                result.status(200).json({
                    userId: user._id,
                    token: jwt.sign(
                        { userId: user._id },
                        'RANDOM_SECRET_TOKEN',
                        {expiresIn: '24h'}
                    )
                });
            })
            .catch(err => result.status(500).json({ err }));
        };
    });
};

exports.deleteUser = (req, res, next) => {
    try {
        if (req.body.decodedToken.userId && req.body.decodedToken.userId !== user.id) {
            throw 'Identifiant invalide';
        } else {
            connection.query('DELETE FROM user WHERE id = ?', userId, function(err, result, field) {
                if (err) throw err;
                result.status(200).json({ message: 'Utilisateur supprimé !'})
            });
        }
    } catch {
        res.status(401).json({ err: new Error('Requête invalide')});
    }    
};

exports.getOneUser = (req, res, next) => {
    connection.query('SELECT id FROM user', function(err, result, field) {
        if (err) throw err;
        if (req.body.decodedToken.userId === user.id) {
            connection.query('SELECT * FROM user WHERE id = ?', res.body.id, function(err, result, field) {
                if (err) throw err;
                result.status(200).json(user)
            });
        }
    }); 
};

// Admin management
exports.getAllUser = (req, res, next) => {
    connection.query('SELECT id, lastname, firstname FROM user ORDER BY creation_date DESC', function(err, result, field) {
        if (err) throw err;
        result.status(200).json(users)
    });
};

exports.adminDeleteUser = (req, res, next) => {
    connection.query('SELECT isadmin FROM user WHERE id = ?', req.params.id, function(err, result, field) {
        if (err) throw err;
        if (user.isadmin === 0){
            result.status(403).json({ err: 'Vous n\'avez pas les droits d\'administration'});
        } else {
            ('DELETE FROM user WHERE id = ?', req.body.id, function(err, result, field){
                if (err) throw err;
                result.status(200).json({ message: 'Utilisateur supprimé !'})
            });
        }
    });
};