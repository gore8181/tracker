{
  "name": "discord-webhook-reporter",
  "version": "1.0.0",
  "description": "Sends loadtester activity to Discord",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "axios": "^1.6.7",
    "express": "^4.18.2"
  }
}

const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/report', async (req, res) => {
  const { target, threads, duration, status } = req.body;

  if (!target || !threads || !duration || !status) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  const webhook = process.env.DISCORD_WEBHOOK_URL;
  if (!webhook) return res.status(500).json({ error: 'Discord webhook is not configured.' });

  try {
    await axios.post(webhook, {
      content: `🚨 **New Load Test Executed!**
🌐 Target: ${target}
⚙️ Threads: ${threads}
⏱️ Duration: ${duration} seconds
📊 Status: ${status}
🔗 [View Load Tester](https://forum-h.vercel.app/loadtester.html)`
    });

    res.status(200).json({ message: 'Reported to Discord!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to send message.' });
  }
});

app.get('/', (req, res) => {
  res.send('Webhook Reporter is Running.');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

