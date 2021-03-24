const Mongoose = require('mongoose');

export const connectDB = (url) => {
  if (!Mongoose.connection.readyState == Mongoose.STATES.connected) {
    console.log('Connecting to DB...');
    Mongoose.connect(
      url,
      { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
      (err) => {
        if (err) console.error('Connection failed; ' + err);
      }
    );
    //chargeModels();
    const db = Mongoose.connection;
    db.once('open', () => {
      console.log('Connection established.');
    });
  }
};

export const closeDB = () => {
  if (Mongoose.connection.readyState == Mongoose.STATES.connected) {
    Mongoose.connection.close((err) => {
      if (err) {
        console.error(err);
      }
    });
    console.log('Disconnected successfully.');
  }
};
