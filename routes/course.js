const express = require('express');
const router = express.Router();
const db = require('../db/db-connect');

router.get('/', async (req, res) => {
  const [courses] = await db.query('SELECT * FROM Courses');
  res.render('courses', { courses });
});

router.post('/add', async (req, res) => {
  const { name } = req.body;
  await db.query('INSERT INTO Courses (name) VALUES (?)', [name]);
  res.redirect('/courses');
});

router.get('/delete/:id', async (req, res) => {
  await db.query('DELETE FROM Courses WHERE courseID = ?', [req.params.id]);
  res.redirect('/courses');
});

module.exports = router;
