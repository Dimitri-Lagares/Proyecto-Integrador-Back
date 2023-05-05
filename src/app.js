import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { pool } from './db.js'
import { PORT } from './config.js';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (request, response) => {
    response.send('App Running')
});

app.get('/form', async(req, res) => {
    const [result] = await pool.query('SELECT * FROM form')
    res.json(result);
});

app.post('/add-user', async(req, res) => {
    const userObj = {
        user: req.body.user,
        password: req.body.password
    };
    await pool.query('INSERT INTO login SET ? ', userObj)
    res.send("User Added Successfully");
});
        
app.post('/send-form', async(req, res) => {
    const formObj = {
        nombre: req.body.nombre,
        correo: req.body.correo,
        telefono: req.body.telefono,
        solicitud: req.body.solicitud,
        comentario: req.body.comentario
    };
    await pool.query('INSERT INTO form SET ? ', formObj)
    res.send('information registered Successfully');
});

app.post('/login', async(req, res) => {
    const user = req.body.user
    const password = req.body.password
    const values = [user, password]
    const sql = 'SELECT * FROM login WHERE user = ? AND password = ? ';
    await pool.query(sql, values)
        res.status(200)
});

app.put('/update-row/:id', async(request, response) => {
    const id = request.params.id;
    await pool.query('UPDATE form SET? WHERE idform = ?', [request.body, id])
    response.send('Updated Successfully')
});
                    
app.delete('/delete-row/:idform',async(req,res) => {
    const id = req.params
    await pool.query(`DELETE FROM form WHERE idform = ${id.idform}`)
        res.send('Deleted Successfully')

});
 app.listen(PORT, ()=> console.log(`Server Running on PORT '${PORT}'`));
