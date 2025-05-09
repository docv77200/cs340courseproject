/*
    SETUP
*/
const express = require('express');
const app = express();
const PORT = 4006;

const db = require('./db-connector');

// Handlebars
const exphbs = require('express-handlebars');

// Static Files
app.use(express.static('public'));

// Middleware for POST
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/*
    VIEW ENGINE
*/
app.engine('.hbs', exphbs.engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');

/*
    ROUTES
*/
const studentsRouter = require('./routes/students');
const coursesRouter = require('./routes/courses');
const sectionsRouter = require('./routes/sections');
const instructorsRouter = require('./routes/instructors');
const majorsRouter = require('./routes/majors');

app.use('/students', studentsRouter);
app.use('/courses', coursesRouter);
app.use('/sections', sectionsRouter);
app.use('/instructors', instructorsRouter);
app.use('/majors', majorsRouter);

// Default Home Page
app.get('/', (req, res) => {
    res.render('home'); // Add home.hbs in /views
});

// 404 handler
app.use((req, res) => {
    res.status(404).send('<h1>404: Page Not Found</h1>');
});

/*
    LISTENER
*/
app.listen(PORT, () => {
    console.log(`Server running at http://classwork.engr.oregonstate.edu:${PORT}`);
});
