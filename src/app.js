import express from 'express';
import { pool } from './db.js'
import bodyParser from 'body-parser'
import { PORT } from './config.js';

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Allow', 'GET, POST, PUT, DELETE');
    next();
  });

app.get('/', (request, response) => {
    response.send('App Running')
});

app.get('/form', async(req, res) => {
    const result = await pool.query('SELECT * FROM formulario')
    res.json(result);
});

app.post('/add-user', async(req, res) => {
    const result = await pool.query('INSERT INTO login SET ? ')
    res.json(result);})
    
app.post('/send-form', async(request, response) => {
    await pool.query('INSERT INTO formulario SET ?', request.body)
        response.send('information registered Successfully');})
    
        // app.post('/inicio-sesion', async(request, response) => {
    
    //     const {user, password} = request.body
    //     const values = [user, password]
    //     await pool.query('SELECT * FROM login WHERE user =? AND password =?', values, (error, result) => {
        //         if (error) {
            //             response.status(500).send(error)
            //         } else {
                //             if (result.length > 0) {
                    //                 response.status(200).send({
                        //                 })
    
//             } else {
    //                 response.status(401).send('Usuario o contraseña incorrectos')
    //             }
    //         }
    //     })
    // })
    
            
            // app.put('/actualizar/:id', async(request, response) => {
                //     const id = request.params.id;
                //     await pool.query('UPDATE formulario SET ? WHERE idformulario = ?', [request.body, id], (error, result) => {
                    //         if (error) throw error;
                    //         response.send('Updated Successfully');
                    //     });
                    // });
                    
                    // app.delete('/eliminar-fila/:idformulario', async(req, res) => {
                        //     const id = req.params
//     const sql = `DELETE FROM formulario WHERE idformulario = ${id.idformulario}`

//     await pool.query(sql, error => {
    //       if (error) throw error
    
//       res.send('Deleted Successfully')
//     })
// })

app.delete('/delete-row/:idformulario',async(req,res) => {
    const id = req.params
    await pool.query(`DELETE FROM formulario WHERE idformulario = ${id.idformulario}`)
        res.send('Deleted Successfully')

}) 
 app.listen(PORT, ()=> console.log(`Server Running on PORT '${PORT}'`));