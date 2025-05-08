SET FOREIGN_KEY_CHECKS = 0;
SET AUTOCOMMIT = 0;

DROP TABLE IF EXISTS Enrollments;
DROP TABLE IF EXISTS StudentMajors;
DROP TABLE IF EXISTS Sections;
DROP TABLE IF EXISTS Courses;
DROP TABLE IF EXISTS Instructors;
DROP TABLE IF EXISTS Majors;
DROP TABLE IF EXISTS Students;

CREATE TABLE Students (
  studentID      INT UNSIGNED AUTO_INCREMENT,
  firstName      VARCHAR(50)  NOT NULL,
  lastName       VARCHAR(50)  NOT NULL,
  classStanding  ENUM('Freshman','Sophomore','Junior','Senior') NOT NULL,
  email          VARCHAR(100) NOT NULL UNIQUE,
  PRIMARY KEY (studentID)
);

CREATE TABLE Majors (
  majorID INT UNSIGNED AUTO_INCREMENT,
  name    VARCHAR(100) NOT NULL,
  PRIMARY KEY (majorID)
);

CREATE TABLE Instructors (
  instructorID INT UNSIGNED AUTO_INCREMENT,
  firstName    VARCHAR(50)  NOT NULL,
  lastName     VARCHAR(50)  NOT NULL,
  department   VARCHAR(100) NOT NULL,
  email        VARCHAR(100) NOT NULL UNIQUE,
  PRIMARY KEY (instructorID)
);

CREATE TABLE Courses (
  courseID INT UNSIGNED AUTO_INCREMENT,
  name     VARCHAR(150) NOT NULL,
  PRIMARY KEY (courseID)
);

CREATE TABLE Sections (
  sectionID    INT UNSIGNED AUTO_INCREMENT,
  courseID     INT UNSIGNED NOT NULL,
  instructorID INT UNSIGNED NOT NULL,
  building     VARCHAR(50)  NOT NULL,
  roomNumber   VARCHAR(20)  NOT NULL,
  schedule     VARCHAR(50)  NOT NULL,
  PRIMARY KEY (sectionID),
  FOREIGN KEY (courseID)     REFERENCES Courses(courseID)
      ON UPDATE CASCADE ON DELETE RESTRICT,
  FOREIGN KEY (instructorID) REFERENCES Instructors(instructorID)
      ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE TABLE StudentMajors (
  studentID INT UNSIGNED NOT NULL,
  majorID   INT UNSIGNED NOT NULL,
  PRIMARY KEY (studentID, majorID),
  FOREIGN KEY (studentID) REFERENCES Students(studentID)
      ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (majorID)   REFERENCES Majors(majorID)
      ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE TABLE Enrollments (
  enrollmentID INT UNSIGNED AUTO_INCREMENT,
  studentID    INT UNSIGNED NOT NULL,
  sectionID    INT UNSIGNED NOT NULL,
  date         DATE         NOT NULL,
  PRIMARY KEY (enrollmentID),
  FOREIGN KEY (studentID) REFERENCES Students(studentID)
      ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (sectionID) REFERENCES Sections(sectionID)
      ON UPDATE CASCADE ON DELETE CASCADE
);

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

SET FOREIGN_KEY_CHECKS = 1;
COMMIT;
