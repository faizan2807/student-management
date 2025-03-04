const { error } = require('console');
const express = require('express');
const cors=require("cors")
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const port = 4000;
var mysql = require("mysql");
var db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '12345',
  database: 'college'
});

db.connect((err) => {
  if (!err) {
    console.log('records')
  } else {
    console.log('err massage');
  }
});

app.get("/", (req, res) => {
  res.send("server running successfuly")
})

app.get('/students', (req, res) => {
  const query = 'SELECT * FROM students';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});


app.post('/reg-students', (req, res) => {
  const { id, FirstName, LastName, Email, Mobile } = req.body;

  if (!id || !FirstName || !LastName || !Email || !Mobile) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  const query = 'INSERT INTO students (id, FirstName, LastName, Email, Mobile) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [id, FirstName, LastName, Email, Mobile], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Student registered successfully', student: { id, FirstName, LastName, Email, Mobile } });
  });
});


app.put('/update-std/:id', (req, res) => {
  const {id}= req.params;
  const { FirstName, LastName, Mobile, Email } = req.body;
 
  console.log(req.body)
  if (!id || !FirstName || !LastName || !Mobile || !Email) {
    return res.status(500).json({ error: 'error.message' })
  }
  const query = 'UPDATE students SET FirstName = ?, LastName = ?, Email = ?, Mobile = ? WHERE id ='+id;
  db.query(query, [FirstName, LastName, Email, Mobile, id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'An error occurred while updating the student' });
    }
    if (result.affectedRows === 0) {
      return res.status(400).json({error: `No student found with ID ${id}` });
    }
    res.status(200).json({ message: 'studetn update successfully', studetns: {id, FirstName, LastName, Email, Mobile} })
  });
});


app.delete('/delete-std/:id', (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: 'id are required' })
  }
  
  const query = 'DELETE FROM students WHERE id ='+ id;

  db.query(query, [id], (err, result) => {
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: `No student found with ID ${id}` });
    }

    res.status(204).json({ message: `Student with ID ${id} was deleted successfully` });
  });
});


app.listen(port, () => {
  console.log("server started: http://127.0.0.1:4000")
}) 