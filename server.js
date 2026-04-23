const express = require('express');
const fetch = require('node-fetch');

const app = express();
app.use(express.json());

const PIXEL_ID = '2079561172587594';
const ACCESS_TOKEN = 'EAAg9kpg2aZCsBRf54e0Qd1J1sLKlVlPWDLdRRnWXgFOsIhl6HZB029zqyA5TSadJsZBS0Wg2pjZC62nBsPgBBDxZBHhn389AlcolyIPy5d02gNFpy7KcrplihwzcF0ZCVqRpgTWBEfyYmaFV9tLa1cxasMR19hXpyWeXQpxSJnwD3jKQBPWZCosPTt4fwZByh4D4NEwgZDZD'; // ⚠️建议放变量里

app.post('/track', async (req, res) => {
  try {
    const body = req.body;

    console.log('收到请求:', body); // ✅ 调试

    const fbRes = await fetch(`https://graph.facebook.com/v18.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`, {
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
    }); // ✅ 这里必须有

    const result = await fbRes.json();
    console.log('FB返回:', result); // 🔥关键

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
