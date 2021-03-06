\c :database;

-- drop table coauthor;

CREATE TABLE coauthor (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP NOT NULL DEFAULT timezone('UTC', now()),

  user_id INTEGER REFERENCES "user" (id) NOT NULL,
  course_id INTEGER REFERENCES course (id) ON DELETE CASCADE NOT NULL,

  unique (user_id, course_id)
);
