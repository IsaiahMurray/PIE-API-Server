// const express = require('express')
// const router = express.Router9()

const validateSession = require('../middleware/validate-session');
const router = require('express').Router();
const Pie = require('../db').import('../models/pie');

//router.get('/', (req, res) => res.send('I love pies!'));

//GET ALL
router.get('/', validateSession,(req, res) => {
    Pie.findAll()
    .then(pie => res.status(200).json(pie))
    .catch(err => res.status(500).json({error : err}))
})

//POST
router.post('/', (req, res) => {
    const pieFromRequest = {
        nameOfPie: req.body.nameOfPie,
        baseOfPie: req.body.baseOfPie,
        crust: req.body.crust,
        timeToBake: req.body.timeToBake,
        servings: req.body.servings,
        rating: req.body.rating
    }
    Pie.create(pieFromRequest)
        .then(pie => res.status(200).json(pie))
        .catch(err => res.status(500).json({ error: err }))    
})

// GET by Name
router.get('/:name', (req, res) => {  
    Pie.findOne({ where: { nameOfPie: req.params.name }})  
      .then(pie => res.status(200).json(pie))
      .catch(err => res.status(500).json({ error: err}))
  })

//UPDATE by Id
router.put('/:id', (req, res) => {
    Pie.update(req.body, { where: { id: req.params.id }})  
      .then(pie => res.status(200).json(pie))
      .catch(err => res.status(500).json({error: err})) 
  })

//DELETE
router.delete('/:id', (req, res) => {
    Pie.destroy({
        where: { id: req.params.id}
    })
    .then(pie => res.status(200).json(json))
    .catch(err => res.status(500).json({error: err}))
})

module.exports = router;