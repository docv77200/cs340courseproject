const express = require('express');
const router = express.Router();
const db = require('../db-connector');

// GET: show sections with course and instructor dropdown data
router.get('/', async (req, res) => {
  try {
    const [sections] = await db.query(`
      SELECT Sections.sectionID, Courses.name AS courseName,
             Instructors.firstName, Instructors.lastName,
             Sections.building, Sections.roomNumber, Sections.schedule
      FROM Sections
      JOIN Courses ON Sections.courseID = Courses.courseID
      JOIN Instructors ON Sections.instructorID = Instructors.instructorID
    `);

    const [courses] = await db.query('SELECT * FROM Courses');
    const [instructors] = await db.query('SELECT * FROM Instructors');

    res.render('sections', { sections, courses, instructors });
  } catch (err) {
    console.error(err);
    res.status(500).send('DB Error');
  }
});

// POST: add a section
router.post('/add', async (req, res) => {
  const { courseID, instructorID, building, roomNumber, schedule } = req.body;
  await db.query(
    `INSERT INTO Sections (courseID, instructorID, building, roomNumber, schedule)
     VALUES (?, ?, ?, ?, ?)`,
    [courseID, instructorID, building, roomNumber, schedule]
  );
  res.redirect('/sections');
});

// DELETE
router.get('/delete/:id', async (req, res) => {
  await db.query('DELETE FROM Sections WHERE sectionID = ?', [req.params.id]);
  res.redirect('/sections');
});

module.exports = router;
