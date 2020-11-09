const express = require('express')
const cors = require('cors')
const uuid = require('uuid')

const app = express()
app.use(cors());
app.use(express.json())
const port = 8080

app.post('/registration', (req, res) => {
  res.send(JSON.stringify({
    sessionid: uuid.v4()
  }))
})

app.get('/batch/1/questions', (req, res) => {
  res.send(JSON.stringify({
    questions: [
      {
        id: "1",
        question: "abc",
        answers: [
          { key: "a", value: "i am a"},
          { key: "b", value: "i am b" },
          { key: "c", value: "i am c" },
          { key: "d", value: "i am d" }
        ]
      },
      {
        id: "2",
        question: "efg",
        answers: [
          { key: "a", value: "i am a" },
          { key: "b", value: "i am b" },
          { key: "c", value: "i am c" },
          { key: "d", value: "i am d" }
        ]
      }
    ]
  }));
})

app.get('/batch/2/questions', (req, res) => {
  res.send(JSON.stringify({
    questions: [
      {
        id: "3",
        question: "abc3",
        answers: [
          { key: "a", value: "i am a"},
          { key: "b", value: "i am b" },
          { key: "c", value: "i am c" },
          { key: "d", value: "i am d" }
        ]
      },
      {
        id: "4",
        question: "efg4",
        answers: [
          { key: "a", value: "i am a" },
          { key: "b", value: "i am b" },
          { key: "c", value: "i am c" },
          { key: "d", value: "i am d" }
        ]
      }
    ]
  }));
})

app.post('/batch/*/answers', (req, res) => {
  console.log(JSON.stringify(req.body));
  res.sendStatus(200);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})