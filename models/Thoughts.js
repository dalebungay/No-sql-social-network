const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      min_length: 1,
      max_lenght: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => {
        if (date) return `${date.toLocaleDateString('en-us', { month: 'short' })} ${formatDay(date.getDate())}, ${date.getFullYear()} at ${date.toLocaleTimeString('en-us',)}`
      },
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [Reaction],
  },
  {
    tJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  },
);


thoughtSchema.virtual('reactionCount')
  .get(function () {
    return this.reactions.length;
  });

const Thoughts = model('Thought', thoughtSchema);

module.exports = Thoughts;