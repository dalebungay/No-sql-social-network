const { User, Thought, Reaction } = require('../models');

module.exports = {

    getThoughts: async (req, res, next) => {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            console.log('Error:', err);
            res.json(err);
        }
    },
    getSingleThought: async (req, res, next) => {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId });
            if (!thought) {
                res.status(404).json({ message: 'Thought not found!' });
            } else {
                res.json(thought);
            }
        } catch (err) {
            console.log('Error:', err);
            res.json(err);
        };
    },
    createThought: async (req, res, next) => {
        try {
            const newThought = await Thought.create(req.body);
            const addToUser = await User.findOneAndUpdate(
                { username: req.body.username },
                { $addToSet: { thoughts: newThought._id } },
                { new: true },
            );
            if (!addToUser) {
                res.status(404).json({ message: 'Thought created, but no user found!' });
            } else {
                res.json('Created the thought');
            };
        } catch (err) {
            console.log('Error:', err);
            res.status(500).json(err);
        };
    },
    updateThought: async (req, res, next) => {
        try {
            const update = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true },
            );
            if (!update) {
                res.status(404).json({ message: 'No thought with this ID!' });
            } else {
                res.json(update);
            };
        } catch (err) {
            console.log('Error:', err);
            res.status(500).json(err);
        };
    },
    deleteThought: async (req, res, next) => {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
            if (!thought) {
                res.status(404).json({ message: 'Thought not found' });
            } else {
                res.json({ message: 'Thought deleted!' });
            };
        } catch (err) {
            console.log('Error:', err);
            res.json(err);
        };
    },
    addReaction: async (req, res, next) => {
        try {
            const newReaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { new: true },
            );
            if (!newReaction) {
                res.status(404).json({ message: 'No user with that ID' });
            } else {
                res.json('New reaction added');
            };
        } catch (err) {
            console.log('Error:', err);
            res.status(500).json(err);
        };
    },
    deleteReaction: async (req, res, next) => {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { runValidators: true, new: true }
            );
            if (!thought) {
                res.status(404).json({ message: 'User not found' });
            } else {
                res.json({ message: 'Reaction deleted!' });
            };
        } catch (err) {
            console.log('Error:', err);
            res.json(err);
        };
    },
};