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
    const record = {
        title: escape(req.body.title),
        topic: escape(req.body.topic),
        image_url: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        user_id: escape(req.body.user_id)
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
        topic: req.body.topic,
        image_url: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {
        title: escape(req.body.title),
        topic: req.body.topic
    };
    connection.query('SELECT user_id FROM topic WHERE user_id = ?', req.body.user_id, function(err, result, field) {
        if (err) throw err;
        console.log('req.body.user_id',req.body.user_id,'test result',result[0]);
        if (req.body.user_id == result[0].user_id) {
            connection.query('UPDATE topic SET ? WHERE topic.topic_id = ?', [topicObject, req.body.topic_id] , function(err, result, field) {
                if (err) throw err;
                res.status(200).json({ message: 'Méssage modifié !'});
            });
        } else {
            res.status(401).json({ error: new Error ('Requête invalide')});
        };
    });
};

exports.deleteTopic = (req, res, next) => {
    connection.query('SELECT * FROM topic WHERE topic_id = ?', req.params.id, function(err, result, field) {
        if (err) throw err;
        if (req.body.decodedToken.userId == result[0].user_id) {
            const filename = result[0].image_url.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                connection.query('DELETE FROM topic WHERE topic_id = ?', req.params.id, function(err, result, field) {
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
    connection.query('SELECT * FROM topiclike LEFT JOIN topic ON topiclike.topic_id = topic.topic_id LEFT JOIN user ON topiclike.user_id = user.id WHERE = topic.topic_id ', function(err, result, field){
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
        comment: req.body.comment,
        image_url: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        topic_id: escape(req.body.topic_id),
        user_id: req.body.user_id
    } : {
        comment: req.body.comment,
        topic_id: req.body.topic_id,
        user_id: req.body.user_id
    }
    connection.query('INSERT INTO comment SET ?', [record], function(err, result, field) {
        if (err) throw err;
        res.status(201).json({ message: 'Commentaire enregistré !'});
    });
};

exports.getAllComment = (req, res, next) => {
    connection.query('SELECT * FROM comment LEFT JOIN topic ON comment.topic_id = topic.topic_id LEFT JOIN user ON comment.user_id = user.id WHERE topic.topic_id = ?', [req.params.id], function(err, result, field) {
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
    connection.query('SELECT user_id FROM comment WHERE id = ?', req.body.user_id, function(err, result, field) {
        if (err) throw err;
        if (req.body.user_id === result[0].user_id) {
            connection.query('UPDATE comment SET ? WHERE comment.comment_id = ?', [commentObject, req.body.comment_id], function(err, result, field) {
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
            const filename = result[0].image_url.split('/images/')[1];
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

exports.signalComment = (req, res, next) => {
    const spam = {
        comment_id: req.body.comment_id,
        user_id: req.body.decodedToken.userId,
    }
    connection.query('INSERT INTO spam_comment SET ?', [spam], function(err, result, field) {
        if (err) throw err;
        res.status(201).json({message: 'Spam signaler'})
    });
};

exports.getSpamComment = (req, res, next) => {
    connection.query('SELECT isadmin FROM user WHERE id = ?', req.body.decodedToken.userId, function(err, result, field) {
        if (err) throw err;
        if (result[0].isadmin ===0) {
            res.status(403).json({ err: 'Vous n\'avez pas les droits d\'administrateur !'});
        } else {
            connection.query('SELECT * FROM spam_comment LEFT JOIN comment ON spam_comment.comment_id = comment.comment_id LEFT JOIN user ON spam_comment.user_id = user.id', function(err, result, field) {
                if (err) throw err;
                res.status(200).json(result)
            });
        };
    });
};

exports.cancelSpamComment = (req, res, next) => {
    connection.query('SELECT isadmin FROM user WHERE id = ?', req.body.decodedToken.userId, function(err, result, field) {
        if (err) throw err;
        if (result[0].isadmin === 0) {
            res.status(403).json({ err: 'Vous n\'avez pas les droits d\'administrateur !'});
        } else {
            connection.query('DELETE FROM spam_comment WHERE spamcomment_id = ?', req.body.spamcomment_id, function(err, result, field) {
                if (err) throw err;
                res.status(200).json({ message: 'Spam Supprimer'});
            })
            
        };
    });
};

exports.deleteSpamComment = (req, res, next) => {
    connection.query('SELECT isadmin FROM user WHERE id = ?', req.body.decodedToken.userId, function(err, result, field) {
        if (err) throw err;
        if (result[0].isadmin === 0) {
            res.status(403).json({ err: 'Vous n\'avez pas les droits d\'administrateur !'});
        } else {
            connection.query('DELETE FROM spam_comment WHERE spamcomment_id = ?', req.body.spamcomment_id, function(err, result, field) {
                if (err) throw err;
            })
            connection.query('DELETE FROM comment WHERE comment.comment_id = ?', req.body.comment_id, function(err, result, field) {
                if (err) throw err;
                res.status(200).json({ message: 'Commentaire Supprimer'});
            })
        };
    });
};

exports.signalTopic = (req, res, next) => {
    const spam = {
        topic_id: req.body.topic_id,
        user_id: req.body.decodedToken.userId,
    }
    connection.query('INSERT INTO spam_topic SET ?', [spam], function(err, result, field) {
        if (err) throw err;
        res.status(201).json({message: 'Spam signaler'})
    });
};

exports.getSpamTopic = (req, res, next) => {
    connection.query('SELECT isadmin FROM user WHERE id = ?', req.body.decodedToken.userId, function(err, result, field) {
        if (err) throw err;
        if (result[0].isadmin ===0) {
            res.status(403).json({ err: 'Vous n\'avez pas les droits d\'administrateur !'});
        } else {
            connection.query('SELECT * FROM spam_topic LEFT JOIN topic ON spam_topic.topic_id = topic.topic_id LEFT JOIN user ON spam_topic.user_id = user.id', function(err, result, field) {
                if (err) throw err;
                res.status(200).json(result)
            });
        };
    });
};

exports.cancelSpamTopic = (req, res, next) => {
    connection.query('SELECT isadmin FROM user WHERE id = ?', req.body.decodedToken.userId, function(err, result, field) {
        if (err) throw err;
        if (result[0].isadmin === 0) {
            res.status(403).json({ err: 'Vous n\'avez pas les droits d\'administrateur !'});
        } else {
            connection.query('DELETE FROM spam_topic WHERE spamtopic_id = ?', req.body.spamtopic_id, function(err, result, field) {
                if (err) throw err;
                res.status(200).json({ message: 'Spam Supprimer'});
            })
            
        };
    });
};

exports.deleteSpamTopic = (req, res, next) => {
    connection.query('SELECT isadmin FROM user WHERE id = ?', req.body.decodedToken.userId, function(err, result, field) {
        if (err) throw err;
        if (result[0].isadmin === 0) {
            res.status(403).json({ err: 'Vous n\'avez pas les droits d\'administrateur !'});
        } else {
            connection.query('DELETE FROM spam_topic WHERE spamtopic_id = ?', req.body.spamtopic_id, function(err, result, field) {
                if (err) throw err;
            })
            connection.query('DELETE FROM topic WHERE topic.topic_id = ?', req.body.topic_id, function(err, result, field) {
                if (err) throw err;
                res.status(200).json({ message: 'Commentaire Supprimer'});
            })
        };
    });
};