'use strict';

import mongoose from 'mongoose';

export default mongoose.model('script', () => {
  mongoose.Schema({
    content: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'user',
    },
    keywords: [
      {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'keywords',
      },
    ],
  }, {
    usePushEach: true,
  });
});

