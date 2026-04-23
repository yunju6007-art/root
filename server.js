const express = require('express');
const fetch = require('node-fetch');

const app = express();
app.use(express.json());

const PIXEL_ID = '2079561172587594';
const ACCESS_TOKEN = 'EAAg9kpg2aZCsBRQyTkVTqUB0IWdBSsXArFmhKIV8D8hZAD7rkkTjhP8Af5Ahbc1p4y2a9f5d698reyse7702hp4k0p7mzcfqa92c9ef5rpq6g7u293yqs3vvdkI5iWWq5ZACEMkAArUGSAZAqTKLZAnvSvX4ZC3Md08dMqe2kW7arOJaMtLb0qucshZAEKMZACZAq9Wj4O9Pbc1p4y2a9f5d698reyse7702hp4k0p7mzcfqa92c9ef5rpq6g7u293yqs3vvdk';

app.post('/track', async (req, res) => {
  try {
    const body = req.body;

    await fetch(`https://graph.facebook.com/v18.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
  data: [{
    event_name: body.event || 'Lead',
    event_time: Math.floor(Date.now()/1000),
    event_id: body.event_id,
    action_source: 'website',
    user_data: {
      client_ip_address: req.headers['x-forwarded-for'],
      client_user_agent: req.headers['user-agent']
    },
    custom_data: {
      content_name: body.label
    }
  }],
  test_event_code: 'TEST71233'
})
    console.log('✅ CAPI:', body.label);
    res.json({success:true});

  } catch (e) {
    console.log('❌ error', e);
    res.status(500).json({error:true});
  }
});

app.listen(3000, () => {
  console.log('running');
});
