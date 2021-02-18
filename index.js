const SlackBot = require('slackbots');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const bot = new SlackBot({
  token: `${process.env.BOT_TOKEN}`,
  name: 'bunnyinspo'
})

bot.on('start',() => {
  const params = {
    icon_emoji: ':rabbit:'
  }

  bot.postMessageToChannel(
    'general',
    'Get inspired by bunny wisdom!! ^_^',
    params
  );
})

bot.on('error', function(err)  {
  console.log(err);
})

bot.on('message', (data) => {
    if(data.type !== 'message') {
        return;
    }
    handleMessage(data.text);
})

function handleMessage(message){
    if(message.includes('inspire me bunny')){
    inspireMe()
  }

  else if(message.includes('help')){
    runHelp()
  }
}

function inspireMe(){
  axios.get('https://raw.githubusercontent.com/BolajiAyodeji/inspireNuggets/master/src/quotes.json')
    .then(res =>{
      const quotes = res.data;
      const random = Math.floor(Math.random() * quotes.length);
      const quote = quotes[random].quote
      const author = quotes[random].author

      const params = {
        icon_emoji: ':rabbit:'
      }

      bot.postMessageToChannel(
        'general',
        `:zap: ${quote} - *${author}*`,
        params
      );

    })
}
