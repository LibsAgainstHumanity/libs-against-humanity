'use strict';

import mongoose from 'mongoose';

export default mongoose.model('round', () => {
  mongoose.Schema({
    number: {
      type: Number,
      required: true,
      unique: true,
    },
    scripts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'script',
      },
    ],
  }, {
    usePushEach: true,
  });
});
