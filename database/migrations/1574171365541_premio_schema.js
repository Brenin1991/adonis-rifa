'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PremioSchema extends Schema {
  up () {
    this.create('premios', (table) => {
      table.increments()
      table.integer('rifa_id').references('id').inTable('rifas').notNullable()
      table.string('descricao', 255).notNullable()
      table.integer('colocacao').notNullable()
      table.integer('bilhete_sorteado_id').references('id').inTable('bilhetes')
      table.timestamps()
    })
  }

  down () {
    this.drop('premios')
  }
}

module.exports = PremioSchema
