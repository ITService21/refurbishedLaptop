import {
  FaHome,
  FaInfoCircle,
  FaBoxOpen,
  FaEnvelope,
  FaUsers,
  FaBullseye,
  FaStore,
  FaLightbulb,
} from "react-icons/fa";

export const NavbarLinks = [
  {
    name: "HOME",
    link: "/home",
    icon: FaHome,
    subLinks: [],
    class: "",
  },
  {
    name: "ABOUT US",
    link: "/about-us",
    icon: FaInfoCircle,
    class: "",
    dropdownType: "about",
    subLinks: [
      {
        name: "Who We Are",
        link: "/about/who-we-are",
        icon: FaUsers,
        description: "Learn about our story, values, and what drives us forward.",
      },
      {
        name: "Our Mission & Vision",
        link: "/about/mission-vision",
        icon: FaBullseye,
        description: "Discover our mission to make tech accessible for everyone.",
      },
      {
        name: "Our Store",
        link: "/about/our-store",
        icon: FaStore,
        description: "Visit our physical store and experience our products.",
      },
      {
        name: "Why Choose Us",
        link: "/about/why-choose-us",
        icon: FaLightbulb,
        description: "Quality assured, warranty backed, trusted by thousands.",
      },
    ],
  },
  {
    name: "PRODUCTS",
    link: "/products",
    class: "",
    icon: FaBoxOpen,
    dropdownType: "products",
    subLinks: [],
  },
  {
    name: "CONTACT US",
    link: "/contact-us",
    class: "",
    icon: FaEnvelope,
    subLinks: [],
  },
];

export default NavbarLinks;
