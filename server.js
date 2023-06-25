const PORT = process.env.PORT || 2999;
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

let notes = require('./db/db.json');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
  const slicedNotes = notes.slice(1);
  res.json(slicedNotes);
});

app.get('/', (req, res) => {
  const indexPath = path.join(__dirname, './public/index.html');
  res.sendFile(indexPath);
});

app.get('/notes', (req, res) => {
  const notesPath = path.join(__dirname, './public/notes.html');
  res.sendFile(notesPath);
});

app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, './public/index.html');
  res.sendFile(indexPath);
});

function createNewNote(body, notesArr) {
  const newNote = { ...body };
  const newNotesArr = Array.isArray(notesArr) ? notesArr : [];

  if (newNotesArr.length === 0) {
    newNotesArr.push(0);
  }

  newNote.id = newNotesArr[0];
  newNotesArr[0]++;

  newNotesArr.push(newNote);

  const dbPath = path.join(__dirname, './db/db.json');
  fs.writeFileSync(dbPath, JSON.stringify(newNotesArr, null, 2));

  return newNote;
}

app.post('/api/notes', (req, res) => {
  const newNote = createNewNote(req.body, notes);
  notes = require('./db/db.json'); // Refresh the notes array after updating
  res.json(newNote);
});

function deleteNote(id, notesArr) {
  const updatedNotesArr = notesArr.filter(note => note.id != id);

  fs.writeFileSync(
    path.join(__dirname, './db/db.json'),
    JSON.stringify(updatedNotesArr, null, 2)
  );
}

app.delete('/api/notes/:id', (req, res) => {
  const { id } = req.params;
  deleteNote(id, notes);
  notes = require('./db/db.json'); // Refresh the notes array after updating
  res.json(true);
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
