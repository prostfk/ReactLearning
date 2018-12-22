CREATE TABLE users(
    id INT NOT NULL PRIMARY KEY,
    username NVARCHAR(50),
    password NVARCHAR(255),
    role NVARCHAR(20)
);
CREATE TABLE films (
    id INT NOT NULL PRIMARY KEY,
    title NVARCHAR(255),
    genre NVARCHAR(255),
    description TEXT,
    pathToFile NVARCHAR(255)
);

INSERT INTO users(username, password, role) VALUES ('admin', '$2b$10$406PIwsOB/tnPa5dn1VueuEvCMhLdURGBxdrZ4AUHpecSitRCuji6', 'ROLE_ADMIN');