import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { pool } from './db.js'
import { PORT } from './config.js';

const app = express();
const whiteList = [ 'http://localhost:5173' ]

app.use(bodyParser.json());
app.use(cors({origin: whiteList}));

header('Access-Control-Allow-Origin', '*');
header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
header('Allow', 'GET, POST, PUT, DELETE');

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
    const [result] = await pool.query('SELECT * FROM form')
    res.json(result);
});

app.post('/add-user', async(req, res) => {
    await pool.query('INSERT INTO login SET ? ')
    res.send("User Added Successfully");})
        
app.post('/send-form', async(request, response) => {
    await pool.query('INSERT INTO form SET ?', request.body)
        response.send('information registered Successfully');})

app.post('/login', async(request, response) => {
    
    const {user, password} = request.body
    const values = [user, password]
        await pool.query('SELECT * FROM login WHERE user =? AND password =?', values)
            response.status(500).send(error)
})

app.put('/update-row/:id', async(request, response) => {
    const id = request.params.id;
    await pool.query('UPDATE form SET? WHERE idform = ?', [request.body, id])
    response.send('Updated Successfully')
})
                    
app.delete('/delete-row/:idform',async(req,res) => {
    const id = req.params
    await pool.query(`DELETE FROM form WHERE idform = ${id.idform}`)
        res.send('Deleted Successfully')

}) 
 app.listen(PORT, ()=> console.log(`Server Running on PORT '${PORT}'`));