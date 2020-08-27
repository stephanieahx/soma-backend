const db = require('../db');
const { ObjectId } = require('mongodb');

const axios = require('axios');

const config = {
    method: 'get',
    url: 'https://api.twitter.com/2/tweets/search/recent?query=nyc&tweet.fields=author_id,created_at,entities,geo,in_reply_to_user_id,lang,possibly_sensitive,referenced_tweets,source',
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