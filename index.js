module.exports = app => {
  // Your code here
  app.log('Yay, the app was loaded!')

  app.on('issues.opened', async context => {
    const triggerWords = ["Bey", "Beyonce", "Beyoncé", "Yonce", "Yoncé", "Mrs. Carter", "Mrs Carter", "JayZ", "Jay-Z", "Jay Z", "Sasha Fierce", "Destiny's Child", "Destinys Child", "Solange", "Knowles"];
    const body = context.payload.issue.body;
    const issueComment = context.issue({ body: 'Queen Bey reigns' })
    return context.github.issues.createComment(issueComment)
  })

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
}
