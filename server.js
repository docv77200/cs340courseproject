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
    layoutsDir: 'views/layouts'
}));
app.set('view engine', 'handlebars');
app.set('views', './views'); // ensure your views are under /views

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


/*
    START SERVER
*/
app.listen(PORT, () => {
    console.log(`✅ Server running locally at http://localhost:${PORT}`);
});
