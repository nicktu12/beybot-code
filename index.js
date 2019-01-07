module.exports = app => {
  const fetch = require('node-fetch');
  app.log('I got a hot sauce in my bag, swag');

  const triggerWords = ["Bey", "Beyonce", "Beyoncé", "Yonce", "Yoncé", "Mrs. Carter", "Mrs Carter", "JayZ", "Jay-Z", "Jay Z", "Sasha Fierce", "Destiny's Child", "Destinys Child", "Solange", "Knowles", "queen b", "qween", "carters", "Blue Ivy", "runi", "sir"];

  const triggered = (webhookType, context) => {
    const webhookTitle = context.payload[webhookType].title;
    const webhookBody = context.payload[webhookType].body;
    const webhookText = webhookTitle + ' ' + webhookBody;

    const containsArray = triggerWords.map(word =>
      webhookText.toLowerCase().includes(word.toLowerCase())
    );

    return containsArray.includes(true);
  };

  const getBeyGif = () => {
    return fetch(`https://api.giphy.com/v1/gifs/random?api_key=${process.env.GIPHY}&tag=beyonce&rating=PG-13`)
      .then(response => response.json())
      .then(json => json.data.id)
      .catch(error => { app.log(error) });
  };

  const postBeyGif = async (context) => {
    const bey = await getBeyGif();
    const issueComment = context.issue({ body: `![](https://media.giphy.com/media/${bey}/giphy.gif)` });
    return context.github.issues.createComment(issueComment);
  };

  const isBeyBday = (webhookType, context) => {
    const updatedAt = context.payload[webhookType].updated_at;
    const beyBday = '-09-04T';

    return updatedAt.includes(beyBday);
  };

  const postBeyBdayGif = (context) => {
    const issueComment = context.issue({ body: `![](https://media.giphy.com/media/xUA7baZERc49eHitgc/giphy.gif)` });
    return context.github.issues.createComment(issueComment);
  };

  app.on('issues.opened', context => {
    if (isBeyBday('issue', context)) {
      postBeyBdayGif(context);
    } else if (triggered('issue', context)) {
      postBeyGif(context);
    };
  });

  app.on('pull_request.opened', context => {
    if (isBeyBday('pull_request', context)) {
      postBeyBdayGif(context);
    } else if (triggered('pull_request', context)) {
      postBeyGif(context);
    };
  });

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
};
