import campUpskilling from "@/assets/camp-upskilling.jpg";
import campSplashfun from "@/assets/camp-splashfun.jpg";
import campChillvibe from "@/assets/camp-chillvibe.jpg";
import campHandwriting from "@/assets/camp-handwriting.jpg";
import campGenai from "@/assets/camp-genai.jpg";
import campArtcrafts from "@/assets/camp-artcrafts.jpg";
import campPublicspeaking from "@/assets/camp-publicspeaking.jpg";
import campCombo from "@/assets/camp-combo.jpg";

export interface Camp {
  id: string;
  name: string;
  description: string;
  ageGroup: string;
  activities: string[];
  schedule: string;
  duration: string;
  fees: number;
  safetyGuidelines: string[];
  availableSeats: number;
  totalSeats: number;
  image: string;
  featured?: boolean;
}

export const camps: Camp[] = [
  {
    id: "upskilling",
    name: "Upskilling",
    description: "Boost your child's confidence and capabilities with leadership training, communication skills, time management, and personal development workshops.",
    ageGroup: "8–16 years",
    activities: ["Leadership Training", "Communication Skills", "Time Management", "Goal Setting", "Team Building"],
    schedule: "Mon–Fri, 9:00 AM – 4:00 PM",
    duration: "10 Days",
    fees: 2500,
    safetyGuidelines: ["Certified trainers", "Small batch sizes", "First-aid on site", "Parent updates daily"],
    availableSeats: 12,
    totalSeats: 30,
    image: campUpskilling,
    featured: true,
  },
  {
    id: "splashfun",
    name: "SplashFun",
    description: "Dive into a world of water fun! Swimming, water polo, splash games, and water safety courses for an unforgettable aquatic adventure.",
    ageGroup: "6–14 years",
    activities: ["Swimming", "Water Polo", "Splash Games", "Diving", "Water Safety"],
    schedule: "Mon–Fri, 8:00 AM – 2:00 PM",
    duration: "10 Days",
    fees: 2500,
    safetyGuidelines: ["Certified lifeguards", "Swim level assessment", "Life jackets provided", "1:4 instructor ratio"],
    availableSeats: 18,
    totalSeats: 30,
    image: campSplashfun,
    featured: true,
  },
  {
    id: "chill-and-vibe",
    name: "Chill & Vibe",
    description: "A relaxed camp experience with music, yoga, mindfulness, outdoor games, and creative expression. Perfect for kids who love to unwind and socialize.",
    ageGroup: "7–15 years",
    activities: ["Music Jam", "Yoga & Meditation", "Outdoor Games", "Creative Writing", "Nature Walks"],
    schedule: "Mon–Fri, 9:00 AM – 3:00 PM",
    duration: "10 Days",
    fees: 2500,
    safetyGuidelines: ["Trained counselors", "Safe outdoor spaces", "Hydration stations", "Emergency contacts on file"],
    availableSeats: 20,
    totalSeats: 25,
    image: campChillvibe,
    featured: true,
  },
  {
    id: "handwriting",
    name: "Handwriting Mastery",
    description: "Transform your child's handwriting with expert calligraphy training, cursive practice, and fine motor skill development in a fun environment.",
    ageGroup: "5–12 years",
    activities: ["Cursive Writing", "Calligraphy", "Letter Formation", "Speed Writing", "Creative Journaling"],
    schedule: "Mon–Fri, 10:00 AM – 1:00 PM",
    duration: "10 Days",
    fees: 1000,
    safetyGuidelines: ["Ergonomic seating", "Non-toxic materials", "Small class sizes", "Individual attention"],
    availableSeats: 15,
    totalSeats: 20,
    image: campHandwriting,
  },
  {
    id: "generative-ai",
    name: "Generative AI",
    description: "Introduce your child to the world of AI! Learn prompt engineering, AI art creation, chatbot basics, and the future of technology.",
    ageGroup: "10–16 years",
    activities: ["AI Art Creation", "Prompt Engineering", "Chatbot Building", "AI Ethics", "Future Tech Exploration"],
    schedule: "Mon–Fri, 9:00 AM – 3:00 PM",
    duration: "10 Days",
    fees: 1000,
    safetyGuidelines: ["Supervised screen time", "Age-appropriate content", "Certified tech instructors", "Parental consent required"],
    availableSeats: 10,
    totalSeats: 20,
    image: campGenai,
  },
  {
    id: "art-and-crafts",
    name: "Art & Crafts",
    description: "Unleash creativity with painting, origami, clay modeling, collage making, and more. Every day brings a new artistic adventure!",
    ageGroup: "5–12 years",
    activities: ["Painting", "Origami", "Clay Modeling", "Collage Making", "Sketch Art"],
    schedule: "Mon–Fri, 10:00 AM – 1:00 PM",
    duration: "10 Days",
    fees: 500,
    safetyGuidelines: ["Non-toxic materials only", "Adult supervision", "Allergy-safe environment", "First-aid on site"],
    availableSeats: 22,
    totalSeats: 25,
    image: campArtcrafts,
  },
  {
    id: "public-speaking",
    name: "Public Speaking",
    description: "Build confidence and eloquence with debates, storytelling, presentation skills, and stage performance training for young speakers.",
    ageGroup: "8–16 years",
    activities: ["Debates", "Storytelling", "Presentation Skills", "Stage Performance", "Impromptu Speaking"],
    schedule: "Mon–Fri, 9:00 AM – 2:00 PM",
    duration: "10 Days",
    fees: 1000,
    safetyGuidelines: ["Supportive environment", "No-bullying policy", "Trained speech coaches", "Recorded progress reports"],
    availableSeats: 14,
    totalSeats: 20,
    image: campPublicspeaking,
  },
  {
    id: "combo-pack",
    name: "Combo Pack – All Activities",
    description: "The ultimate summer experience! Get access to ALL camps — Upskilling, SplashFun, Chill & Vibe, Handwriting, Generative AI, Art & Crafts, and Public Speaking at an unbeatable price.",
    ageGroup: "6–16 years",
    activities: ["All Activities Included", "Upskilling", "SplashFun", "Chill & Vibe", "Handwriting", "Generative AI", "Art & Crafts", "Public Speaking"],
    schedule: "Mon–Fri, 8:00 AM – 5:00 PM",
    duration: "10 Days",
    fees: 3000,
    safetyGuidelines: ["All safety protocols", "Comprehensive insurance", "24/7 parent support", "Dedicated camp coordinator"],
    availableSeats: 8,
    totalSeats: 15,
    image: campCombo,
    featured: true,
  },
];
