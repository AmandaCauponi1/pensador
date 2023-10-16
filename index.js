const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')


const app = express()
const door = 3333

const conn = require('./db/conn')



// Import Models
const Tought = require('./models/Tought')
const User = require('./models/User')

// Import Routes
const toughtsRoutes = require('./routes/toughtsRoutes')
const authRoutes = require('./routes/authRoutes')

//Import Controlles
const ThoughtController = require('./controllers/ToughtController')
const AuthController = require('./controllers/AuthController')

// Configurar engine
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

// Configurar JSON
app.use(express.urlencoded({
  extended: true
}))
app.use(express.json())

// Middleware para sessions
app.use(session({
  name: 'session',
  secret: 'nosso_secret',//Quanto maior a crypto melhor
  resave: false,
  saveUninitialized: false,
  store: new FileStore({
    logFn: function (){},
    path: require('path').join(require('os').tmpdir(), 'sessions')
  }),
  cookie:{
    secure: false,
    maxAge: 360000,
    expires: new Date(Date.now() + 360000),
    httpOnly: true
  }

}))

// Importar as flashs
app.use(flash())
// Importar arquivos estaticos

app.use(express.static('public'))
// Armazenar as sessões nas rotas
app.use((req, res, next)=> {
  if(req.session.userId){
    res.locals.session = req.session
  }
  next()
})
// Rotas
app.use('/toughts', toughtsRoutes)
app.use('/', authRoutes)


app.get('/', ThoughtController.showToughts)

// Conexão e criação das tabelas do banco
conn
.sync({force: true})
.then(() => {
  app.listen(3333)
})
.catch((err) => console.log(err))
