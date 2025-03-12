const express = require('express');
const router = express.Router();
const { getSupabase } = require('../db');
const { getShopId } = require('../config/shop');

router.get('/', async (req, res) => {
  const supabase = getSupabase();
  const shopId = getShopId();
  const { data: appointments } = await supabase.from('appointments').select('*').eq('shop_id', shopId);
  const added = req.query.added === 'true'; // Check query param
  res.render('index', { appointments: appointments || [], shopId, added });
});

router.post('/add', async (req, res) => {
  const supabase = getSupabase();
  const shopId = getShopId();
  const { data, error } = await supabase.from('appointments').insert({
    shop_id: shopId,
    client_name: req.body.client_name,
    time: req.body.time
  });
  if (error) {
    console.error('Insert Error:', error);
    return res.status(500).send('Failed to add appointment: ' + JSON.stringify(error));
  }
  console.log('Inserted:', data);
  res.redirect('/?added=true');
});

router.post('/update/:id', async (req, res) => {
  const supabase = getSupabase();
  const shopId = getShopId();
  await supabase.from('appointments').update({ status: 'done' }).eq('id', req.params.id).eq('shop_id', shopId);
  res.redirect('/');
});

router.post('/delete/:id', async (req, res) => {
  const supabase = getSupabase();
  const shopId = getShopId();
  await supabase.from('appointments').delete().eq('id', req.params.id).eq('shop_id', shopId);
  res.redirect('/');
});

module.exports = router;