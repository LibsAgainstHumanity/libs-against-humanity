'use strict';

import mongoose from 'mongoose';

export default mongoose.model('user', () => {
  mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true,
    },
    scripts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'script',
      },
    ],
    // This could be the lead player if games were played in a circle
    // Every round a new play "runs" the game and selects a new Mablib, 
    // or is given options to chjoose one
    lead: { 
      type: Boolean,
      required: true,
    },
  }, {
    usePushEach: true,
  });
});
