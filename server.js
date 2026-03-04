require('dotenv').config();
const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Используем токен, который вставим в .env
const bot = new TelegramBot(process.env.BOT_TOKEN);

app.post('/order', async (req, res) => {
  const { cart, userId } = req.body;

  const orderText = cart.map(p => `${p.name} — ${p.price} ₽`).join('\n');

  await bot.sendMessage(userId,
    `🍵 Новый заказ:\n\n${orderText}`
  );

  res.send({ success: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));