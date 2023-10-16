const Tought = require('../models/Tought')
const User = require('../models/User')

module.exports = class ThoughtController {

  static async showToughts(req, res){
    return res.render('toughts/home')
  }
}
