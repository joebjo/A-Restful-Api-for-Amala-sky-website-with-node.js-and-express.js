const Joi = require('joi');
const express = require('express');
const app = express();
//middleware for post request
app.use(express.json());

const menus = [
{id:1,name:'Economy', description:'Ewedu and Gbegiri plus Amala',price:'#1900'},
{id:2,name:'BasicPlate', description:'Croaker and Amala with Bottled water',price:'#2300'},
{id:3,name:'MediumPlate',description:'Panla and Cow tail with Amala and Abula',price:'#2800'},
{id:4,name:'ExecutivePlate',description:'Abodi and Roundabout plus Amala and Abula',price:'#3100'},
{id:5,name:'KingsizePlate', description:'Inu eran,shaki,ponmoalata plus Amala and Abula',price:'#3400'},
];
//http methods for AmalaSky Restaurant
app.get('/api/menus/:id',(req,res)=>{
    const menu = menus.find(c=>c.id=== parseInt(req.params.id));
    if(!menu) return res.status(404).send('The menu with the given ID was not found')
    res.send(menu);
}) 
//post request to AmalaSky Restaurant
app.post('/api/menus',(req,res)=>{
    // validating the post request 
    const{error} = validateCourse(req.body);
    if(error)
       return res.status(400).send(error.details[0].message);

  const menu= {
    id:menus.length + 1,
    name:req.body.name
}

menus.push(menu);
res.send(menu);
});

app.put('/api/menus/:id',(req,res)=>{
    const menu = menus.find(c=>c.id=== parseInt(req.params.id));
    if(!menu) return res.status(404).send('The menu with the given ID was not found')
    //object destructuring property for error
    
    const {error} = validateCourse(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    menu.name = req.body.name;
    res.send(menu);
});

    app.delete('/api/menus/:id',(req,res)=>{
    const menu = menus.find(c=>c.id=== parseInt(req.params.id));
    if(!menu) return res.status(404).send('The menu with the given ID was not found')
    
    //activate delete request
    const index = menus.indexOf(menu);
    menus.splice(index,1);
    res.send(menu);
    })
    //AmalaSky Validation logic in one place
    function validateCourse(menu){
        const schema = {
            name:Joi.string().min(3).required()
        };
        return Joi.validate(menu,schema);
    }
//listening on port 5000
const port = process.env.port||5000;
app.listen(port,()=>{console.log(`Server running on port ${port}`)})
