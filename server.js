/*
    SETUP
*/
const express = require('express');
const app = express();
const PORT = 3036;

const db = require('./db-connector');

// Handlebars setup
const exphbs = require('express-handlebars');

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// View engine config
app.engine('handlebars', exphbs.engine({
    extname: '.handlebars',
    defaultLayout: 'main',
    layoutsDir: 'views/layouts',
    helpers: {
      ifCond: function (v1, operator, v2, options) {
        switch (operator) {
          case '==': return (v1 == v2) ? options.fn(this) : options.inverse(this);
          case '===': return (v1 === v2) ? options.fn(this) : options.inverse(this);
          case '!=': return (v1 != v2) ? options.fn(this) : options.inverse(this);
          default: return options.inverse(this);
        }
      }
    }
  }));
/*
    ROUTES
*/
const studentsRouter = require('./routes/students');
const coursesRouter = require('./routes/courses');
const sectionsRouter = require('./routes/sections');
const instructorsRouter = require('./routes/instructors');
const majorsRouter = require('./routes/majors');
const enrollmentsRouter = require('./routes/enrollments');

app.use('/students', studentsRouter);
app.use('/courses', coursesRouter);
app.use('/sections', sectionsRouter);
app.use('/instructors', instructorsRouter);
app.use('/majors', majorsRouter);
app.use('/enrollments', enrollmentsRouter);

// Home route
app.get('/', (req, res) => {
    res.render('home'); // views/home.hbs
});
//reset route
app.get('/reset-db', async (req, res) => {
  try {
    await db.query('CALL sp_reset_db();');
    res.redirect('/');
  } catch (err) {
    console.error('RESET DB Error:', err);
    res.status(500).send('DB reset failed.');
  }
});


/*
    START SERVER
*/
app.listen(PORT, () => {
    console.log(`✅ Server running locally at http://localhost:${PORT}`);
});
