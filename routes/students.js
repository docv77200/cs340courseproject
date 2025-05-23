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

router.post('/update', async (req, res) => {
  const { student_id, first_name, last_name, email, standing } = req.body;

  const updateQuery = `
    UPDATE Students
    SET first_name = ?, last_name = ?, email = ?, class_standing = ?
    WHERE student_id = ?
  `;

  try {
    await db.pool.query(updateQuery, [first_name, last_name, email, standing, student_id]);
    res.redirect('/students');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating student');
  }
});

router.get('/delete/:id', async (req, res) => {
  await db.query('DELETE FROM Students WHERE studentID = ?', [req.params.id]);
  res.redirect('/students');
});

app.get('/delete-demo-student', async (req, res) => {
  try {
    await db.query('CALL sp_delete_demo_student();');
    res.redirect('/students');
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to delete demo student');
  }
});

module.exports = router;
