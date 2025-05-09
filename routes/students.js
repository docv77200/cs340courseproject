const express = require('express');
const router = express.Router();
const db = require('../db-connector');

router.get('/', async (req, res) => {
  const [students] = await db.query('SELECT * FROM Students');
  res.render('students', { students });
});

router.post('/add', async (req, res) => {
  const { firstName, lastName, classStanding, email } = req.body;
  await db.query(
    'INSERT INTO Students (firstName, lastName, classStanding, email) VALUES (?, ?, ?, ?)',
    [firstName, lastName, classStanding, email]
  );
  res.redirect('/students');
});

router.get('/delete/:id', async (req, res) => {
  await db.query('DELETE FROM Students WHERE studentID = ?', [req.params.id]);
  res.redirect('/students');
});

module.exports = router;
