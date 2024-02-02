import { Router } from 'express';
import { usuariosModelo } from '../dao/models/users.model.js';
import { creaHash } from '../utils.js';
import { validaPassword } from '../utils.js';
// import crypto from 'crypto'
import passport from 'passport';
import { Session } from 'express-session';
import { SessionsController } from '../controllers/session.controller.js';

export const router = Router()

router.get('/github', passport.authenticate('github', {}), (req, res) => { })

router.get('/callbackGithub', passport.authenticate('github', { failureRedirect: "/api/sessions/errorGithub" }), (req, res) => {

    console.log(req.user)
    req.session.ususario = req.user
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({
        message: "Acceso OK", usuario: req.user

    });

});

router.get('/errorGithub', (req, res) => {

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({
        error: "Error al autenticar con Github"
    });
})

router.get('/errorLogin', (req, res) => {
    return res.redirect('/login?error=Error en el proceso de login')
})

router.post('/login', passport.authenticate('login', { failureRedirect: '/api/sessions/errorLogin' }), SessionsController.login)

router.get('/errorRegistro', (req, res) => {
    return res.redirect('/register?error=Error en el proceso de registro')
})

router.post('/register', passport.authenticate('registro', { failureRedirect: '/api/sessions/errorRegistro' }), SessionsController.register)

router.get('/logout', (req, res) => {
    req.session.destroy(error => {
        if (error) {
            return res.redirect('/?error=Error al cerrar sesión')
        }
        res.redirect('/login')
    })
})