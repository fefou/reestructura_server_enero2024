
export class SessionsController{
    constructor(){}

    static async login(req,res){

            console.log(req.user)
            
            req.session.usuario = {
                nombre: req.user.first_name, email: req.user.email, rol: req.user.rol
            }
        
            res.redirect(`/realtimeproducts?mensajeBienvenida=Bienvenido ${req.user.first_name}, su rol es ${req.user.rol}`)
        
        
    }

    static async register(req,res){
    
        let { email } = req.body

        res.redirect(`/login?mensaje=Usuario ${email}registrado correctamente`)
    }

}