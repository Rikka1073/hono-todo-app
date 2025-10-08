DROP TABLE IF EXISTS Todos;
CREATE TABLE IF NOT EXISTS Todos (id INTEGER PRIMARY KEY, title TEXT, completed BOOLEAN);
INSERT INTO Todos (id, title, completed) VALUES (1, 'Buy milk', false), (2, 'Walk the dog', true), (3, 'Do laundry', false);