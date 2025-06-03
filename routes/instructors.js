const express = require('express');
const router = express.Router();
const db = require('../db-connector');

router.get('/', async (req, res) => {
  const [instructors] = await db.query('SELECT * FROM Instructors');
  res.render('instructors', { instructors });
});

router.post('/add', async (req, res) => {
  const { firstName, lastName, department, email } = req.body;
  await db.query(
    'INSERT INTO Instructors (firstName, lastName, department, email) VALUES (?, ?, ?, ?)',
    [firstName, lastName, department, email]
  );
  res.redirect('/instructors');
});

router.get('/delete/:id', async (req, res) => {
  await db.query('DELETE FROM Instructors WHERE instructorID = ?', [req.params.id]);
  res.redirect('/instructors');
});

router.post('/update', async (req, res) => {
  const { instructorID, firstName, lastName, department, email } = req.body;
  await db.query(
    `UPDATE Instructors SET firstName = ?, lastName = ?, department = ?, email = ? WHERE instructorID = ?`,
    [firstName, lastName, department, email, instructorID]
  );
  res.redirect('/instructors');
});


module.exports = router;
