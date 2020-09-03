const userRepository = require('../repositories/userRepository');

module.exports = {
    // Register a new user
    async create(req, res) {
        try {
            validateUser(req.body);
            await userRepository.create(req.body);
            res.json('User registered successfully.');
        } catch (err) {
            res.json({ err });
        }
    },

    // User adds topic to their list of tracked topics


    // Delete user profile 
    async delete(req, res) {
        try {
            const id = await userRepository.delete(req.params.id);
            res.json('deleted user. redirect to website landing page');
        } catch (err) {
            console.log('error', err);
        }
    },

};

