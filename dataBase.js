const mongoose = require('mongoose');
module.export = mongoose.connect(
    "mongodb://127.0.0.1:27017/webChat",
    {
      useNewUrlParser: true
    },
    () => {
      console.log("Mongodb Connected");
    }
);
