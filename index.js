module.exports = app => {
  // Your code here
  app.log('Yay, the app was loaded!')

  app.on('issues.opened', async context => {
    const triggerWords = ["Bey", "Beyonce", "Beyoncé", "Yonce", "Yoncé", "Mrs. Carter", "Mrs Carter", "JayZ", "Jay-Z", "Jay Z", "Sasha Fierce", "Destiny's Child", "Destinys Child", "Solange", "Knowles"];
    const issueBody = context.payload.issue.body;

    const issueTitle = context.payload.issue.title;

    const issue = issueBody + ' ' + issueTitle;

    const containsArray = triggerWords.map(word => 
      issue.toLowerCase().includes(word.toLowerCase())
    );

    if (containsArray.includes(true)) {
      const issueComment = context.issue({ body: '![](https://media.giphy.com/media/n4WpP39mwWrmg/giphy.gif)' })
      return context.github.issues.createComment(issueComment)
    }

  })

  app.on('pull_request.opened', async context => {
    app.log('issa pr')
  })

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
}
