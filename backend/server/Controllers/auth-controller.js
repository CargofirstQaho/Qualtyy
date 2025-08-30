const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models");
const LoginSession = db.Auth;

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.error("FATAL ERROR: JWT_SECRET not set in environment!");
  process.exit(1);
}

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  try {
    let user = null;
    let role = null;
    let userEmail = null;

    // --- Check Roles ---
    user = await db.Customer.findOne({ where: { email_address: email } });
    if (user) {
      role = "customer";
      userEmail = user.email_address;
    }

    if (!user) {
      user = await db.Company.findOne({ where: { email_address: email } });
      if (user) {
        role = "company";
        userEmail = user.email_address;
      }
    }

    if (!user) {
      user = await db.Inspector.findOne({ where: { email: email } });
      if (user) {
        role = "inspector";
        userEmail = user.email;
      }
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials.",
      });
    }

    // --- Check Password ---
    const storedPasswordHash =
      role === "company" ? user.password_hash : user.password;
    const isPasswordValid = await bcrypt.compare(password, storedPasswordHash);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials.",
      });
    }

    // --- Determine userId properly based on role ---
    let userId;
    if (role === "customer") {
      userId = user.customer_id;
    } else if (role === "company") {
      userId = user.id;
    } else if (role === "inspector") {
      userId = user.inspector_id;
    }

    // --- Check Documents for Customer ---
    let hasDocuments = true;
    if (role === "customer") {
      hasDocuments =
        !!user.trade_license_or_legal_document_photo_url &&
        !!user.certificate_photo_url;
    }

    // --- Generate Token ---
    const tokenPayload = { userId, email: userEmail, role, hasDocuments };
    const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: "12h" });

    // --- Prepare fullName and mobileNumber ---
    let fullName = null;
    let mobileNumber = null;

    if (role === "customer") {
      fullName = `${user.firstName} ${user.lastName}`;
      mobileNumber = user.phoneNumber;
    } else if (role === "company") {
      fullName = user.representative_name;
      mobileNumber = user.contact_number;
    } else if (role === "inspector") {
      fullName = `${user.firstName} ${user.lastName}`;
      mobileNumber = user.phone;
    }

    // --- Save to login_sessions (replace old session) ---
    await LoginSession.destroy({ where: { userId } });

    await LoginSession.create({
      userId,
      role,
      token,
      loginTime: new Date(),
      ipAddress: req.ip || req.connection?.remoteAddress || null,
      fullName,
      emailId: userEmail,
      mobileNumber,
    });

    // --- Response User Data ---
    let responseUserData = { id: userId, email: userEmail, role, hasDocuments };

    if (role === "customer") {
      responseUserData.firstName = user.firstName;
      responseUserData.lastName = user.lastName;
      responseUserData.customer_id = user.customer_id;
    } else if (role === "company") {
      responseUserData.companyName = user.company_name;
      responseUserData.representativeName = user.representative_name;
      responseUserData.company_id = user.id;
    } else if (role === "inspector") {
      responseUserData.firstName = user.firstName;
      responseUserData.lastName = user.lastName;
      responseUserData.inspector_id = user.inspector_id;
    }

    return res.status(200).json({
      success: true,
      message: "Login successful!",
      token,
      user: responseUserData,
    });
  } catch (err) {
    console.error("❌ Login error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
