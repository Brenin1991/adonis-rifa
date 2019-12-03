'use strict'

const User = use('App/Models/User')
const Hash = use('Hash')

class LoginController {
  showLoginForm ({ view }) {
    return view.render('auth.login', {title: `Login`})
  }

  async login ({ request, auth, session, response }) {
    // get form data
    const { email, password, remember } = request.all()

    // retrieve user base on the form data
    const user = await User.query()
      .where('email', email)
      .where('is_active', true)
      .first()

    if (user) {
      // verify password
      const passwordVerified = await Hash.verify(password, user.password)

      if (passwordVerified) {
        // login user
        await auth.remember(!!remember).login(user)

        return response.route('/')
      }
    }

    // display error message
    session.flash({
      notification: {
        type: 'danger',
        message: `Não foi possível verificar suas credenciais. Verifique se você confirmou seu endereço de e-mail.`
      }
    })

    return response.redirect('back')
  }
}

module.exports = LoginController
