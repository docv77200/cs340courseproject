import express from 'express';
import db from '../db-connector.js';

const router = express.Router();

// DISPLAY all enrollments
router.get('/', async (req, res) => {
  const [enrollments] = await db.query(`
    SELECT Enrollments.student_id, Enrollments.section_id,
           Students.first_name, Students.last_name,
           Courses.course_name, Sections.section_number
    FROM Enrollments
    JOIN Students ON Enrollments.student_id = Students.student_id
    JOIN Sections ON Enrollments.section_id = Sections.section_id
    JOIN Courses ON Sections.course_id = Courses.course_id
  `);

  const [students] = await db.query(`SELECT student_id, CONCAT(first_name, ' ', last_name) AS name FROM Students`);
  const [sections] = await db.query(`
    SELECT Sections.section_id, CONCAT(Courses.course_name, ' - Section ', section_number) AS label
    FROM Sections
    JOIN Courses ON Sections.course_id = Courses.course_id
  `);

  res.render('enrollments', { enrollments, students, sections });
});

// INSERT new enrollment
router.post('/add', async (req, res) => {
  const { student_id, section_id } = req.body;
  await db.query('INSERT INTO Enrollments (student_id, section_id) VALUES (?, ?)', [student_id, section_id]);
  res.redirect('/enrollments');
});

// DELETE an enrollment
router.get('/delete', async (req, res) => {
  const { student_id, section_id } = req.query;
  await db.query('DELETE FROM Enrollments WHERE student_id = ? AND section_id = ?', [student_id, section_id]);
  res.redirect('/enrollments');
});

export default router;
