INSERT INTO Students (studentID, firstName, lastName, classStanding, email) VALUES
    (1001, 'Alice', 'Daniels', 'Sophomore', 'alice@oregonstate.edu'),
    (1002, 'Ben',   'Morris',  'Junior',    'bmorris@oregonstate.edu'),
    (1003, 'Carla', 'Lee',     'Freshman',  'carla.lee@oregonstate.edu'),
    (1004, 'Diego', 'Patel',   'Senior',    'dpatel@oregonstate.edu');

    INSERT INTO Majors (majorID, name) VALUES
    (10, 'Computer Science'),
    (20, 'Biology'),
    (30, 'Mathematics');

    INSERT INTO StudentMajors (studentID, majorID) VALUES
    (1001, 10),
    (1002, 20),
    (1003, 10),
    (1004, 30);

    INSERT INTO Instructors (instructorID, firstName, lastName, department, email) VALUES
    (500, 'Kim', 'Nguyen',   'CS',     'knguyen@oregonstate.edu'),
    (510, 'Ana', 'Carvalho', 'Biology','acarvalho@oregonstate.edu'),
    (520, 'Sam', 'Bennett',  'Math',   'sbennett@oregonstate.edu');

    INSERT INTO Courses (courseID, name) VALUES
    (161, 'Intro to CS'),
    (251, 'Calculus I'),
    (211, 'General Biology I');

    INSERT INTO Sections (sectionID, courseID, instructorID, building, roomNumber, schedule) VALUES
    (3101, 161, 500, 'KECH', '210', 'MWF 10-10:50'),
    (3102, 211, 510, 'ALS',  '4001','MWF 11-11:50'),
    (3104, 251, 520, 'KIDD', '108', 'TR 09-10:50');

    INSERT INTO Enrollments (enrollmentID, studentID, sectionID, date) VALUES
    (9001, 1001, 3101, '2025-01-08'),
    (9002, 1001, 3104, '2025-01-09'),
    (9003, 1002, 3102, '2025-01-08'),
    (9004, 1003, 3101, '2025-01-08');
