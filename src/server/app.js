const express = require('express')
const app = express()
const path = require('path')
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
  const uploadFolder = path.join(__dirname, 'static/images/')

  form.parse(req, (error, fields, { fileUpload }) => {
    if (error) {
      console.error(error)

      return
    }

    fs.writeFileSync(uploadFolder + fileUpload.originalFilename, fs.readFileSync(fileUpload.filepath))

    // res.writeHead(200, { 'Content-Type': 'text/plain' })
    return res.status(200).json({
      status: 'success',
      message: 'File uploaded successfully!'
    })
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
