'use strict'

const Rifa = use('App/Models/Rifa')
const Bilhete = use('App/Models/Bilhete')
const Database = use('Database');
const User = use('App/Models/User')
const Tipo = use('App/Models/Tipo')
const Premio = use('App/Models/Premio')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with rifas
 */
class RifaController {
  /**
   * Show a list of all rifas.
   * GET rifas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view, auth }) {
    const id = auth.user.id
    const rifas = (await Database.select('*').from('rifas').where('user_id', id))
    const subquery = Database.from('bilhetes').where('user_id', id).select('rifa_id')
    const rifasCompradas = (await Database.select('*').from('rifas').whereIn('id', subquery))

    console.log(rifasCompradas)
    return view.render('admin.home', {rifas, rifasCompradas})
  }

  async create ({ request, response, view }) {

    return view.render('admin.rifa.create')
  }

  /**
   * Create/save a new rifa.
   * POST rifas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, auth, response }) {
    const r = request.only(['titulo', 'descricao', 'preco', 'data_provavel_sorteio', 'data_inicio_venda', 'data_fim_venda'])
    console.log(r)
    const user = await User.find(auth.user.id)
    const tipo = await Tipo.find(1)
    const newRifa = new Rifa()

    newRifa.tipo_id = tipo.id
    newRifa.titulo = r.titulo
    newRifa.descricao = r.descricao
    newRifa.data_provavel_sorteio = r.data_provavel_sorteio
    newRifa.data_inicio_venda = r.data_inicio_venda
    newRifa.data_fim_venda = r.data_fim_venda
    newRifa.valor_bilhete = r.preco
    const rifa = await user
    .rifas()
    .saveMany([newRifa])

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
   * Display a single rifa.
   * GET rifas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, auth, view}) {
    const id = params.id
    const userId = auth.user.id
    const rifa = await Rifa.find(params.id)
    const bilhetes = await Database.select('*').from('bilhetes').where('rifa_id', id).whereNull('user_id')
    const bilhetesIndisponiveis = await Database.select('*').from('bilhetes').where('rifa_id', id).whereNotNull('user_id')
    const bilhetesComprados = await Database.select('*').from('bilhetes').where('rifa_id', id).where('user_id', userId)
    const premios = await Database.select('*').from('premios').where('rifa_id', id)
    const tipos = await Database.select('*').from('tipos');
    const investimento = bilhetesComprados.length * rifa.valor_bilhete
    let isAdmin = false

    if(rifa.user_id == userId){
      isAdmin = true
    }

    return view.render('admin.rifa.show', {isAdmin, premios, rifa, bilhetes, bilhetesComprados, bilhetesIndisponiveis, tipos, investimento})
  }

  async gerarBilhetes ({ request, params, auth, response}) {
    const newBilhete = {}
    const userId = auth.user.id
    const rifa = await Rifa.find(request.input('rifa_id'))
    const tipo_id = request.input('tipo')
    const tipo = await Tipo.find(tipo_id)

    for(let i = tipo.numero_inicial; i < tipo.quantidade_bilhetes; i++){
      newBilhete.numero = i * tipo.passo
      await rifa
      .bilhetes()
      .create(newBilhete)
    }
      
    response.redirect(`/rifa/${request.input('rifa_id')}`)  
  }

  async gerarTipo ({ request, params, auth, response}) {
    const t = request.only(['quantidade_bilhetes', 'numero_inicial', 'passo'])
    
    tipo.numero_inicial = t.numero_inicial
    tipo.quantidade_bilhetes = t.quantidade_bilhetes
    tipo.passo = t.passo

    await rifa.tipo().create(tipo)
      
    response.redirect(`/rifa/${id}`)  
  }

  async todasRifas ({ request, response, view, auth }) {
    const id = auth.user.id
    const rifas = (await Database.select('*').from('rifas').whereNot('user_id', id))
    
    return view.render('admin.rifa.all', {rifas})
  }

  /**
   * Render a forsm to update an existing rifa.
   * GET rifas/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update rifa details.
   * PUT or PATCH rifas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a rifa with id.
   * DELETE rifas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = RifaController
