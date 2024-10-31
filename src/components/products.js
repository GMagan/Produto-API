const express = require('express');
const router = express.Router();
const pool = require('../db');

router.post('/', async (req, res) => {
   const { descricao, preco, estoque } = req.body;

   try {
      const result = await pool.query(
         'INSERT INTO produtos (descricao, preco, estoque) VALUES ($1, $2, $3) RETURNING *',
         [descricao, preco, estoque]
      );
      res.status(201).json(result.rows[0]);
   } catch (err) {
      console.error('Could no insert product:', err.message);
      res.status(500).json({ error: err.message });
   }
});


router.get('/', async (req, res) => {

   try {
      const result = await pool.query(
         'SELECT * FROM produtos'
      )
      res.status(200).json(result.rows)
   } catch (err) {
      console.log('Could not find product: ', err.message)
      res.status(500).json({ error: err.message })
   }

})

router.get('/:id', async (req, res) => {

   const { id } = req.params

   try {
      const result = await pool.query(
         'SELECT * FROM produtos WHERE $1 = produtos.id',
         [id]
      )
      res.status(200).json(result.rows)
   } catch (err) {
      console.log('Could not find product using id: ', err.message)
      res.status(500).json({ error: err.message })

   }
})

router.put('/:id', async (req, res) => {

   const { id } = req.params

   const { descricao, preco, estoque } = req.body

   try {
      const result = await pool.query(
         'UPDATE produtos SET descricao = $1, preco = $2, estoque = $3 WHERE $4 = produtos.id',
         [descricao, preco, estoque, id]
      )
      res.status(200).json(result.rows[0])
   } catch (err) {
      console.log('Could not update product: ', err.message)
      res.status(500).json({ error: err.message })
   }

})

router.delete('/:id', async (req, res) => {

   const { id } = req.params


   try {
      const result = await pool.query(
         'DELETE FROM produtos WHERE $1 = produtos.id',
         [id]
      )
      res.status(200).json()
   } catch (err) {
      console.log("Could not delete product: ", err.message)
      res.status(500).json({ error: err.message })
   }
})

module.exports = router;