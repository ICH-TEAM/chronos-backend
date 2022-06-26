import { Router } from 'express'
import passport from 'passport'

const Auth = Router()

Auth.route('/google')
    .get(passport.authenticate('google', {
        scope: ['profile'],
    }))

Auth.route('/google/redirect')
    .get(passport.authenticate('google', {failureRedirect: '/'}), (req, res) => {
        res.redirect('/api/users')
    })

export { Auth }