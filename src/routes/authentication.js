const express = require('express');
const router = express.Router();
const pool = require('../database');
const passport = require('passport');



router.get('/add', (req,res) =>{
    res.render('links/add');
});

router.get('/registrarEvento', (req,res) =>{
    res.render('links/RegistrarEvento');
});



router.post('/add', async (req,res) =>{
    
    const {nombrep, edadp, eps, anioingres} = req.body;
    const NewEvento = {
        nombrep,
        edadp,
        eps,
        anioingres
    };


    await pool.query('INSERT INTO evento set ?', [NewEvento]);
    res.send('Received');
});

router.post('/RegistrarEvento', async (req,res) =>{
    
    const {nombre, fechai, fechaf, descrp, tipodeEvento, imagen} = req.body;
    const newEvento= { 
        nombre,                               
         fechai, 
         fechaf, 
         descrp, 
         tipodeEvento, 
         imagen
    };

    console.log(newEvento);
    await pool.query('INSERT INTO evento set ?', [newEvento]);
    res.render('links/RegistrarEvento');
});


router.get('/paciente' , async(req,res) => {
    const lpaciente = await pool.query('SELECT * FROM paciente');
    console.log(lpaciente);
    res.render('links/list', { lpaciente })
});

router.post('/registroPaciente', async (req,res) =>{
    
    const {nombrep, edadp, eps, anioingres} = req.body;
    const newPaciente = {
        nombrep,
        edadp,
        eps,
        anioingres
    };


    await pool.query('INSERT INTO paciente set ?', [newPaciente]);
    res.send('Received');
});

router.post('/misReservas', async (req,res) =>{
    
    const {nombreEvento, motivo} = req.body;
    const Reserva = {
        nombreEvento,
        motivo
    };


    await pool.query('INSERT INTO reserva set ?', [Reserva]);
    res.send('Ok toca la flecha atras ');
});

router.get('/listPaciente' , async(req,res) => {
    const lpaciente = await pool.query('SELECT * FROM paciente');
    console.log(lpaciente);
    res.render('links/listPaciente', { lpaciente })
});


router.get('/ListEventos' , async(req,res) => {
    const leventos = await pool.query('SELECT * FROM eventos');
    console.log(leventos);
    res.render('links/ListEvento', { leventos })
});


router.get('/registro', (req,res) =>{
    res.render('links/register');
});

router.get('/login', (req,res) =>{
    res.render('links/login');
});


router.get('/cronograma', async (req,res) =>{

    const leventosc = await pool.query('SELECT * FROM eventos');
    console.log(leventosc);
 
    res.render('links/Cronograma', { leventosc})
    
    
  
});

router.get('/misReservas', async (req,res) =>{

    const leventosc2 = await pool.query('SELECT * FROM eventos');
    console.log(leventosc2);
    const lreserva = await pool.query('SELECT * FROM reserva');
    console.log(lreserva);
    res.render('links/misReservas', { leventosc2, lreserva})
    
   
});



router.post('/registro',  passport.authenticate('local.registro', {
        successRedirect: '/login',
        failureRedirect: '/registro'
    
}));

router.post('/login', (req,res,next) =>{
     passport.authenticate('local.login', {
    successRedirect: '/ListEventos',
    failureRedirect: '/login'
     } )(req,res,next);
});




router.get('/registerpaciente', (req,res) =>{
    res.send('Ok!') 
});

router.get('/triste', (req,res) =>{
    res.send(':c algo fallo!')
});

module.exports = router;
