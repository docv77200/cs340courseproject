const express = require('express');
const db = require('../db-connector.js');
const router = express.Router();

// DISPLAY all enrollments
router.get('/', async (req, res) => {
  try {
    const [enrollments] = await db.query(`
      SELECT 
        e.enrollmentID,
        e.studentID,
        e.sectionID,
        s.firstName,
        s.lastName,
        c.name AS courseName,
        sec.schedule AS sectionNumber
      FROM Enrollments e
      JOIN Students s ON e.studentID = s.studentID
      JOIN Sections sec ON e.sectionID = sec.sectionID
      JOIN Courses c ON sec.courseID = c.courseID
    `);

    const [students] = await db.query(`
      SELECT studentID, CONCAT(firstName, ' ', lastName) AS name FROM Students
    `);

    const [sections] = await db.query(`
      SELECT sec.sectionID, CONCAT(c.name, ' - Section ', sec.sectionID) AS label
      FROM Sections sec
      JOIN Courses c ON sec.courseID = c.courseID
    `);

    res.render('enrollments', { enrollments, students, sections });
  } catch (err) {
    console.error('Error fetching enrollments:', err);
    res.status(500).send('Server error while fetching enrollments.');
  }
});

// ADD enrollment
router.post('/add', async (req, res) => {
  const { student_id, section_id } = req.body;

  try {
    await db.query(
      'INSERT INTO Enrollments (studentID, sectionID, date) VALUES (?, ?, CURDATE())',
      [student_id, section_id]
    );
    res.redirect('/enrollments');
  } catch (err) {
    console.error('Error adding enrollment:', err);
    res.status(500).send('Error adding enrollment.');
  }
});

// UPDATE enrollment
router.post('/update', async (req, res) => {
  const { enrollmentID, studentID, sectionID } = req.body;

  try {
    await db.query(
      'UPDATE Enrollments SET studentID = ?, sectionID = ? WHERE enrollmentID = ?',
      [studentID, sectionID, enrollmentID]
    );
    res.redirect('/enrollments');
  } catch (err) {
    console.error('Error updating enrollment:', err);
    res.status(500).send('Error updating enrollment.');
  }
});

// DELETE enrollment
router.get('/delete', async (req, res) => {
  const { student_id, section_id } = req.query;

  try {
    await db.query(
      'DELETE FROM Enrollments WHERE studentID = ? AND sectionID = ?',
      [student_id, section_id]
    );
    res.redirect('/enrollments');
  } catch (err) {
    console.error('Error deleting enrollment:', err);
    res.status(500).send('Error deleting enrollment.');
  }
});

module.exports = router;
