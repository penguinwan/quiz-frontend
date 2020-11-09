const express = require('express')
const cors = require('cors')
const uuid = require('uuid')

const app = express()
app.use(cors());
app.use(express.json())
const port = 8080

app.post('/registration', (req, res) => {
  // res.sendStatus(500);
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
          { key: "a", value: "A"},
          { key: "b", value: "B" },
          { key: "c", value: "C" },
          { key: "d", value: "D" }
        ]
      },
      {
        id: "2",
        question: "efg",
        answers: [
          { key: "a", value: "A" },
          { key: "b", value: "B" },
          { key: "c", value: "C" },
          { key: "d", value: "D" }
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
          { key: "a", value: "A"},
          { key: "b", value: "B" },
          { key: "c", value: "C" },
          { key: "d", value: "D" }
        ]
      },
      {
        id: "4",
        question: "efg4",
        answers: [
          { key: "a", value: "A" },
          { key: "b", value: "B" },
          { key: "c", value: "C" },
          { key: "d", value: "D" }
        ]
      }
    ]
  }));
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})