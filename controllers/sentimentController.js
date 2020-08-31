const sentimentRepository = require('../repositories/sentimentRepository');
const db = require('../db');

module.exports = {
    // Compute sentiment score of query
    async computeSentiment(req, res) {
        try {
            await sentimentRepository.getTwitterAPI(req.body);
        }
        catch (err) {
            res.json({ err });
        }
    }

}