'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TipoSchema extends Schema {
  up () {
    this.create('tipos', (table) => {
      table.increments()
      table.string('descricao', 45).notNullable()
      table.integer('numero_inicial').notNullable()
      table.integer('passo').notNullable()
      table.integer('quantidade_bilhetes').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('tipos')
  }
}

module.exports = TipoSchema
