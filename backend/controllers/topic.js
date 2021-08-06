const mysql = require('mysql');
const fs = require('fs');


const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'admin',
    password: 'admin',
    database: 'groupomania'
});

// Topic management
exports.createTopic = (req, res, next) => {
    const record = req.file ? {
        title: escape(req.body.title),
        topic: escape(req.body.topic),
        image_url: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        user_id: req.body.decodedToken.userId
    } : {
        title: escape(req.body.title),
        topic: escape(req.body.topic),
        image_url: 'test',
        user_id: req.body.decodedToken.userId
    }
    if (req.body.title == null ) {
        res.status(400).json({message:'Veillez remplir le titre !'})
    } else if (req.body.topic == null) {
        res.status(400).jon({message:'Veillez remplir la partie post'})
    } else
    connection.query('INSERT INTO topic SET ?', [record], function(err, result, field) {
        if (err) throw err;
        res.status(201).json({ message: 'Méssage enregitrée !'});
    });
};

exports.getAllTopic = (req, res, next) => {
    connection.query('SELECT * FROM topic INNER JOIN user ON topic.user_id = user.id',function(err, result, field) {
        if (err) throw err;
        if (result.length === 0) {
            res.status(204).json({ message: 'Aucun topic'})
        } else {
            res.status(200).json(result);
        }
    });
};

exports.getOneTopic = (req, res, next) => {
    connection.query('SELECT * FROM topic INNER JOIN user ON topic.user_id = user.id WHERE topic.topic_id = ?', [req.params.id], function(err, result, field) {
        if (err) throw err;
        res.status(200).json(result[0]);
    });
};

exports.modifyTopic = (req, res, next) => {
    const topicObject = req.file ?
        {
            title: escape(req.body.title),
            topic: escape(req.body.topic),
            image_url: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : {
            title: escape(req.body.title),
            topic: escape(req.body.topic)
        };
    connection.query('SELECT user_id FROM topic WHERE user_id = ?', req.body.id, function(err, result, field) {
        if (err) throw err;
        if (userId === result[0].user_id) {
            connection.query('UPDATE topic SET = ? WHERE = ?', topicObject , req.body.id, function(err, result, field) {
                if (err) throw err
                res.status(200).json({ message: 'Méssage modifié !'});
            });
        } else {
            res.status(401).json({ error: new Error ('Requête invalide')});
        };
    });
};

exports.deleteTopic = (req, res, next) => {
    connection.query('SELECT topic, user_id FROM topic WHERE topic_id = ?', req.body.id, function(err, result, field) {
        if (err) throw err;
        if (req.body.decodedToken === result[0].user_id) {
            const filename = topic.image_url.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
             ('DELETE FROM topic WHERE id = ?', req.params.id, function(err, result, field) {
                    if (err) throw err;
                    res.status(200).json({ message: 'Méssage supprimé !'});
                });
            });
        } else {
            res.status(401).json({ err: new Error ('Requête invalide')});
        };
    });
};

// like management

exports.addTopicLike = (req, res, next) => {
    connection.query('SELECT * FROM topiclike LEFT OUTER JOIN topic ON topiclike.topic_id = topic.topic_id LEFT OUTHER JOIN user ON topiclike.user_id = user.user_id WHERE = topic.topic_id ', function(err, result, field){
        if (err) throw err;
        if (topiclike.like_topic == 1 ) {
            res.status(400).json({ message: 'Topic déjà liké !'});
        } else {
            connection.query('INSERT INTO topiclike SET like_topic = 1', function(err, result, field) {
                if (err) throw err;
                res.status(200).json({ message: 'Topic liké !'})
            });
        };
    });
};

exports.topicLike = (req, res, next) => {
    connection.query('SELECT COUNT(like_topic) FROM topiclike WHERE topic_id ', function(err, result, field) {
        if (err) throw err;
        result.status(200).json( topicLike );
    });
};

// Comment management
exports.createComment = (req, res, next) => {
    const record = req.file ?
    {
        comment: escape(req.body.comment),
        image_url: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        topic_id: escape(req.body.topic_id),
        user_id: req.body.decodedToken.userId
    } : {
        comment: escape(req.body.comment),
        topic_id: escape(req.body.topic_id),
        user_id: req.body.decodedToken.userId
    }
    connection.query('INSERT INTO comment SET ?', [record], function(err, result, field) {
        if (err) throw err;
        res.status(201).json({ message: 'Commentaire enregistré !'});
    });
};

exports.getAllComment = (req, res, next) => {
    connection.query('SELECT * FROM comment LEFT JOIN topic ON comment.topic_id = topic.topic_id RIGHT JOIN user ON comment.user_id = user.id WHERE topic.topic_id = ?', [req.params.id], function(err, result, field) {
        if (err) throw err;
        if (result.length === 0) {
            res.status(204).json({ message: 'Aucun commentaire'})
        } else {
            res.status(200).json(result);
        }
    })
};

exports.modifyComment = (req, res, next) => {
    const commentObject = req.file ? 
        {
            comment: escape(req.body.comment),
            image_url: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : {
            comment: escape(req.body.comment)
        };
    connection.query('SELECT user_id FROM comment WHERE id = ?', req.body.id, function(err, result, field) {
        if (err) throw err;
        if (req.body.decodedToken.userId === comment.user_id) {
            connection.query('UPDATE comment SET = ? WHERE = ?', commentObject, req.body.id, function(err, result, field) {
                if (err) throw err;
                res.status(200).json({ message: 'Commentaire modifié !'});
            });
        } else {
            res.status(401).json({ err: new Error ('Requête invalide !')});
        };
    });
};

exports.deleteComment = (req, res, next) => {
    connection.query('SELECT comment, user_id FROM comment WHERE id = ?', req.body.id, function(err, result, field){
        if (err) throw err;
        if (req.body.decodedToken.userId === result[0].user_id) {
            const filename = comment.image_url.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                connection.query('DELETE FROM comment WHERE comment_id = ?', req.body.id, function(err, result, field) {
                    if (err) throw err;
                    res.status(200).json({ message: 'Commentaire supprimé !'});
                });
            });
        } else {
            res.status(401).json({ err: new Error ('Requête invalide !')});
        };
    });
};

// Admin management

exports.adminDeleteComment = (req, res, next) => {
    connection.query('SELECT isadmin FROM user WHERE id = ?', req.body.decodedToken.userId, function(err, result, field) {
        if (err) throw err;
        if (user.isadmin === 0) {
            result.status(403).json({ err: 'Vous n\'avez pas les droits d\'administrateur !'});
        } else {
            const filename = comment.image_url.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                connection.query('DELETE FROM comment WHERE id = ?', req.body.id, function(err, result, field) {
                    if (err) throw err;
                    res.status(200).json({ message: 'Commentaire supprimé !'});
                });
            });
        };
    });
};

exports.adminDeleteTopic = (req, res, next) => {
    connection.query('SELECT isadmin FROM user WHERE id = ?', req.body.decodedToken.userId, function(err, result, field) {
        if (err) throw err;
        if (result[0].isadmin === 0) {
            res.status(403).json({ err: 'Vous n\'avez pas les droits d\'administrateur !'});
        } else {
            const filename = topic.image_url.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                connection.query('DELETE FROM topic WHERE id = ?', req.body.id, function(err, result, field) {
                    if (err) throw err;
                    res.status(200).json({ message: 'Méssage supprimé !'});
                });
            });
        };
    });
};

exports.signalSpam = (req, res, next) => {
    const spam = {
        topic_id: req.body.topic_id,
        comment_id: req.body.comment_id,
        user_id: req.body.decodedToken.userId,
    }
    connection.query('INSERT TO spam SET ?', [spam], function(err, result, field) {
        if (err) throw err;
        res.status(201).json({message: 'Spam signaler'})
    })
}

exports.getSpam = (req, res, next) => {
    connection.query('SELECT isadmin FROM user WHERE id = ?', req.body.decodedToken.userId, function(err, result, field) {
        if (err) throw err;
        if (result[0].isadmin ===0) {
            res.status(403).json({ err: 'Vous n\'avez pas les droits d\'administrateur !'});
        } else {
            connection.query('SELECT * FROM spam LEFT JOIN topic ON spam.topic_id = topic.topic_id LEFT JOIN comment ON spam.comment_id = comment.comment_id LEFT JOIN user ON spam.user_id = user.id', function(err, result, field) {
                if (err) throw err;
                res.status(200).json(result)
            })
        }
    })
}