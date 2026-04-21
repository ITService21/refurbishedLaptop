/**
 * Script to create/update vaishali@laptop.com as admin user.
 * Run: node makeVaishaliAdmin.js
 */

require("dotenv").config();
const sequelize = require("./config/database");

async function makeVaishaliAdmin() {
  try {
    await sequelize.authenticate();
    console.log("Connected to database.\n");

    const bcrypt = require("bcrypt");
    const { v4: uuidv4 } = require("uuid");
    const email = "vaishali@laptop.com";
    const phone = "1234543210";
    const password = "1234543210";
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if user exists
    const [existing] = await sequelize.query(
      `SELECT user_id, email, role FROM users WHERE email = ? OR phone = ?`,
      { replacements: [email, phone] }
    );

    if (existing.length > 0) {
      // Update existing user to admin and reset password
      const user = existing[0];
      await sequelize.query(
        `UPDATE users SET role = 'admin', password = ?, phone = ? WHERE user_id = ?`,
        { replacements: [hashedPassword, phone, user.user_id] }
      );
      console.log(`✅ User ${user.email} updated to admin.`);
      console.log(`   Email: ${email}`);
      console.log(`   Phone: ${phone}`);
      console.log(`   Password: ${password}`);
    } else {
      // Create new admin user
      const userId = uuidv4();
      await sequelize.query(
        `INSERT INTO users (user_id, first_name, last_name, email, phone, password, role, registered_date, createdAt, updatedAt) 
         VALUES (?, 'Vaishali', 'Admin', ?, ?, ?, 'admin', NOW(), NOW(), NOW())`,
        { replacements: [userId, email, phone, hashedPassword] }
      );
      console.log(`✅ Admin user created!`);
      console.log(`   Email: ${email}`);
      console.log(`   Phone: ${phone}`);
      console.log(`   Password: ${password}`);
    }

    process.exit(0);
  } catch (err) {
    console.error("Error:", err.message);
    process.exit(1);
  }
}

makeVaishaliAdmin();
