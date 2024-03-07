const Thought = require('../models/Thought')

module.exports = {
    async getThoughts(req, res) {
        try{
            const thoughts = await Thought.find();
            res.json(thoughts)
        } catch (err){
            res.status(500).json(err)
        }
    },
    async getSingleThought(req, res) {
        try {
          const thoughts = await Thought.findOne({ _id: req.params._id })
            .select('-__v');
    
          if (!thoughts) {
            return res.status(404).json({ message: 'No Thougths with that ID' });
          }
    
          res.json(thoughts);
        } catch (err) {
          res.status(500).json(err);
        }
      },
      async createUser(req, res) {
        try {
          const thoughts = await Thought.create(req.body);
          res.json(thoughts);
        } catch (err) {
          res.status(500).json(err);
        }
      },
}