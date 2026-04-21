import React from "react";
import { Link } from "react-router-dom";
import {
  Shield,
  Truck,
  RefreshCw,
  Award,
  Users,
  Target,
  CheckCircle,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import SEOHead from "../Components/SEO/SEOHead";
import { COMPANY } from "../config/constants";

const About = () => {
  const stats = [
    { number: "10,000+", label: "Happy Customers" },
    { number: "50+", label: "Cities Served" },
    { number: "5,000+", label: "Laptops Delivered" },
    { number: "98%", label: "Customer Satisfaction" },
  ];

  const values = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Quality Assurance",
      description:
        "Every laptop undergoes a rigorous 40-point quality check to ensure premium performance and reliability.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Customer First",
      description:
        "Our customers are at the heart of everything we do. We're committed to providing exceptional service.",
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Transparency",
      description:
        "Complete transparency in product condition, specifications, and pricing. No hidden surprises.",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Sustainability",
      description:
        "By choosing refurbished, you're contributing to reducing e-waste and protecting our environment.",
    },
  ];

  const whyChooseUs = [
    "Certified Refurbished Laptops with 40-Point Quality Check",
    "2 Year Comprehensive Warranty on All Products",
    "Free Delivery Across India",
    "7 Days Easy Replacement Policy",
    "COD & Multiple Payment Options Available",
    "Dedicated Customer Support Team",
    "Genuine Products from Top Brands",
    "Best Prices Guaranteed",
  ];

  const team = [
    {
      name: "Rajesh Kumar",
      role: "Founder & CEO",
      image: "/OurTeam/1.png",
    },
    {
      name: "Priya Sharma",
      role: "Operations Head",
      image: "/OurTeam/2.png",
    },
    {
      name: "Amit Singh",
      role: "Technical Lead",
      image: "/OurTeam/3.png",
    },
    {
      name: "Neha Gupta",
      role: "Customer Success",
      image: "/OurTeam/4.png",
    },
  ];

  return (
    <>
      <SEOHead
        title="About Us - Our Story & Mission"
        description={`${COMPANY.name} is India's trusted destination for certified refurbished laptops. Based in Jaipur, Rajasthan, we deliver premium quality laptops across India with 2-year warranty and free delivery.`}
        keywords="about laptop refurbished, refurbished laptop company, certified laptops india, laptop company jaipur"
        canonical="https://laptoprefurbished.in/about"
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-cyan-600 to-teal-600 text-white py-16 md:py-24 mt-[60px]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              About {COMPANY.name}
            </h1>
            <p className="text-lg md:text-xl opacity-90 leading-relaxed">
              Your trusted partner for premium certified refurbished laptops.
              Based in Jaipur, Rajasthan, we serve customers across India with
              quality products and exceptional service.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-cyan-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Founded in {COMPANY.established}, {COMPANY.name} started with
                  a simple mission: to make quality technology accessible to
                  everyone. We noticed that many perfectly functional laptops
                  were being discarded while countless students and
                  professionals couldn't afford new devices.
                </p>
                <p>
                  Based in the historic city of Jaipur, Rajasthan, we've grown
                  from a small operation to one of India's trusted destinations
                  for certified refurbished laptops. Our team of skilled
                  technicians ensures that every laptop meets our stringent
                  quality standards before reaching our customers.
                </p>
                <p>
                  Today, we're proud to serve customers across all of India,
                  delivering premium laptops from top brands like Dell, HP,
                  Lenovo, and Apple at prices that make sense. Our commitment to
                  quality, transparency, and customer satisfaction has earned us
                  the trust of thousands of happy customers.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="/About/1.png"
                alt="About Laptop Refurbished"
                className="w-full rounded-lg shadow-xl"
                loading="lazy"
              />
              <div className="absolute -bottom-6 -left-6 bg-cyan-600 text-white p-6 rounded-lg shadow-lg hidden md:block">
                <div className="text-3xl font-bold">Since</div>
                <div className="text-4xl font-bold">{COMPANY.established}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Our Core Values
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do and define who we are as a
              company.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition text-center"
              >
                <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4 text-cyan-600">
                  {value.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div className="order-2 md:order-1">
              <img
                src="/About/2.png"
                alt="Quality Laptops"
                className="w-full rounded-lg shadow-xl"
                loading="lazy"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                Why Choose Us?
              </h2>
              <ul className="space-y-4">
                {whyChooseUs.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link
                  to="/products"
                  className="inline-block bg-cyan-600 hover:bg-cyan-700 text-white font-semibold px-8 py-3 rounded-lg transition"
                >
                  Browse Our Collection
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-gray-800 to-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Our Refurbishment Process
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Every laptop goes through our meticulous 40-point quality check
              process
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                step: "01",
                title: "Sourcing",
                desc: "Laptops sourced from verified corporate returns and certified channels",
              },
              {
                step: "02",
                title: "Inspection",
                desc: "Comprehensive 40-point hardware and software inspection",
              },
              {
                step: "03",
                title: "Refurbishment",
                desc: "Component replacement, deep cleaning, and optimization",
              },
              {
                step: "04",
                title: "Quality Check",
                desc: "Final testing and certification before packaging",
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Meet Our Team
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The passionate people behind {COMPANY.name}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-4 group">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full aspect-square object-cover rounded-xl grayscale group-hover:grayscale-0 transition duration-300"
                    loading="lazy"
                  />
                </div>
                <h3 className="font-semibold text-gray-800">{member.name}</h3>
                <p className="text-gray-600 text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 md:py-20 bg-cyan-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Have Questions?
                </h2>
                <p className="text-cyan-100 mb-6">
                  Our team is here to help you find the perfect laptop for your
                  needs. Reach out to us anytime!
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5" />
                    <span>{COMPANY.address.full}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5" />
                    <a href={`tel:${COMPANY.phone}`}>{COMPANY.phone}</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5" />
                    <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
                  </div>
                </div>
              </div>
              <div className="text-center md:text-right">
                <Link
                  to="/contact-us"
                  className="inline-block bg-white text-cyan-600 font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition"
                >
                  Contact Us Today
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
