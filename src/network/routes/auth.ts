import { NextFunction, Router } from 'express'
import { response } from 'network/response'
import { UserService } from 'services'
import { loginUserSchema } from 'schemas'
import passport from 'passport'
import { validatorCompiler } from './utils'

const Auth = Router()

Auth.route('/google')
    .get(passport.authenticate('google', {
        scope: ['profile'],
    }))

Auth.route('/google/redirect')
    .get(passport.authenticate('google', {failureRedirect: '/'}), (req, res) => {
        res.redirect('/api/users')
    })

Auth.route('/register')

Auth.route('/login')
    .post(
        validatorCompiler(loginUserSchema, 'body'), 
        async(
            req: CustomRequest,
            res: CustomResponse,
            next: NextFunction
        ): Promise<void> => {
            try {
                const {
                    body: { args }
                } = req
                const us = new UserService({userCredentials: args})
                const result = await us.process({ type : 'login'})

                response({ error: false, message: result, res, status: 201 })
            } catch (error) {
                next(error)
            }
        })
    
export { Auth }