const express = require('express');
const router = express.Router();
const db = require('../db-connector');

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
router.post('/update', async (req, res) => {
  const { courseID, name } = req.body;
  await db.query('UPDATE Courses SET name = ? WHERE courseID = ?', [name, courseID]);
  res.redirect('/courses');
});


module.exports = router;
