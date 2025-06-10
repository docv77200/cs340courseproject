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
// delete
router.get('/delete/:id', async (req, res) => {
  const instructorID = req.params.id;

  try {
    // Check if instructor is assigned to any sections
    const [[{ count }]] = await db.query(
      'SELECT COUNT(*) AS count FROM Sections WHERE instructorID = ?',
      [instructorID]
    );

    if (count > 0) {
      // Render a page or redirect with a user-friendly error
      return res.status(400).send(
        'Instructor is attached to one or more sections. Please update those sections before deleting this instructor.'
      );
    }

    // If safe, proceed with delete
    await db.query('DELETE FROM Instructors WHERE instructorID = ?', [instructorID]);
    res.redirect('/instructors');

  } catch (err) {
    console.error('Delete instructor failed:', err);
    res.status(500).send('Server error while attempting to delete instructor.');
  }
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
