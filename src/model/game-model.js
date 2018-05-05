'use strict';

import mongoose from 'mongoose';

export default mongoose.model('game', () => {
  mongoose.Schema({
    title: {
      type: String,
      required: true,
      unique: true,
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
    rounds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'round',
      },
    ],
  }, {
    usePushEach: true,
  });
});
