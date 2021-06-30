const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const Contact = mongoose.Schema(
  {
    name: { type: "string", required: true },
    email: { type: "string", required: true },
    phone: { type: "string", required: true },
    password: { type: "string", required: true },
  },
  {
    timestamps: true,
  }
);

Contact.plugin(mongoosePaginate);

module.exports = mongoose.model("Contact", Contact);
