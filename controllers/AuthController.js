const User = require('../models/User')

const bcrypt = require('bcryptjs')

module.exports = class AuthController{
  static async login(req, res){
    return res.render('auth/login')
  }
  static async register(req, res){
    return res.render('auth/register')
  }
  static async registerPost(req, res){
    const {name, email,password, confirmpassword} = req.body
    if(password != confirmpassword){
      req.flash('message', 'As senhas não conferem, tente novamente')
      return res.render('auth/register')
    }

    //validação de email
    //criptografar a senha
    //criar objeto usuario para cadastro do banco

    //try = inserir usuario no banco e trabalhar com sessao

  }

  static async logout(req, res){
    req.session.destroy()
    res.redirect('/login')
  }

}