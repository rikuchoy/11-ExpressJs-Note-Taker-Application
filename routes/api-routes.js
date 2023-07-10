const fs = require('fs');

module.exports = function(app) {
    app.get('/api/notes', (req, res) => {
        fs.readFile('./db/db.json', (err, data) => {
            if (err) throw err;
            res.json(JSON.parse(data));
        });
    });
    app.post('/api/notes', (req, res) => {
        fs.readFile('./db/db.json', (err, data) => {
            if (err) throw err;
            let notes = JSON.parse(data);
            let newNote = req.body;
            newNote.id = notes.length + 1;
            notes.push(newNote);
            fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
                if (err) throw err;
                res.json(newNote);
            });
        });
    });
    app.delete('/api/notes/:id', (req, res) => {
        fs.readFile('./db/db.json', (err, data) => {
            if (err) throw err;
            let notes = JSON.parse(data);
            let newNotes = notes.filter(note => note.id != req.params.id);
            fs.writeFile('./db/db.json', JSON.stringify(newNotes), (err) => {
                if (err) throw err;
                res.json(newNotes);
            });
        });
    });
}
