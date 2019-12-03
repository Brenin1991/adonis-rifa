'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RifaSchema extends Schema {
  up () {
    this.create('rifas', (table) => {
      table.increments()
      table.integer('user_id').references('id').inTable('users').notNullable()
      table.integer('tipo_id').references('id').inTable('tipos').notNullable()
      table.string('titulo', 45).notNullable()
      table.string('descricao', 255)
      table.datetime('data_provavel_sorteio').notNullable()
      table.datetime('data_inicio_venda').notNullable()
      table.datetime('data_fim_venda').notNullable()
      table.datetime('data_sorteio')
      table.double('valor_bilhete').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('rifas')
  }
}

module.exports = RifaSchema
