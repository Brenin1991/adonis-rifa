'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BilheteSchema extends Schema {
  up () {
    this.create('bilhetes', (table) => {
      table.increments()
      table.integer('rifa_id').references('id').inTable('rifas').notNullable()
      table.integer('user_id').references('id').inTable('users')
      table.integer('numero').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('bilhetes')
  }
}

module.exports = BilheteSchema
