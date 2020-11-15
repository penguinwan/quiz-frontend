const express = require('express')
const cors = require('cors')
const uuid = require('uuid')

const app = express()
app.use(cors());
app.use(express.json())
const port = 8080

app.post('/participants', (req, res) => {
  res.send(JSON.stringify({
    session_id: uuid.v4(),
    nickname: req.body.nickname
  }))
})

app.get('/batches/abc', (req, res) => {
  res.send(JSON.stringify({
    questions: [
      {
        id: "1",
        question: "abqqqqqqqqqqq qqqqqqqqqqq qqqqqqqqqq qqqqqq qqqqqqqqqqq qqqqqqqqqqq qqqqq qqqqqq qqq qqqqq qqqqq qqqqq qqq qqq",
        correct: "b",
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
        correct: "c",
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

app.get('/batches/ghc', (req, res) => {
  res.send(JSON.stringify({
    questions: [
      {
        id: "1",
        question: "abc3",
        correct: "d",
        answers: [
          { key: "a", value: "i am a"},
          { key: "b", value: "i am b" },
          { key: "c", value: "i am c" },
          { key: "d", value: "i am d" }
        ]
      },
      {
        id: "2",
        question: "efg4",
        correct: "a",
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

app.post('/answers', (req, res) => {
  console.log(JSON.stringify(req.body));
  res.sendStatus(200);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})