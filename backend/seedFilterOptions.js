require("dotenv").config();
const sequelize = require("./config/database");
const { FilterOption } = require("./modules/filterOptions/dbmodels");

const seedData = [
  // Brands
  { type: "brand", value: "Dell", display_order: 1 },
  { type: "brand", value: "HP", display_order: 2 },
  { type: "brand", value: "Lenovo", display_order: 3 },
  { type: "brand", value: "Apple", display_order: 4 },
  { type: "brand", value: "ASUS", display_order: 5 },
  { type: "brand", value: "Acer", display_order: 6 },
  { type: "brand", value: "Samsung", display_order: 7 },
  // Processors
  { type: "processor", value: "Intel Core i3", display_order: 1 },
  { type: "processor", value: "Intel Core i5", display_order: 2 },
  { type: "processor", value: "Intel Core i7", display_order: 3 },
  { type: "processor", value: "Intel Core i9", display_order: 4 },
  { type: "processor", value: "AMD Ryzen 5", display_order: 5 },
  { type: "processor", value: "AMD Ryzen 7", display_order: 6 },
  { type: "processor", value: "Apple M1", display_order: 7 },
  { type: "processor", value: "Apple M2", display_order: 8 },
  { type: "processor", value: "Apple M3", display_order: 9 },
  // RAM
  { type: "ram", value: "4 GB", display_order: 1 },
  { type: "ram", value: "8 GB", display_order: 2 },
  { type: "ram", value: "16 GB", display_order: 3 },
  { type: "ram", value: "32 GB", display_order: 4 },
  { type: "ram", value: "64 GB", display_order: 5 },
  // Storage
  { type: "storage", value: "128 GB SSD", display_order: 1 },
  { type: "storage", value: "256 GB SSD", display_order: 2 },
  { type: "storage", value: "512 GB SSD", display_order: 3 },
  { type: "storage", value: "1 TB SSD", display_order: 4 },
  { type: "storage", value: "1 TB HDD", display_order: 5 },
  { type: "storage", value: "2 TB HDD", display_order: 6 },
];

async function seed() {
  try {
    await sequelize.sync({ alter: true });
    console.log("Database synced.");

    for (const item of seedData) {
      await FilterOption.findOrCreate({
        where: { type: item.type, value: item.value },
        defaults: item,
      });
    }

    console.log("Filter options seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Seed error:", err);
    process.exit(1);
  }
}

seed();
