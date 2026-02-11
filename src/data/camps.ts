import campAdventure from "@/assets/camp-adventure.jpg";
import campArts from "@/assets/camp-arts.jpg";
import campSports from "@/assets/camp-sports.jpg";
import campScience from "@/assets/camp-science.jpg";
import campWater from "@/assets/camp-water.jpg";
import campOvernight from "@/assets/camp-overnight.jpg";

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
    id: "adventure-explorers",
    name: "Adventure Explorers",
    description: "An exciting outdoor adventure camp where kids learn survival skills, rock climbing, zip-lining, and nature exploration. Build confidence and resilience through thrilling challenges.",
    ageGroup: "8–14 years",
    activities: ["Rock Climbing", "Zip Lining", "Nature Hikes", "Survival Skills", "Orienteering"],
    schedule: "Mon–Fri, 8:00 AM – 4:00 PM",
    duration: "2 Weeks",
    fees: 599,
    safetyGuidelines: ["Certified instructors", "Safety harnesses provided", "First-aid on site", "2:1 camper-to-staff ratio"],
    availableSeats: 12,
    totalSeats: 30,
    image: campAdventure,
    featured: true,
  },
  {
    id: "creative-arts",
    name: "Creative Arts Studio",
    description: "Unleash your child's creativity with painting, sculpture, music, drama, and digital art. Every day is a new canvas for self-expression and artistic discovery.",
    ageGroup: "6–12 years",
    activities: ["Painting", "Sculpture", "Music", "Drama", "Digital Art"],
    schedule: "Mon–Fri, 9:00 AM – 3:00 PM",
    duration: "1 Week",
    fees: 349,
    safetyGuidelines: ["Non-toxic materials only", "Adult supervision at all times", "Allergy-safe environment", "First-aid on site"],
    availableSeats: 20,
    totalSeats: 25,
    image: campArts,
    featured: true,
  },
  {
    id: "sports-champions",
    name: "Sports Champions",
    description: "A high-energy sports camp featuring soccer, basketball, swimming, and track & field. Kids develop teamwork, fitness, and sportsmanship in a fun environment.",
    ageGroup: "7–15 years",
    activities: ["Soccer", "Basketball", "Swimming", "Track & Field", "Team Games"],
    schedule: "Mon–Fri, 7:30 AM – 5:00 PM",
    duration: "2 Weeks",
    fees: 499,
    safetyGuidelines: ["Qualified coaches", "Hydration stations", "Sports insurance included", "Emergency medical staff"],
    availableSeats: 8,
    totalSeats: 40,
    image: campSports,
    featured: true,
  },
  {
    id: "science-discovery",
    name: "Science Discovery Lab",
    description: "Hands-on STEM camp with robotics, chemistry experiments, astronomy, and coding. Inspire the next generation of scientists and innovators.",
    ageGroup: "9–14 years",
    activities: ["Robotics", "Chemistry Experiments", "Astronomy", "Coding", "3D Printing"],
    schedule: "Mon–Fri, 9:00 AM – 4:00 PM",
    duration: "10 Days",
    fees: 549,
    safetyGuidelines: ["Lab safety protocols", "Protective gear provided", "Certified STEM instructors", "Small group sizes"],
    availableSeats: 15,
    totalSeats: 20,
    image: campScience,
  },
  {
    id: "aqua-adventures",
    name: "Aqua Adventures",
    description: "Splash into summer with swimming, kayaking, water polo, and water safety courses. Perfect for water-loving kids who want to build aquatic skills.",
    ageGroup: "6–13 years",
    activities: ["Swimming", "Kayaking", "Water Polo", "Diving", "Water Safety"],
    schedule: "Mon–Fri, 8:00 AM – 2:00 PM",
    duration: "1 Week",
    fees: 399,
    safetyGuidelines: ["Certified lifeguards", "Swim level assessment", "Coast Guard-approved equipment", "1:4 instructor ratio"],
    availableSeats: 18,
    totalSeats: 24,
    image: campWater,
  },
  {
    id: "wilderness-overnight",
    name: "Wilderness Overnight",
    description: "An immersive overnight camping experience with campfire cooking, stargazing, storytelling, and wilderness exploration. Create lasting memories under the stars.",
    ageGroup: "10–16 years",
    activities: ["Campfire Cooking", "Stargazing", "Storytelling", "Hiking", "Wilderness Skills"],
    schedule: "Check-in Sunday 4 PM – Friday 10 AM",
    duration: "5 Nights",
    fees: 799,
    safetyGuidelines: ["24/7 adult supervision", "Satellite communication", "Bear-safe food storage", "Weather monitoring"],
    availableSeats: 5,
    totalSeats: 16,
    image: campOvernight,
  },
];
