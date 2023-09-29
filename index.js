const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')


const app = express()
const door = 3333

const conn = require('./db/conn')

app.listen(door, () => {
  console.log(`Rodando na porta ${door}`)
})