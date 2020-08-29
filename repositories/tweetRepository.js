const db = require('../db');
const { ObjectId } = require('mongodb');

const axios = require('axios');

// sentiment module set up
const Sentiment = require('sentiment');;
const sentiment = new Sentiment();

// Code snippet for axios from Twitter documentation
const config = {
  method: 'get',
  url: 'https://api.twitter.com/2/tweets/search/recent?query=' + query + '&start_time',
  headers: {}
};

axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });

//start_time
// date(ISO 8601)	YYYY - MM - DDTHH: mm: ssZ(ISO 8601 / RFC 3339).The oldest UTC timestamp(from most recent 7 days) from which the Tweets will be provided.Timestamp is in second granularity and is inclusive(i.e. 12: 00: 01 includes the first second of the minute).If included with the same request as a since_id parameter, only since_id will be used.By default, a request will return Tweets to 7 days ago if you do not include this parameter.

// Code snippet from Twitter API documentation
const https = require('https');
const request = require('request');
const util = require('util');

const get = util.promisify(request.get);
const post = util.promisify(request.post);

const consumer_key = ''; // Add your API key here
const consumer_secret = ''; // Add your API secret key here

const bearerTokenURL = new URL('https://api.twitter.com/oauth2/token');
const searchURL = new URL('https://api.twitter.com/labs/2/tweets/search');

async function bearerToken(auth) {
  const requestConfig = {
    url: bearerTokenURL,
    auth: {
      user: consumer_key,
      pass: consumer_secret,
    },
    form: {
      grant_type: 'client_credentials',
    },
  };

  const response = await post(requestConfig);
  return JSON.parse(response.body).access_token;
}

(async () => {
  let token;
  const query = 'from:twitterdev has:media';
  const maxResults = 10;

  try {
    // Exchange your credentials for a Bearer token
    token = await bearerToken({ consumer_key, consumer_secret });
  } catch (e) {
    console.error(`Could not generate a Bearer token. Please check that your credentials are correct and that the Filtered Stream preview is enabled in your Labs dashboard. (${e})`);
    process.exit(-1);
  }

  const requestConfig = {
    url: searchURL,
    qs: {
      query: query,
      max_results: maxResults,
    },
    auth: {
      bearer: token,
    },
    headers: {
      'User-Agent': 'LabsRecentSearchQuickStartJS',
    },
    json: true,
  };

  try {
    const res = await get(requestConfig);
    console.log(res.statusCode);
    console.log(res);
    if (res.statusCode !== 200) {
      throw new Error(res.json);
    }

    console.log(res.json);
  } catch (e) {
    console.error(`Could not get search results. An error occurred: ${e}`);
    process.exit(-1);
  }
})();

module.exports = {
  // get tweets based on query from twitter api 


  // Compute sentiment score of tweets 
  async compute(tweetData) {
    try {
      sentimentScore = sentiment.analyze(tweetData);
    } catch (err) {
      console.log(err);
    };
  },

  // Add sentiment score to sentiment trend database
  async create(sentimentScore) {
    try {
      // const sentimentData = {
      //   sentimentScore: sentimentScore,
      //   date: today's date
      // }
      const { insertedCount } = await db.sentiment.insertOne(sentimentData);
      if (!insertedCount) throw new Error('insertion failure');
      return true;
    } catch (err) {
      throw new Error(`Due to ${err.message}, you are not able to insert this item ${JSON.stringify}`)
    }
  }, 

}