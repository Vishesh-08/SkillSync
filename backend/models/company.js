const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  companyLogo: { type: String, required: true }, // Store the path or URL to the logo file
  companyType: { type: String, required: true },
  foundedYear: { type: Number, required: true },
  numberOfEmployees: { type: String, required: true }, // E.g., "1-10", "500+"
  contactPerson: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  website: { type: String, required: true },
  registrationNumber: { type: String, required: true, unique: true },
  verificationDocuments: { type: String, required: true }, // Store the path or URL to documents
  socialMediaLinks: { type: String },
  gdprConsent: { type: Boolean, required: true },password: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Company", companySchema);

