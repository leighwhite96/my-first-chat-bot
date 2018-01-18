const botui = new BotUI('api-bot');

const socket = io.connect('http://localhost:8010');

botui.message.add({
  content: 'Talk to me...',
  delay: 1500
})
.then(() => {
  botui.action.text({
    action: {
      placeholder: 'Say Hello'
    }
  })
  .then(res => socket.emit('fromClient', {client: res.value}))
  .then(() => {
    socket.on('fromServer', data => {
      botui.message.add({
        content: data.server,
        delay: 500
      })
    })
  })
})
