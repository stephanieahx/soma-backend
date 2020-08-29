const axios = require("axios");

// Stuff for sentiment analysis API
const urlSentimentAPI = "https://twinword-sentiment-analysis.p.rapidapi.com/analyze/";
const rapidAPIkey = process.env.RAPID_API_KEY;

module.exports = {

    // to get 'query' variable
    // POST METHOD
    async analyseSentimentPost(req, res) {
        const axios = require("axios");
        axios({
            "method": "POST",
            "url": urlSentimentAPI,
            "headers": {
                "content-type": "application/x-www-form-urlencoded",
                "x-rapidapi-host": "twinword-sentiment-analysis.p.rapidapi.com",
                "x-rapidapi-key": rapidAPIkey,
                "useQueryString": true
            },
            "data": {
                "text": query
            }
        })
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })
    },

    //GET METHOD
    async analyseSentiment(req, res) {
        const axios = require("axios");
        axios({
            "method": "GET",
            "url": urlSentimentAPI,
            "headers": {
                "content-type": "application/octet-stream",
                "x-rapidapi-host": "twinword-sentiment-analysis.p.rapidapi.com",
                "x-rapidapi-key": rapidAPIkey,
                "useQueryString": true
            },
            "params": {
                "text": query
            }
        })
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })
    },

}