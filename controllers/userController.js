const User = require('../models/User');

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate({ _id: req.params.userId }, {
        username: req.body.username,
        email: req.body.email,
       }, { new: true})

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      } else {
        return res.status(200).json(user)
      }

    } catch (err) {
      res.status(500).json(err);
    }
  },
  async deleteUser(req, res) {
    try{
      const user = await User.findOneAndDelete({ _id: req.params.userId }, { new: true })
      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      } else {
        return res.status(200).json(user, "User Deleted")
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
};