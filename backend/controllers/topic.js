const mysql = require('mysql');
const fs = require('fs');

const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'groupomania'
});

exports.createTopic = (req, res, next) => {
    let record = [
        title = escape(req.body.title),
        topic = escape(req.body.topic),
        image_url = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    ];
    connection.query('INSERT INTO `topic` VALUE=?',[record],function(err, result, field) {
        if (err) throw err;
        result.status(201).json({ message: 'Méssage enregitrée !'});
    });
};

exports.getAllTopic = (req, res, next) => {
    connection.query('SELECT * FROM `topic`',function(err, result, field) {
        if (err) throw err;
        result.status(200).json(topics)
    });
};

exports.getOneTopic = (req, res, next) => {
    id = req.params.id;
    connection.query('SELECT `topic` FROM `topic` WHERE = ?', id, function(err, result, field) {
        if (err) throw err;
        result.status(200).json(topic)
    });
};

exports.modifyTopic = (req, req, next) => {
    const topicObject = req.file ?
        { record = [
            title = escape(req.body.title),
            topic = escape(req.body.topic),
            image_url = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        ] } : { record = [
            title = escape(req.body.title),
            topic = escape(req.body.topic)
        ]};
    id = req.params.id
    connection.query('UPDATE `topic` SET = ? WHERE =?', [record] , id, function(err, result, field) {
        if (err) throw err
        result.status(200).json({ message: 'Méssage modifié !'});
    });
};

exports.deleteTopic = (req, res, next) => {
    id = req.params.id;
    connection.query('SELECT `topic` FROM `topic` WHERE = ?', id, function(err, result, field) {
        if (err) throw err;
        const filename = topic.image_url.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
            ('DELETE FROM `topic` WHERE `id`= ?', id, function(err, result, field) {
                if (err) throw err;
                result.status(200).json({ message: 'Méssage modifié !'});
            });
        });
    });
};