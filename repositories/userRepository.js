const db = require('../db');
const bcrypt = require('bcrypt')
const SALT_ROUND = process.env.SALT_ROUND || 10; //storing as environment variable
const { ObjectId } = require('mongodb');

module.exports = {
    // Register a new user 
    async create(data) {
        try {
            data.password = bcrypt.hashSync(data.password, bcrypt.genSaltSync(SALT_ROUND));
            const { insertedCount } = await db.users.insertOne(data);
            if (!insertedCount) throw new Error('insertion failure');
            return true;
        } catch (err) {
            throw new Error(`Due to ${err.message}, you are not allowed to insert this item ${JSON.stringify}`)
        }
    },
    
    // User adds topic to their list of tracked topics


    // Delete user profile
    delete(id) {
        return db.users.deleteOne(
            {
                "_id": ObjectId(id)
            }
        );
    },

};