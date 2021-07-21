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
    let record = [
        title = escape(req.body.title),
        topic = escape(req.body.topic),
        image_url = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    ];
    connection.query('INSERT INTO topic VALUE = ?',[record],function(err, result, field) {
        if (err) throw err;
        result.status(201).json({ message: 'Méssage enregitrée !'});
    });
};

exports.getAllTopic = (req, res, next) => {
    connection.query('SELECT * FROM topic INNER JOIN user ON topic.user_id = user.id',function(err, result, field) {
        if (err) throw err;
        result.status(200).json(topics)
    });
};

exports.getOneTopic = (req, res, next) => {
    connection.query('SELECT * FROM topic INNER JOIN comment ON topic.id = comment.topic_id INNER JOIN user ON topic.user_id = user.id WHERE id = ?', req.params.id, function(err, result, field) {
        if (err) throw err;
        result.status(200).json(topic)
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
    connection.query('SELECT user_id FROM topic WHERE id = ?', req.params.id, function(err, result, field) {
        if (err) throw err;
        if (userId === topic.user_id) {
            ('UPDATE topic SET = ? WHERE = ?', topicObject , req.params.id, function(err, result, field) {
                if (err) throw err
                result.status(200).json({ message: 'Méssage modifié !'});
            });
        } else {
            result.status(401).json({ error: new Error ('Requête invalide')});
        };
    });
};

exports.deleteTopic = (req, res, next) => {
    connection.query('SELECT topic, user_id FROM topic WHERE = ?', req.params.id, function(err, result, field) {
        if (err) throw err;
        if (req.body.decodedToken.userId === topic.user_id) {
            const filename = topic.image_url.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
             ('DELETE FROM topic WHERE id = ?', req.params.id, function(err, result, field) {
                    if (err) throw err;
                    result.status(200).json({ message: 'Méssage supprimé !'});
                });
            });
        } else {
            result.status(401).json({ err: new Error ('Requête invalide')});
        };
    });
};

exports.adminDeleteTopic = (req, res, next) => {
    connection.query('SELECT isadmin FROM user WHERE = ?', userId, function(err, result, field) {
        if (err) throw err;
        if (user.isadmin === 0) {
            result.status(403).json({ err: 'Vous n\'avez pas les droits d\'administrateur !'});
        } else {
            const filename = topic.image_url.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
             ('DELETE FROM topic WHERE id = ?', req.params.id, function(err, result, field) {
                    if (err) throw err;
                    result.status(200).json({ message: 'Méssage supprimé !'});
                });
            });
        };
    });
};

// like management

exports.addTopicLike = (req, res, next) => {
    connection.query('SELECT * FROM topiclike LEFT OUTER JOIN topic ON topiclike.topic_id = topic.id LEFT OUTHER JOIN user ON topiclike.user_id = user.id WHERE = topic_id ', function(err, result, field){
        if (err) throw err;
        if (topiclike.like_topic == 1 ) {
            result.status(400).json({ message: 'Topic déjà liké !'});
        } else {
            ('INSERT INTO topiclike SET like_topic = 1', function(err, result, field) {
                if (err) throw err;
                result.status(200).json({ message: 'Topic liké !'})
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
    const record = [
        comment = escape(req.body.comment),
        image_url = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    ];
    connection.query('INSERT TO comment VALUE = ?', [record], function(err, result, field) {
        if (err) throw err;
        result.status(200).json({ message: 'Commentaire enregistré !'});
    });
};

exports.modifyComment = (req, res, next) => {
    const commentObject = req.file ? 
        {
            comment: escape(req.body.comment),
            image_url: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : {
            comment: escape(req.body.comment)
        };
    connection.query('SELECT user_id FROM comment WHERE id = ?', req.params.id, function(err, result, field) {
        if (err) throw err;
        if (userId === comment.user_id) {
            connection.query('UPDATE comment SET = ? WHERE = ?', [record], req.params.id, function(err, result, field) {
                if (err) throw err;
                result.status(200).json({ message: 'Commentaire modifié !'});
            });
        } else {
            result.status(401).json({ err: new Error ('Requête invalide !')});
        };
    });
};

exports.deleteComment = (req, res, next) => {
    connection.query('SELECT comment, user_id FROM comment WHERE id = ?', req.params.id, function(err, result, field){
        if (err) throw err;
        if (req.body.decodedToken.userId === comment.user_id) {
            const filename = comment.image_url.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                ('DELETE FROM comment WHERE id = ?', req.params.id, function(err, result, field) {
                    if (err) throw err;
                    result.status(200).json({ message: 'Commentaire supprimé !'});
                });
            });
        } else {
            result.status(401).json({ err: new Error ('Requête invalide !')});
        };
    });
};

exports.adminDeleteComment = (req, res, next) => {
    connection.query('SELECT isadmin FROM user WHERE id = ?', userId, function(err, result, field) {
        if (err) throw err;
        if (user.isadmin === 0) {
            result.status(403).json({ err: 'Vous n\'avez pas les droits d\'administrateur !'});
        } else {
            const filename = comment.image_url.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                ('DELETE FROM comment WHERE id = ?', req.params.id, function(err, result, field) {
                    if (err) throw err;
                    result.status(200).json({ message: 'Commentaire supprimé !'});
                });
            });
        };
    });
};