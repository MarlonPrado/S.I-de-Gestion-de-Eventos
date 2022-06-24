const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../database');
const helpers = require('../lib/helpers');
passport.use('local.registro', new LocalStrategy({

    usernameField: 'correo',
    passwordField: 'clave',
    passReqToCallback: true

}, async (req,correo, clave,done)=>{
    console.log(req.body);
    const {nombre,
         cc, 
         edad,
          titulo,
          rol} = req.body

          console.log(nombre);
          console.log(cc);
    const newUser= {
        nombre,
        cc,
        edad,
        titulo,
        correo,
        clave,
        rol
    }
    newUser.clave = await helpers.encryptPassword(clave);
    const resultado = await pool.query('INSERT INTO usuarios SET ?', [newUser]);
    console.log(resultado);
    newUser.id = resultado.insertId;
    return done(null,  newUser);
}));      

passport.serializeUser((user,done)=>{
    done(null,user.id);
});

passport.deserializeUser(   async (id, done)=>{
    const fila = await pool.query('SELECT * FROM usuarios Where id=?', [id]);
    done(null, fila[0]);
});

passport.use('local.login', new LocalStrategy({

    usernameField: 'correo',
    passwordField: 'clave',
    passReqToCallback: true

},  async (req,correo, clave,done)=>{
    console.log(req.body);
    console.log(correo);
    console.log(clave);
    const rows = await pool.query('SELECT * FROM usuarios WHERE correo = ?', [correo]);
    
    if (rows.length > 0){
        
        const usuario = rows[0];
        const validPassword = await helpers.matchPassword(clave, usuario.clave);
        
        if(validPassword){
            done(null, usuario, req.flash('Welcome')); 
            console.log('Bien, te has logueado correctamente');
        }
        else{
            done(null, false, req.flash('Falso'));
            console.log('Meh, error de contraseña/email');
        }
    }
    else{
        console.log('mal, este usuario ni existe');
        return done(null, false, req.flash('Falso no existe'));
        
    }
}));
