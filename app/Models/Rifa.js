'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Rifa extends Model {
	
  	premios () {
    	return this.hasMany('App/Models/Premio')
  	}

  	bilhetes () {
    	return this.hasMany('App/Models/Bilhete')
  	}
}

module.exports = Rifa
