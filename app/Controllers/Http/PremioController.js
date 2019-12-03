'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Rifa = use('App/Models/Rifa')
const Bilhete = use('App/Models/Bilhete')
const Database = use('Database');
const User = use('App/Models/User')
const Tipo = use('App/Models/Tipo')
const Premio = use('App/Models/Premio')

/**
 * Resourceful controller for interacting with premios
 */
class PremioController {
  /**
   * Show a list of all premios.
   * GET premios
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
  }

  async sorteio ({ request, response, view }) {

  }

  /**
   * Render a form to be used for creating a new premio.
   * GET premios/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, params, response, view }) {
    const rifaId = params.id
    return view.render('admin.premio.create', {rifaId})
  }

  /**
   * Create/save a new premio.
   * POST premios
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const p = request.only(['rifaId', 'primeiro', 'segundo', 'terceiro'])
    const primeiro = {}
    const segundo = {}
    const terceiro = {}
    const rifa = await Rifa.find(request.input('rifaId'))


    primeiro.rifa_id = p.rifaId
    primeiro.descricao = p.primeiro
    primeiro.colocacao = 1

    segundo.rifa_id = p.rifaId
    segundo.descricao = p.segundo
    segundo.colocacao = 2

    terceiro.rifa_id = p.rifaId
    terceiro.descricao = p.terceiro
    terceiro.colocacao = 3

    await rifa.premios().createMany([
    primeiro,
    segundo,
    terceiro
  ])
    /*const newBilhete = new Bilhete()
    const rr = await Rifa.find(rifa.id)
    console.log(rr)

    newBilhete.numero = 1
    newBilhete.user_id = user.id
    const bilhete = await rr
    .bilhetes()
    .saveMany([newBilhete]) 
    /*/
    response.redirect('/rifa')  
  }

  /**
   * Display a single premio.
   * GET premios/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing premio.
   * GET premios/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update premio details.
   * PUT or PATCH premios/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a premio with id.
   * DELETE premios/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = PremioController
