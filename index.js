module.exports = app => {
  // Your code here
  const fetch = require('node-fetch');
  app.log('Yay, the app was loaded!');

  const triggerWords = ["Bey", "Beyonce", "Beyoncé", "Yonce", "Yoncé", "Mrs. Carter", "Mrs Carter", "JayZ", "Jay-Z", "Jay Z", "Sasha Fierce", "Destiny's Child", "Destinys Child", "Solange", "Knowles"];

  const getBeyGif = () => {
    return fetch(`https://api.giphy.com/v1/gifs/random?api_key=${process.env.GIPHY}&tag=beyonce&rating=PG-13`)
      .then(response => response.json())
      .then(json => json.data.id)
      .catch(error => { app.log(error) });
  };

  const postBeyGif = () => {
  
  };

  app.on('issues.opened', async context => {
    const issueTitle = context.payload.issue.title;
    const issueBody = context.payload.issue.body;
    const issue = issueBody + ' ' + issueTitle;

    const containsArray = triggerWords.map(word => 
      issue.toLowerCase().includes(word.toLowerCase())
    );

    if (containsArray.includes(true)) {
      const bey = await getBeyGif();
      const issueComment = context.issue({ body: `![](https://media.giphy.com/media/${bey}/giphy.gif)` });
      return context.github.issues.createComment(issueComment);
    };

  });

  app.on('pull_request.opened', async context => {
    const prTitle = context.payload.pull_request.title;
    const prBody = context.payload.pull_request.body;
    const pr = prTitle + ' ' + prBody;

    const containsArray = triggerWords.map(word => 
      pr.toLowerCase().includes(word.toLowerCase())
    );

    if (containsArray.includes(true)) {
      const bey = await getBeyGif();
      const issueComment = context.issue({ body: `![](https://media.giphy.com/media/${bey}/giphy.gif)` });
      return context.github.issues.createComment(issueComment);
    };
  });

  app.on('pull_request_review_comment.created', async context => {
    const prComment = context.payload.comment.body;


    const containsArray = triggerWords.map(word => 
      prComment.toLowerCase().includes(word.toLowerCase())
    );

    if (containsArray.includes(true)) {
      const bey = await getBeyGif();
    app.log(context);
      const issueComment = context.issue({ body: `![](https://media.giphy.com/media/${bey}/giphy.gif)` });
      return context.github.issues.createComment(issueComment);
    };
  });

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
};
