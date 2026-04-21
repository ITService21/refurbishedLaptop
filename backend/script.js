const Hospital = require('./models/Hospital');
const bcrypt = require('bcryptjs');

async function seedHospitals() {
  const hashedPassword = await bcrypt.hash('12345', 10);

  const hospitals = [
    {
      entity_id: 'superadmin',
      hospital_name: 'Super Admin Hospital',
      email: 'superadmin@hospital.com',
      password: hashedPassword,
      role:"superadmin",
      address: 'HQ - Delhi',
      country_code: '+91',
      phone: '9999999999',
      package: 'Ultimate',
      currency: 'INR',
      social_media_type: 'Facebook',
      social_media_id: 'superadmin_fb',
      login_title: 'Super Admin Login',
      logo: 'https://example.com/logo-superadmin.png',
      payment_gateway: 'Paytm',
      sms_gateway: 'Twilio',
    },
    {
      entity_id: 'Hospital001',
      hospital_name: 'Apollo Delhi',
      email: 'hospital1@gmail.com',
      password: hashedPassword,
      role:"admin",
      address: 'Delhi',
      country_code: '+91',
      phone: '9876543210',
      package: 'Standard',
      currency: 'INR',
      social_media_type: 'Instagram',
      social_media_id: 'apollo_ig',
      login_title: 'Apollo Login',
      logo: 'https://example.com/logo-apollo.png',
      payment_gateway: 'Razorpay',
      sms_gateway: 'TextLocal',
    },
    {
      entity_id: 'Hospital002',
      hospital_name: 'Fortis Mumbai',
      email: 'hospital2@gmail.com',
      password: hashedPassword,
      role:"admin",
      address: 'Mumbai',
      country_code: '+91',
      phone: '9123456789',
      package: 'Premium',
      currency: 'INR',
      social_media_type: 'Twitter',
      social_media_id: 'fortis_tw',
      login_title: 'Fortis Login',
      logo: 'https://example.com/logo-fortis.png',
      payment_gateway: 'PayU',
      sms_gateway: 'MSG91',
    },
  ];

  try {
    await Hospital.bulkCreate(hospitals, { ignoreDuplicates: true });
    console.log('✅ Hospitals seeded successfully');
  } catch (err) {
    console.error('❌ Error seeding hospitals:', err);
  }
}

module.exports = { seedHospitals };
