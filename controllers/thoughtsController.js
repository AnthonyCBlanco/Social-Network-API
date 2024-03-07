const { Thought, User }= require('../models')

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
      async createThought(req, res) {
        try {
          const thoughts = await Thought.create(req.body);
          await User.updateOne({ _id: req.body.userId}, {$push: {thoughts: thoughts._id}})
          res.json(thoughts);
        } catch (err) {
          res.status(500).json(err);
        }
      },
      async updateThought(req, res) {
        try {
          const thoughts = await Thought.findOneAndUpdate({ _id: req.params._id}, {thoughtText: req.body.thoughtText}, {new: true})
          if (!thoughts) {
            return res.status(404).json({ message: 'No Thougths with that ID' });
          }
          res.json(thoughts);
        } catch (err) {
          res.status(500).json(err);
        }
      },
      async deleteThought(req, res) {
        try {
          const thoughts = await Thought.findOneAndDelete({ _id: req.params._id}, {new: true})
          if (!thoughts) {
            return res.status(404).json({ message: 'No Thougths with that ID' });
          }
          res.json(thoughts);
        } catch (err) {
          res.status(500).json(err);
        }
      },
      async addReactions(req, res) {
        try {
          const thoughts = await Thought.findOneAndUpdate({ _id: req.params._id},
             {$push: {reactions: {reactionBody: req.body.reactionBody, _id: req.body._id}}})
          if (!thoughts) {
            return res.status(404).json({ message: 'No Thougths with that ID' });
          }
          res.json(thoughts);
        } catch(err) {
          res.status(500).json(err)
        }
      },
      async deleteReaction(req, res) {
        // console.log(req.params)
        try {
          const thoughts = await Thought.findOneAndUpdate(
            {
             _id: req.params._id
            },
            {
              $pull: {
                reactions: {_id: req.body._id}
              }},
            {
              new: true
            })
          if (!thoughts) {
            return res.status(404).json({ message: 'No Reactions with that ID' });
          }
          res.json(thoughts);
        } catch(err) {
          res.status(500).json(err)
        }
      }
}