require("dotenv").config();
const sequelize = require("./config/database");
const { GeneralProductInfo, DetailedSpecifications } = require("./modules/product/dbmodels");

const laptopImages = [
  "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?w=600&h=400&fit=crop",
];

const generateProducts = () => {
  const categories = [
    { name: "Gaming",            brands: ["MSI",     "ASUS",    "Acer",    "Lenovo",  "Dell"   ] },
    { name: "Business",          brands: ["Dell",    "HP",      "Lenovo",  "Apple",   "ASUS"   ] },
    { name: "Student",           brands: ["Acer",    "HP",      "Lenovo",  "ASUS",    "Dell"   ] },
    { name: "Ultrabook",         brands: ["Apple",   "Dell",    "HP",      "Lenovo",  "Samsung"] },
    { name: "Creative",          brands: ["Apple",   "MSI",     "ASUS",    "Dell",    "HP"     ] },
    { name: "Workstation",       brands: ["Dell",    "HP",      "Lenovo",  "MSI",     "ASUS"   ] },
    { name: "Budget",            brands: ["Acer",    "HP",      "Lenovo",  "Dell",    "ASUS"   ] },
    { name: "Premium",           brands: ["Apple",   "Dell",    "Samsung", "HP",      "Lenovo" ] },
    { name: "2-in-1 Convertible",brands: ["HP",      "Lenovo",  "Dell",    "ASUS",    "Acer"   ] },
    { name: "Chromebook",        brands: ["Samsung", "Acer",    "HP",      "ASUS",    "Lenovo" ] },
  ];

  const specsByCat = {
    Gaming:             { processors: ["Intel Core i7","Intel Core i9","AMD Ryzen 7","Intel Core i7","AMD Ryzen 7"], rams: ["16 GB","32 GB","16 GB","32 GB","16 GB"], storages: ["512 GB SSD","1 TB SSD","1 TB SSD","512 GB SSD","1 TB SSD"], screens: [15.6,17.3,15.6,16,15.6], basePrice: 55000 },
    Business:           { processors: ["Intel Core i5","Intel Core i7","Intel Core i5","Apple M1","Intel Core i7"], rams: ["8 GB","16 GB","8 GB","8 GB","16 GB"], storages: ["256 GB SSD","512 GB SSD","256 GB SSD","256 GB SSD","512 GB SSD"], screens: [14,14,15.6,13.3,14], basePrice: 38000 },
    Student:            { processors: ["Intel Core i3","Intel Core i5","AMD Ryzen 5","Intel Core i3","Intel Core i5"], rams: ["4 GB","8 GB","8 GB","4 GB","8 GB"], storages: ["256 GB SSD","256 GB SSD","512 GB SSD","128 GB SSD","256 GB SSD"], screens: [15.6,14,15.6,14,15.6], basePrice: 22000 },
    Ultrabook:          { processors: ["Apple M2","Intel Core i7","Intel Core i5","Intel Core i7","Intel Core i5"], rams: ["8 GB","16 GB","8 GB","16 GB","8 GB"], storages: ["256 GB SSD","512 GB SSD","256 GB SSD","512 GB SSD","256 GB SSD"], screens: [13.3,13.3,14,14,13.3], basePrice: 45000 },
    Creative:           { processors: ["Apple M2","Intel Core i9","Intel Core i7","AMD Ryzen 7","Intel Core i7"], rams: ["16 GB","32 GB","16 GB","32 GB","16 GB"], storages: ["512 GB SSD","1 TB SSD","512 GB SSD","1 TB SSD","512 GB SSD"], screens: [16,15.6,15.6,16,15.6], basePrice: 62000 },
    Workstation:        { processors: ["Intel Core i9","Intel Core i9","AMD Ryzen 7","Intel Core i9","AMD Ryzen 7"], rams: ["32 GB","64 GB","32 GB","64 GB","32 GB"], storages: ["1 TB SSD","2 TB HDD","1 TB SSD","1 TB SSD","2 TB HDD"], screens: [15.6,17.3,15.6,17.3,15.6], basePrice: 78000 },
    Budget:             { processors: ["Intel Core i3","Intel Core i3","AMD Ryzen 5","Intel Core i3","Intel Core i3"], rams: ["4 GB","4 GB","8 GB","4 GB","4 GB"], storages: ["128 GB SSD","256 GB SSD","256 GB SSD","128 GB SSD","256 GB SSD"], screens: [15.6,14,15.6,14,15.6], basePrice: 15000 },
    Premium:            { processors: ["Apple M2","Intel Core i7","Intel Core i7","Intel Core i9","Intel Core i7"], rams: ["16 GB","32 GB","16 GB","32 GB","16 GB"], storages: ["512 GB SSD","1 TB SSD","512 GB SSD","1 TB SSD","512 GB SSD"], screens: [14,15.6,15.6,16,14], basePrice: 72000 },
    "2-in-1 Convertible":{ processors: ["Intel Core i5","Intel Core i7","Intel Core i5","Intel Core i7","Intel Core i5"], rams: ["8 GB","16 GB","8 GB","16 GB","8 GB"], storages: ["256 GB SSD","512 GB SSD","256 GB SSD","512 GB SSD","256 GB SSD"], screens: [13.3,14,13.3,14,13.3], basePrice: 35000 },
    Chromebook:         { processors: ["Intel Core i3","Intel Core i3","Intel Core i3","Intel Core i3","Intel Core i3"], rams: ["4 GB","8 GB","4 GB","8 GB","4 GB"], storages: ["128 GB SSD","128 GB SSD","128 GB SSD","128 GB SSD","128 GB SSD"], screens: [14,14,14,11.6,14], basePrice: 12000 },
  };

  const modelNames = {
    Gaming:              ["Raider GE76","ROG Strix G15","Predator Helios 300","Legion 5 Pro","G15 Gaming"],
    Business:            ["Latitude 5540","ProBook 450 G10","ThinkPad T14s","MacBook Air M1","ExpertBook B5"],
    Student:             ["Aspire 5 A515","Pavilion 15-eg","IdeaPad Slim 3","VivoBook 15","Inspiron 15 3520"],
    Ultrabook:           ["MacBook Air M2","XPS 13 Plus","Spectre x360 14","Yoga 9i","Galaxy Book3 Pro"],
    Creative:            ["MacBook Pro 16 M2","Creator Z16","ProArt Studiobook","Precision 5570","ZBook Studio G9"],
    Workstation:         ["Precision 7770","ZBook Fury 16","ThinkPad P16","Creator M16","ProArt Studiobook Pro"],
    Budget:              ["Aspire 3 A315","HP 250 G9","V15 Gen 4","Inspiron 14","VivoBook Go 15"],
    Premium:             ["MacBook Pro 14 M2","XPS 15 9530","Galaxy Book3 Ultra","Spectre 16","Yoga Pro 9i"],
    "2-in-1 Convertible":["Envy x360 15","Yoga 7i 14","Inspiron 14 2-in-1","ZenBook Flip 14","Spin 5 SP514"],
    Chromebook:          ["Galaxy Chromebook 4","Chromebook 314","Chromebook x360","Chromebook CX1","IdeaPad Duet 5"],
  };

  const colors = ["Space Gray", "Silver", "Mystic Black", "Platinum", "Midnight Blue"];

  const products = [];
  let productNumber = 1;
  const now = Date.now();

  const inStockIndices = [1, 6, 11, 16, 21, 26, 31, 36, 41, 46];

  categories.forEach((cat, catIdx) => {
    for (let i = 0; i < 5; i++) {
      const brand = cat.brands[i];
      const specs = specsByCat[cat.name];
      const processor = specs.processors[i];
      const ram = specs.rams[i];
      const storage = specs.storages[i];
      const screen = specs.screens[i];
      const color = colors[i];
      const modelLabel = modelNames[cat.name][i];

      const in_stock = inStockIndices.includes(productNumber);

      let priceOffset = (i * 2500) + (catIdx * 800);
      if (brand === "Apple") priceOffset += 18000;
      const price = specs.basePrice + priceOffset;
      const mrp = price + Math.round(price * 0.18);

      let type = "new_arrival";
      if (productNumber <= 12) type = "featured";
      else if (productNumber <= 28) type = "bestseller";

      const gen = processor.includes("i3") ? "10th Gen"
        : processor.includes("i5") ? "11th Gen"
        : processor.includes("i7") ? "12th Gen"
        : processor.includes("i9") ? "13th Gen"
        : "Latest";

      const graphics = brand === "Apple"
        ? "Apple Integrated GPU"
        : processor.includes("i9") || processor.includes("i7") || processor.includes("Ryzen 7")
          ? "NVIDIA GeForce RTX 3060"
          : "Intel UHD Graphics";

      const imgIdx1 = (productNumber - 1) % laptopImages.length;
      const imgIdx2 = productNumber % laptopImages.length;

      const addedDate = new Date(now - ((productNumber % 25) * 24 * 60 * 60 * 1000));

      products.push({
        generalInfo: {
          model_name: `${brand} ${modelLabel}`,
          model_number: `${brand.toUpperCase().replace(/\s/g, "")}-${cat.name.toUpperCase().replace(/[\s-]/g, "").slice(0, 3)}-${String(productNumber).padStart(3, "0")}`,
          brand_name: brand,
          images: [laptopImages[imgIdx1], laptopImages[imgIdx2]],
          color,
          ram,
          processor,
          storage,
          generation: gen,
          graphics,
          in_stock,
          price,
          mrp,
          type,
          category: cat.name,
          added_date: addedDate,
        },
        specifications: {
          screen_size: screen,
          processor_info: `${processor} ${gen}`,
          os_info: brand === "Apple" ? "macOS Ventura" : "Windows 11 Home",
          display_info: `${screen}" ${screen >= 15 ? "Full HD (1920x1080)" : "QHD (2560x1600)"} IPS Display`,
          graphics_info: graphics,
          wifi_bt_info: "Wi-Fi 6E, Bluetooth 5.2",
          memory_storage: `${ram} DDR5 RAM, ${storage}`,
          camera_info: screen >= 15 ? "1080p FHD Webcam with IR" : "720p HD Webcam",
          keyboard_info: cat.name === "Gaming" ? "RGB Backlit Mechanical Keyboard" : "Backlit Keyboard",
          weight: `${screen <= 14 ? "1" : "2"}.${(productNumber % 5) + 2} kg`,
          special_feature: cat.name === "Gaming"
            ? "RGB Lighting, High-Refresh Display, Advanced Cooling"
            : cat.name === "2-in-1 Convertible"
            ? "360° Hinge, Touch Screen, Stylus Support"
            : "Fingerprint Reader, Thunderbolt 4, USB-C",
          benefits: [
            { key: "7_day_replacement", label: "7 Days Replacement" },
            { key: "free_delivery", label: "Free Delivery" },
            { key: "pay_on_delivery", label: "Pay On Delivery" },
            { key: "2_year_warranty", label: "2 Year Warranty" },
          ],
        },
      });

      productNumber++;
    }
  });

  return products;
};

const seedDatabase = async () => {
  try {
    console.log("Connecting to database...");
    await sequelize.authenticate();
    console.log("Database connected successfully");

    console.log("Syncing database models...");
    await sequelize.sync({ alter: true });
    console.log("Database models synced");

    const existingProducts = await GeneralProductInfo.count();
    const forceSeed = String(process.env.FORCE_SEED || "").toLowerCase() === "true";
    if (existingProducts > 0 && !forceSeed) {
      console.log(`Found ${existingProducts} existing products. Skipping seed.`);
      console.log("To re-seed, run with: FORCE_SEED=true node seedData.js");
      process.exit(0);
    }

    if (existingProducts > 0 && forceSeed) {
      console.log(`FORCE_SEED enabled. Deleting ${existingProducts} existing products...`);
      await DetailedSpecifications.destroy({ where: {}, truncate: true });
      await GeneralProductInfo.destroy({ where: {}, truncate: true });
      console.log("Existing product data cleared.");
    }

    console.log("Starting to seed 50 products across 10 categories...");
    const products = generateProducts();

    const createdProducts = [];
    let created = 0;
    for (const product of products) {
      try {
        const generalProduct = await GeneralProductInfo.create(product.generalInfo);
        await DetailedSpecifications.create({
          ...product.specifications,
          product_id: generalProduct.product_id,
        });
        createdProducts.push({
          product_id: generalProduct.product_id,
          model_name: generalProduct.model_name,
          brand_name: generalProduct.brand_name,
          processor: generalProduct.processor,
          ram: generalProduct.ram,
          storage: generalProduct.storage,
          price: generalProduct.price,
          mrp: generalProduct.mrp,
          in_stock: generalProduct.in_stock,
          category: generalProduct.category,
          images: generalProduct.images,
        });
        created++;
        if (created % 10 === 0) {
          console.log(`  Created ${created}/${products.length} products...`);
        }
      } catch (error) {
        console.error(`  Error creating product ${product.generalInfo.model_name}:`, error.message);
      }
    }

    console.log(`\nSuccessfully seeded ${created} products!`);
    console.log("Categories: Gaming, Business, Student, Ultrabook, Creative, Workstation, Budget, Premium, 2-in-1 Convertible, Chromebook");
    console.log(`In stock: ${createdProducts.filter(p => p.in_stock).length} | Out of stock: ${createdProducts.filter(p => !p.in_stock).length}`);

    // Output cart and wishlist seed data for frontend localStorage
    const cartItems = createdProducts.filter(p => p.in_stock).slice(0, 5).map(p => ({
      product_id: p.product_id,
      name: p.model_name,
      brand: p.brand_name,
      processor: p.processor,
      ram: p.ram,
      storage: p.storage,
      price: p.price,
      mrp: p.mrp,
      image: p.images[0],
      quantity: 1,
    }));

    const wishlistItems = createdProducts.slice(5, 10).map(p => ({
      product_id: p.product_id,
      name: p.model_name,
      brand: p.brand_name,
      processor: p.processor,
      ram: p.ram,
      storage: p.storage,
      price: p.price,
      mrp: p.mrp,
      image: p.images[0],
      addedAt: new Date().toISOString(),
    }));

    console.log("\n--- CART SEED DATA (paste in browser console) ---");
    console.log(`localStorage.setItem("refurbLap_cart", '${JSON.stringify(cartItems)}');`);
    console.log("\n--- WISHLIST SEED DATA (paste in browser console) ---");
    console.log(`localStorage.setItem("refurbLap_wishlist", '${JSON.stringify(wishlistItems)}');`);
    console.log("\nAfter pasting both lines, refresh the page (Ctrl+R).");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error.message);
    if (error.message.includes("Access denied")) {
      console.error("\nDatabase connection error. Please check:");
      console.error("  1. MySQL is running");
      console.error("  2. DB_PASSWORD is set correctly in .env file");
      console.error("  3. Database 'refurbished_laptops' exists");
    }
    process.exit(1);
  }
};

seedDatabase();
