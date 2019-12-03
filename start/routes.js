'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use('Route')

Route.get('/', async ({ response }) => {
  response.redirect('/login')
})
Route.get('rifa', 'RifaController.index')
Route.get('rifa/create', 'RifaController.create')
Route.post('rifa/create', 'RifaController.store')
Route.get('rifa/todos', 'RifaController.todasRifas')
Route.get('rifa/:id', 'RifaController.show')
Route.get('rifa/delete/:id', 'RifaController.destroy')
Route.get('rifa/:id/edit', 'RifaController.edit')
Route.post('rifa/gerarBilhetes', 'RifaController.gerarBilhetes')
Route.get('tipo/create', 'TipoController.create')
Route.post('tipo/create', 'TipoController.store')
Route.get('bilhete/:id/buy', 'BilheteController.comprarRifa')
Route.get('rifa/:id/premio', 'PremioController.create')
Route.post('rifa/premio', 'PremioController.store')
Route.post('rifa/sorteio', 'PremioController.sorteio')


//auth
Route.get('register', 'Auth/RegisterController.showRegisterForm').middleware([
  'authenticated'
])
Route.post('register', 'Auth/RegisterController.register').as('register')
Route.get('register/confirm/:token', 'Auth/RegisterController.confirmEmail')
Route.get('login', 'Auth/LoginController.showLoginForm').middleware([
  'authenticated'
])
Route.post('login', 'Auth/LoginController.login').as('login')
Route.get('logout', 'Auth/AuthenticatedController.logout')
Route.get('password/reset', 'Auth/PasswordResetController.showLinkRequestForm')
Route.post('password/email', 'Auth/PasswordResetController.sendResetLinkEmail')
Route.get('password/reset/:token', 'Auth/PasswordResetController.showResetForm')
Route.post('password/reset', 'Auth/PasswordResetController.reset')
