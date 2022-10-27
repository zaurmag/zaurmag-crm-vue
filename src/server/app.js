const express = require('express')
const app = express()
const consola = require('consola')
const fs = require('fs')
const formidable = require('formidable')
const cors = require('cors')

const host = '127.0.0.1'
const port = 2222

app.use(cors({
  origin: ['http://localhost:8080']
}))

app.post('/api/upload', (req, res) => {
  console.log('BEGIN /upload')
  const form = formidable({ multiples: false })

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.log(err)
      return
    }
    // const theFile = files.filepond.path
    console.log('theFile: ' + files.filepond)

    // res.writeHead(200, { 'Content-Type': 'text/plain' })
    // res.end(theFile)
  })
})

app.use(express.urlencoded({ extended: true }))

app.post('/api/save', function (req, res) {
  console.log(`req: ${JSON.stringify(req.body)}`)

  const fileData = fs.readFileSync(req.body.filepond)
  console.log(fileData)
})

app.listen(port, host, () => {
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
})

module.exports = app
