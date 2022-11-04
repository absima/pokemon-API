// // for local port
import express from 'express';
import cors from 'cors';
import pokedata from './data/pokedex.json' assert { type: 'json' };

const app = express();
const port = process.env.PORT || 3000;

// app.use(cors());
console.log(pokedata.length);
// console.log(pokedata[pokedata.length-1]);
app.use(express.json())
app.use(cors());

app.get('/pokedex', (req, res) => res.send(pokedata));

app.get('/pokedex/:id', (req, res) => {
  console.log("req.params.id", req.params.id);
  if (req.params.id > pokedata.length){
    res.status(404).send(`${req.params.id} not found in our database.`)
  } 
  res.send(pokedata[req.params.id - 1]);
});


app.get('/pokedex/:id/:info', (req, res) => {
  const possibleInfos = ['name', 'type', 'base']
  console.log("id and info", req.params.id, req.params.info);
  console.log('boolean', possibleInfos.includes(req.params.info))
  
  if (req.params.id > pokedata.length){
    res.status(404).send(`${req.params.id} not found in our database.`);
  } 
  else if (!(possibleInfos.includes(req.params.info))){
    res.status(404).send(`${req.params.info} not found for ${req.params.id}.`)
  }
  else{
    res.send(pokedata[req.params.id - 1][req.params.info]);
  }
});


app.listen(port, () => console.log(`server active at http://localhost:${port}`));