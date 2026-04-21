import React from "react";
import { SEO_DEFAULTS, COMPANY } from "../../config/constants";

/**
 * SEO Head Component - Manages all meta tags for SEO
 * Uses document.head manipulation for React without react-helmet
 */
const SEOHead = ({
  title,
  description,
  keywords,
  canonical,
  ogImage,
  ogType = "website",
  noIndex = false,
  structuredData,
  product, // For product pages
}) => {
  React.useEffect(() => {
    // Set document title
    const fullTitle = title
      ? SEO_DEFAULTS.titleTemplate.replace("%s", title)
      : SEO_DEFAULTS.title;
    document.title = fullTitle;

    // Helper to update or create meta tag
    const setMetaTag = (name, content, property = false) => {
      if (!content) return;
      const attr = property ? "property" : "name";
      let element = document.querySelector(`meta[${attr}="${name}"]`);
      if (element) {
        element.setAttribute("content", content);
      } else {
        element = document.createElement("meta");
        element.setAttribute(attr, name);
        element.setAttribute("content", content);
        document.head.appendChild(element);
      }
    };

    // Helper to set or update link tag
    const setLinkTag = (rel, href) => {
      if (!href) return;
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (element) {
        element.setAttribute("href", href);
      } else {
        element = document.createElement("link");
        element.setAttribute("rel", rel);
        element.setAttribute("href", href);
        document.head.appendChild(element);
      }
    };

    // Basic Meta Tags
    setMetaTag("description", description || SEO_DEFAULTS.description);
    setMetaTag("keywords", keywords || SEO_DEFAULTS.keywords);
    setMetaTag("author", SEO_DEFAULTS.author);
    setMetaTag("robots", noIndex ? "noindex, nofollow" : SEO_DEFAULTS.robots);

    // Canonical URL
    setLinkTag("canonical", canonical || SEO_DEFAULTS.canonical);

    // Open Graph Tags
    setMetaTag("og:title", fullTitle, true);
    setMetaTag("og:description", description || SEO_DEFAULTS.description, true);
    setMetaTag("og:type", ogType, true);
    setMetaTag("og:url", canonical || window.location.href, true);
    setMetaTag("og:site_name", SEO_DEFAULTS.og.siteName, true);
    setMetaTag("og:locale", SEO_DEFAULTS.og.locale, true);
    if (ogImage) setMetaTag("og:image", ogImage, true);

    // Twitter Card Tags
    setMetaTag("twitter:card", SEO_DEFAULTS.twitter.card);
    setMetaTag("twitter:site", SEO_DEFAULTS.twitter.site);
    setMetaTag("twitter:creator", SEO_DEFAULTS.twitter.creator);
    setMetaTag("twitter:title", fullTitle);
    setMetaTag("twitter:description", description || SEO_DEFAULTS.description);
    if (ogImage) setMetaTag("twitter:image", ogImage);

    // Product-specific meta tags
    if (product) {
      setMetaTag("product:price:amount", product.price, true);
      setMetaTag("product:price:currency", "INR", true);
      setMetaTag("product:availability", product.inStock ? "in stock" : "out of stock", true);
      setMetaTag("product:brand", product.brand, true);
    }

    // Structured Data (JSON-LD)
    let scriptElement = document.querySelector('script[type="application/ld+json"][data-seo="true"]');
    if (scriptElement) {
      scriptElement.remove();
    }

    const jsonLd = structuredData || getDefaultStructuredData(title, description, product);
    if (jsonLd) {
      scriptElement = document.createElement("script");
      scriptElement.type = "application/ld+json";
      scriptElement.setAttribute("data-seo", "true");
      scriptElement.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(scriptElement);
    }

    // Cleanup function
    return () => {
      const seoScript = document.querySelector('script[type="application/ld+json"][data-seo="true"]');
      if (seoScript) seoScript.remove();
    };
  }, [title, description, keywords, canonical, ogImage, ogType, noIndex, structuredData, product]);

  return null; // This component doesn't render anything
};

/**
 * Generate default structured data based on page type
 */
const getDefaultStructuredData = (title, description, product) => {
  const baseData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: COMPANY.name,
    legalName: COMPANY.legalName,
    url: "https://laptoprefurbished.in",
    logo: "https://laptoprefurbished.in/logo.png",
    description: COMPANY.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: COMPANY.address.street,
      addressLocality: COMPANY.address.city,
      addressRegion: COMPANY.address.state,
      postalCode: COMPANY.address.pincode,
      addressCountry: COMPANY.address.country,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: COMPANY.phone,
      contactType: "customer service",
      email: COMPANY.email,
      availableLanguage: ["English", "Hindi"],
    },
    sameAs: Object.values(COMPANY.social),
  };

  if (product) {
    return {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.name || title,
      description: product.description || description,
      image: product.images,
      brand: {
        "@type": "Brand",
        name: product.brand,
      },
      sku: product.modelNumber,
      offers: {
        "@type": "Offer",
        url: window.location.href,
        priceCurrency: "INR",
        price: product.price,
        priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        availability: product.inStock
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
        seller: {
          "@type": "Organization",
          name: COMPANY.name,
        },
      },
      ...(product.rating && {
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: product.rating,
          reviewCount: product.reviewCount || 0,
        },
      }),
    };
  }

  return baseData;
};

/**
 * Breadcrumb structured data component
 */
export const BreadcrumbSchema = ({ items }) => {
  React.useEffect(() => {
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    };

    const scriptElement = document.createElement("script");
    scriptElement.type = "application/ld+json";
    scriptElement.setAttribute("data-breadcrumb", "true");
    scriptElement.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(scriptElement);

    return () => {
      const el = document.querySelector('script[data-breadcrumb="true"]');
      if (el) el.remove();
    };
  }, [items]);

  return null;
};

/**
 * FAQ structured data component
 */
export const FAQSchema = ({ faqs }) => {
  React.useEffect(() => {
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    };

    const scriptElement = document.createElement("script");
    scriptElement.type = "application/ld+json";
    scriptElement.setAttribute("data-faq", "true");
    scriptElement.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(scriptElement);

    return () => {
      const el = document.querySelector('script[data-faq="true"]');
      if (el) el.remove();
    };
  }, [faqs]);

  return null;
};

export default SEOHead;



