const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'groupomania',
});

exports.signup = (req, res, next) => {

    if (req.body.lastname == null || req.body.firstname == null || email == null || req.body.password == null) {
        return res.status(400).json({ err: 'Merci de remplir les champs !'})
    }
    else if (req.body.email != /[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/) {
        return res.status(400).json({ err: 'merci de saisir une adresse email valide !'})
    } 
    else if (req.body.password != /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/){
        return res.status(400).json({ err: 'Merci de saisir un mot de passe avec au moins une majuscule, une minuscule, un chiffre et un caractère spécial'})
    };

    connection.query(function(err, result, field){
        if (err) throw err;
        
        bcrypt.hash(req.body.password, 10)
        .then(hash => {
            let record = [
                lastname = mysql.escape(req.body.lastname),
                firstname = mysql.escape(req.body.firstname),
                email = mysql.escape(email),
                password = hash,
                isadmin = 0,
            ];
            
            ('INSERT INTO `user` VALUE = ?', [record], function(err, result, field) {
                if (err) throw err;
                else result.status(200).json({ message: 'Utilisateur créé !'});
            })
        })
        .catch(err => result.status(500).json({ err }));
    })
};

exports.login = (req, res, next) => {
    let email = req.body.email;
    connection.query('SELECT * FROM `user` WHERE `email`= ?', [email], function(err, result, field) {
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
                    userId: user_id,
                    token: jwt.sign(
                        { userId: user._id },
                        '',
                        {expiresIn: '24h'}
                    )
                });
            })
            .catch(err => result.status(500).json({ err }));
        };
    });
};

exports.deleteUser = (req, res, next) => {
    let id = req.params._id;
    connection.query('SELECT `id` FROM `user` WHERE `id` = ?', [id], function(err, result, field) {
        if (err) throw err;
        ('DELETE FROM `user` WHERE `id` = ?',[id], function(err, result, field) {
            if (err) throw err;
            result.status(200).json({ message: 'Utilisateur supprimé !'})
        });
    });
};