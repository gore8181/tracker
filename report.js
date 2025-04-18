const axios = require('axios');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const { target, threads, duration, status } = req.body;
  if (!target || !threads || !duration || !status) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    await axios.post('https://discord.com/api/webhooks/1362906286706004178/xy-a9AhgRpMWaGTnJ7v3o-vcexqE0WZYacI7waOM40a2ILj0tGXeRf0nUbYkp4-ivR1Q', {
      content: `🚨 **New Load Test Executed!**
🌐 Target: ${target}
⚙️ Threads: ${threads}
⏱️ Duration: ${duration} seconds
📊 Status: ${status}
🔗 [View Load Tester](https://forum-h.vercel.app/loadtester.html)`
    });

    res.status(200).json({ message: 'Report sent to Discord!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to send to Discord.' });
  }
}
