'use strict';

import mongoose from 'mongoose';

export default mongoose.model('keyword', () => {
  mongoose.Schema({
    content: {
      type: String,
      required: true,
    },
    position: {
      type: Number,
      required: true,
      unique: true,
    },
    script: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      reference: 'script',
    },
  });
});
