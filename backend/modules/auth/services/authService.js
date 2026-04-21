const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const authRepository = require("../repositories/authRepository");

exports.handleLogin = async ({ email_or_phone, password }) => {
  if (!email_or_phone || !password) {
    return { status: 400, payload: { success: false, message: "Email/phone and password are required!", data: null, error: {} } };
  }

  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email_or_phone);
  const isPhone = /^\d{10}$/.test(email_or_phone);

  if (!isEmail && !isPhone) {
    return { status: 400, payload: { success: false, message: "Invalid email or phone format!", data: null, error: {} } };
  }

  try {
    const user = await authRepository.findUserByEmailOrPhone(email_or_phone, isEmail);

    if (!user) {
      return { status: 401, payload: { success: false, message: isEmail ? "Invalid Email!" : "Invalid Phone Number!", data: null, error: {} } };
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return { status: 401, payload: { success: false, message: "Incorrect Password!", data: null, error: {} } };
    }

    const token = jwt.sign(
      {
        user_id: user.user_id,
        email: user.email,
        phone: user.phone,
        role: user.role,
        first_name: user.first_name,
        last_name: user.last_name,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return {
      status: 200,
      payload: {
        success: true,
        message: "Login successful!",
        data: { token },
        error: null,
      },
    };
  } catch (err) {
    return { status: 500, payload: { success: false, message: "Server error during login!", data: null, error: { message: err.message } } };
  }
};

exports.handleRegister = async (data) => {
  const { email, password, phone, first_name, last_name = "", role } = data;
  const userRole = role || "user";
  const required = ["email", "password", "phone", "first_name"];
  const missing = required.filter((key) => !data[key]);

  if (missing.length > 0) {
    return {
      status: 400,
      payload: {
        success: false,
        message: `Missing required field(s): ${missing.join(", ")}`,
        data: null,
        error: {},
      },
    };
  }
 
  try {
    const existing = await authRepository.checkUserExists(email, phone);

    if (existing) {
      return {
        status: 409,
        payload: {
          success: false,
          message: existing.email === email ? "Email already in use!" : "Phone number already in use!",
          data: null,
          error: {},
        },
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user_id = uuidv4();
    await authRepository.createUser({
      user_id,
      email,
      hashedPassword,
      phone,
      first_name,
      last_name,
      role: userRole,
    });
     
    return {
      status: 201,
      payload: {
        success: true,
        message: "User registered successfully!",
        data: { user_id },
        error: null,
      },
    };
  } catch (err) {
    return {
      status: 500,
      payload: {
        success: false,
        message: "Server error during registration!",
        data: null,
        error: { message: err.message },
      },
    };
  }
};
