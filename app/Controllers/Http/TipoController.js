'use strict'

const Rifa = use('App/Models/Rifa');
const Bilhete = use('App/Models/Bilhete');
const Database = use('Database');
const User = use('App/Models/User')
const Tipo = use('App/Models/Tipo')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with tipos
 */
class TipoController {
  /**
   * Show a list of all tipos.
   * GET tipos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    
  }

  /**
   * Render a form to be used for creating a new tipo.
   * GET tipos/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
    return view.render('admin.rifa.tipo')
  }

  /**
   * Create/save a new tipo.
   * POST tipos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const tipo = await await Database.table('tipos').insert({
      descricao: request.input('descricao'),
      quantidade_bilhetes: request.input('quantidade_bilhetes'),
      numero_inicial: request.input('numero_inicial'),
      passo: request.input('passo')
    })
  
    response.redirect('/rifa')
  }

  /**
   * Display a single tipo.
   * GET tipos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing tipo.
   * GET tipos/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update tipo details.
   * PUT or PATCH tipos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a tipo with id.
   * DELETE tipos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = TipoController
