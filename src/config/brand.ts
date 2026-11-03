export interface BrandConfig {
  name: string;
  tagline: string;
  websiteService: string;
  phone: string;
  phoneDisplay: string;
  whatsappLink: string;
  instagramUsername: string;
  instagramProfile: string;
  colors: {
    bhagvaOrange: string;
    brightOrange: string;
    deepBlack: string;
    midnightNavy: string;
    white: string;
    festiveGold: string;
    goldLight: string;
    glow: string;
  };
}

export const BRAND: BrandConfig = {
  name: "ASAI LABS",
  tagline: "Your Vision. Our Creation.",
  websiteService: "Professional website design and development.",
  phone: "+919352089550",
  phoneDisplay: "+91 93520 89550",
  whatsappLink: "https://wa.me/919352089550",
  instagramUsername: "@asailabs",
  instagramProfile: "https://www.instagram.com/asailabs/",
  colors: {
    bhagvaOrange: "#FF6A00",
    brightOrange: "#FF8A00",
    deepBlack: "#07090D",
    midnightNavy: "#0B1422",
    white: "#F5F7FA",
    festiveGold: "#FFD166",
    goldLight: "#FFE29F",
    glow: "#FFAA00",
  },
};

export const FESTIVAL_DATA = {
  dhanteras: {
    id: "dhanteras",
    route: "/dhanteras",
    title: "Happy Dhanteras",
    hindiTitle: "शुभ धनतेरस",
    subheading: "Festival of Wealth, Health & Divine Prosperity",
    message: "May this Dhanteras bring happiness, prosperity, good health and new opportunities into your life.",
    signaturePrefix: "Warm wishes from",
    defaultSender: "ASAI LABS",
    shareMessageTemplate: (name: string, url: string) =>
      `Shubh Dhanteras! 🪔 I have a special greeting for you. Open this link: ${url}`,
    theme: {
      primaryColor: "#FF8A00",
      accentColor: "#FFD166",
      bgGradient: "from-[#07090D] via-[#1A1208] to-[#07090D]",
      ambientColor: "rgba(255, 170, 0, 0.15)",
    },
  },
  diwali: {
    id: "diwali",
    route: "/diwali",
    title: "Happy Diwali",
    hindiTitle: "शुभ दीपावली",
    subheading: "Festival of Lights, Hope & Triumphant Joy",
    message: "May your life shine with happiness, peace, prosperity and endless possibilities. Wishing you and your family a beautiful Diwali!",
    signaturePrefix: "With warm wishes from",
    defaultSender: "ASAI LABS",
    shareMessageTemplate: (name: string, url: string) =>
      `Hey! ✨ I have a special Diwali greeting for you. Open this link and see! ${url}`,
    theme: {
      primaryColor: "#FF6A00",
      accentColor: "#FFD166",
      bgGradient: "from-[#07090D] via-[#0D0B1C] to-[#07090D]",
      ambientColor: "rgba(255, 106, 0, 0.18)",
    },
  },
};
