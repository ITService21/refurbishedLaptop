/**
 * Utility script to find admin users in the database.
 * Run: node findAdminUsers.js
 *
 * Note: Passwords are bcrypt-hashed and cannot be recovered.
 * If you need to reset a password, use the resetAdminPassword flag below.
 */

require("dotenv").config();
const sequelize = require("./config/database");

const RESET_PASSWORD = process.argv.includes("--reset");
const NEW_PASSWORD = process.argv[process.argv.indexOf("--password") + 1] || "Admin@123";

async function findAdminUsers() {
  try {
    await sequelize.authenticate();
    console.log("Connected to database.\n");

    const [admins] = await sequelize.query(
      `SELECT user_id, first_name, last_name, email, phone, role, registered_date FROM users WHERE role = 'admin'`
    );

    if (admins.length === 0) {
      console.log("No admin users found in the database.");
      console.log("\nTo create an admin user, you can:");
      console.log("1. Register a normal user via the app");
      console.log("2. Then run: UPDATE users SET role = 'admin' WHERE email = 'your@email.com';");
      console.log("\nOr run this script with --create to create a default admin:");
      
      if (process.argv.includes("--create")) {
        const bcrypt = require("bcrypt");
        const { v4: uuidv4 } = require("uuid");
        const hashedPassword = await bcrypt.hash("Admin@123", 10);
        const userId = uuidv4();
        
        await sequelize.query(
          `INSERT INTO users (user_id, first_name, last_name, email, phone, password, role, registered_date, createdAt, updatedAt) 
           VALUES (?, 'Admin', 'User', 'admin@laptoprefurbished.in', '9999999999', ?, 'admin', NOW(), NOW(), NOW())`,
          { replacements: [userId, hashedPassword] }
        );
        console.log("\n✅ Admin user created!");
        console.log("   Email: admin@laptoprefurbished.in");
        console.log("   Phone: 9999999999");
        console.log("   Password: Admin@123");
      }
    } else {
      console.log(`Found ${admins.length} admin user(s):\n`);
      admins.forEach((admin, i) => {
        console.log(`--- Admin ${i + 1} ---`);
        console.log(`  Name:  ${admin.first_name} ${admin.last_name}`);
        console.log(`  Email: ${admin.email}`);
        console.log(`  Phone: ${admin.phone}`);
        console.log(`  Role:  ${admin.role}`);
        console.log(`  ID:    ${admin.user_id}`);
        console.log(`  Since: ${admin.registered_date || "N/A"}`);
        console.log("");
      });

      console.log("Note: Passwords are bcrypt-hashed and cannot be recovered.");

      if (RESET_PASSWORD) {
        const bcrypt = require("bcrypt");
        const hashedPassword = await bcrypt.hash(NEW_PASSWORD, 10);
        
        for (const admin of admins) {
          await sequelize.query(
            `UPDATE users SET password = ? WHERE user_id = ?`,
            { replacements: [hashedPassword, admin.user_id] }
          );
          console.log(`\n✅ Password reset for ${admin.email} to: ${NEW_PASSWORD}`);
        }
      } else {
        console.log("\nTo reset an admin password, run:");
        console.log("  node findAdminUsers.js --reset --password YourNewPassword123");
      }
    }

    process.exit(0);
  } catch (err) {
    console.error("Error:", err.message);
    process.exit(1);
  }
}

findAdminUsers();
