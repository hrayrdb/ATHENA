import {
  benefitIcon1,
  benefitIcon2,
  benefitIcon3,
  benefitIcon4,
  benefitImage2,
  benefitImage,
  chromecast,
  disc02,
  discord,
  discordBlack,
  facebook,
  figma,
  file02,
  framer,
  homeSmile,
  instagram,
  notification2,
  notification3,
  notification4,
  notion,
  photoshop,
  plusSquare,
  protopie,
  raindrop,
  recording01,
  recording03,
  roadmap1,
  roadmap2,
  roadmap3,
  roadmap4,
  searchMd,
  slack,
  sliders04,
  telegram,
  twitter,
  yourlogo,
} from "../assets";

export const navigation = [
  {
    id: "0",
    title: "About",
    url: "#about",
  },
  // {
  //   id: "1",
  //   title: "Pricing",
  //   url: "#pricing",
  // },
  {
    id: "1",
    title: "Core",
    url: "#core",
  },
  {
    id: "2",
    title: "Features",
    url: "#features",
  },
  {
    id: "3",
    title: "New account",
    url: "#signup",
    onlyMobile: true,
  },
  {
    id: "4",
    title: "Sign in",
    url: "login",
    onlyMobile: true,
  },
];

export const heroIcons = [homeSmile, file02, searchMd, plusSquare];

export const notificationImages = [notification4, notification3, notification2];

export const companyLogos = [yourlogo, yourlogo, yourlogo, yourlogo, yourlogo];

export const brainwaveServices = [
  "Language Model",
  "Prompt Engineering",
  "Knowledge Base",
  "Expert System",
  "Fuzzy Logic",
];

export const brainwaveServicesIcons = [
  recording03,
  recording01,
  disc02,
  chromecast,
  sliders04,
];

export const roadmap = [
  {
    id: "0",
    title: "Facial Emotion Detection",
    text: "Enables athena to understand your face emotion with everything you say, making it easier to understand you and your emotions and reply accordingly.",
    date: "She will see you",
    status: "done",
    imageUrl: roadmap1,
    colorful: true,
  },
  {
    id: "1",
    title: "Voice Emotion Detection",
    text: "Enables athena to understand your voice emotion with everything you say, making it easier to understand you and your emotions and reply accordingly.",
    date: "She will hear you",
    status: "done",
    imageUrl: roadmap2,
  },
  {
    id: "2",
    title: "Based on Real Studies for Diagnosis and Treatment.",
    text: "Athena's knowledge in the matters of depression and anxiety comes from our focus with the help of professional experts.",
    date: "She will help you",
    status: "done",
    imageUrl: roadmap3,
  },
  {
    id: "3",
    title: "This is Only The Beginning",
    text: "The thing about athena is that she will stay updated with more and more mental problems and how to tackle them.",
    date: "She will learn more",
    status: "progress",
    imageUrl: roadmap4,
  },
];

export const collabText =
  "With smart automation and top-notch security, it's the perfect solution for teams looking to work smarter.";

export const collabContent = [
  {
    id: "0",
    title: "Seamless Integration",
    text: collabText,
  },
  {
    id: "1",
    title: "Smart Automation",
  },
  {
    id: "2",
    title: "Top-notch Security",
  },
];

export const collabApps = [
  {
    id: "0",
    title: "Figma",
    icon: figma,
    width: 26,
    height: 36,
  },
  {
    id: "1",
    title: "Notion",
    icon: notion,
    width: 34,
    height: 36,
  },
  {
    id: "2",
    title: "Discord",
    icon: discord,
    width: 36,
    height: 28,
  },
  {
    id: "3",
    title: "Slack",
    icon: slack,
    width: 34,
    height: 35,
  },
  {
    id: "4",
    title: "Photoshop",
    icon: photoshop,
    width: 34,
    height: 34,
  },
  {
    id: "5",
    title: "Protopie",
    icon: protopie,
    width: 34,
    height: 34,
  },
  {
    id: "6",
    title: "Framer",
    icon: framer,
    width: 26,
    height: 34,
  },
  {
    id: "7",
    title: "Raindrop",
    icon: raindrop,
    width: 38,
    height: 32,
  },
];

export const pricing = [
  {
    id: "0",
    title: "Basic",
    description: "AI chatbot, personalized recommendations",
    price: "0",
    features: [
      "An AI chatbot that can understand your queries",
      "Personalized recommendations based on your preferences",
      "Ability to explore the app and its features without any cost",
    ],
  },
  {
    id: "1",
    title: "Premium",
    description: "Advanced AI chatbot, priority support, analytics dashboard",
    price: "9.99",
    features: [
      "An advanced AI chatbot that can understand complex queries",
      "An analytics dashboard to track your conversations",
      "Priority support to solve issues quickly",
    ],
  },
  {
    id: "2",
    title: "Enterprise",
    description: "Custom AI chatbot, advanced analytics, dedicated account",
    price: null,
    features: [
      "An AI chatbot that can understand your queries",
      "Personalized recommendations based on your preferences",
      "Ability to explore the app and its features without any cost",
    ],
  },
];

export const benefits = [
  {
    id: "0",
    title: "Personalized Therapy",
    text: "Receive personalized therapy sessions that adapt to your needs and progress, ensuring effective and relevant support for your mental health journey.",
    backgroundUrl: "./src/assets/benefits/card-1.svg",
    iconUrl: benefitIcon1,
    imageUrl: benefitImage,
  },
  {
    id: "1",
    title: "Expert-Backed Therapy",
    text: "Our app is built on proven therapy materials and developed in collaboration with experienced doctors and therapists to ensure you receive the highest quality mental health support.",
    backgroundUrl: "./src/assets/benefits/card-1.svg",
    iconUrl: benefitIcon2,
    imageUrl: benefitImage,
    light: true,
  },
  {
    id: "2",
    title: "Secure and Private",
    text: "We use robust encryption and strict data security measures to keep your information safe and confidential.",
    backgroundUrl: "./src/assets/benefits/card-1.svg",
    iconUrl: benefitIcon3,
    imageUrl: benefitImage,
  },
  {
    id: "3",
    title: "Depression and Anxiety Diagnosis",
    text: "Our app leverages advanced algorithms and professional guidelines to accurately diagnose depression and anxiety, helping you understand and address your mental health needs effectively.",
    backgroundUrl: "./src/assets/benefits/card-1.svg",
    iconUrl: benefitIcon4,
    imageUrl: benefitImage,
    light: true,
  },
  {
    id: "4",
    title: "Updating Knowledge Base",
    text: "We continuously update our app to integrate the latest research and technological advancements. Additionally, we are expanding our support to include more mental health disorders, ensuring comprehensive care for all users.",
    backgroundUrl: "./src/assets/benefits/card-1.svg",
    iconUrl: benefitIcon1,
    imageUrl: benefitImage,
  },
  {
    id: "5",
    title: "Treatment Plans",
    text: "Receive comprehensive treatment plans tailored to your specific needs, ensuring a personalized and effective approach to your mental health care.",
    backgroundUrl: "./src/assets/benefits/card-1.svg",
    iconUrl: benefitIcon2,
    imageUrl: benefitImage,
  },
];

export const socials = [
  {
    id: "0",
    title: "Discord",
    iconUrl: discordBlack,
    url: "#",
  },
  {
    id: "1",
    title: "Twitter",
    iconUrl: twitter,
    url: "#",
  },
  {
    id: "2",
    title: "Instagram",
    iconUrl: instagram,
    url: "#",
  },
  {
    id: "3",
    title: "Telegram",
    iconUrl: telegram,
    url: "#",
  },
  {
    id: "4",
    title: "Facebook",
    iconUrl: facebook,
    url: "#",
  },
];
