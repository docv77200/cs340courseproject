const express = require('express');
const router = express.Router();
const db = require('../db-connector');

router.get('/', async (req, res) => {
  const [majors] = await db.query('SELECT * FROM Majors');
  res.render('majors', { majors });
});

router.post('/add', async (req, res) => {
  const { name } = req.body;
  await db.query('INSERT INTO Majors (name) VALUES (?)', [name]);
  res.redirect('/majors');
});

router.get('/delete/:id', async (req, res) => {
  await db.query('DELETE FROM Majors WHERE majorID = ?', [req.params.id]);
  res.redirect('/majors');
});

module.exports = router;
