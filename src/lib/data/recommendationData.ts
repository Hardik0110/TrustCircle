export interface RecommendationBy { 
  initials: string; 
  color: string; 
}

export interface Recommendation {
  initials: string;
  name: string;
  color: string;
  tag: string;
  tags: string[];
  phone?: string;
  email?: string;
  connectedOn?: string;
  recommends?: number;
  recommendedBy?: RecommendationBy[];
  notesCount?: number;
}

export const recommendationData: Recommendation[] = [
  {
    initials: "AW",
    name: "Andre Wu",
    color: "bg-[#D3F2E6]",
    tag: "Plumber",
    tags: ["Plumber", "Electrician"],
    phone: "+1 123-456-7890",
    email: "andre.wu@email.com",
    connectedOn: "Jan 15, 2024",
    recommends: 12,
    recommendedBy: [
      { initials: "JD", color: "bg-[#FDDDE1]" },
      { initials: "DA", color: "bg-[#F9EFB0]" },
    ],
    notesCount: 2,
  },
  {
    initials: "AW",
    name: "Andy Wogel",
    color: "bg-[#E7E4FB]",
    tag: "Doctor",
    tags: ["Doctor", "Tutor"],
    phone: "+1 123-456-7890",
    email: "andy.wogel@email.com",
    connectedOn: "Feb 22, 2024",
    recommends: 8,
    recommendedBy: [
      { initials: "AW", color: "bg-[#D3F2E6]" },
      { initials: "JD", color: "bg-[#FDDDE1]" },
    ],
    notesCount: 1,
  },
  {
    initials: "DA",
    name: "Dave Arron",
    color: "bg-[#FFE7D6]",
    tag: "Tutor",
    tags: ["Tutor", "Handymen"],
    phone: "+1 123-456-7890",
    email: "dave.arron@email.com",
    connectedOn: "Mar 10, 2024",
    recommends: 15,
    recommendedBy: [
      { initials: "AW", color: "bg-[#E7E4FB]" },
      { initials: "DA", color: "bg-[#F9EFB0]" },
    ],
    notesCount: 3,
  },
  {
    initials: "JD",
    name: "Johnathan Doe",
    color: "bg-[#FDDDE1]",
    tag: "Handymen",
    tags: ["Handymen", "Electrician"],
    phone: "+1 321-654-0987",
    email: "johnathan.doe@email.com",
    connectedOn: "Apr 05, 2024",
    recommends: 6,
    recommendedBy: [
      { initials: "AW", color: "bg-[#D3F2E6]" },
      { initials: "DA", color: "bg-[#FFE7D6]" },
      { initials: "MJ", color: "bg-[#E7E4FB]" },
    ],
    notesCount: 4,
  },
  {
    initials: "MS",
    name: "Mark Shaw",
    color: "bg-[#E6F7E6]",
    tag: "Electrician",
    tags: ["Electrician", "Plumber"],
    phone: "+1 987-654-3210",
    email: "mark.shaw@email.com",
    connectedOn: "May 18, 2024",
    recommends: 20,
    recommendedBy: [
      { initials: "JD", color: "bg-[#FDDDE1]" },
      { initials: "AW", color: "bg-[#D3F2E6]" },
    ],
    notesCount: 5,
  },
  {
    initials: "LM",
    name: "Lisa Martinez",
    color: "bg-[#F0F8FF]",
    tag: "Handymen",
    tags: ["Handymen", "Tutor"],
    phone: "+1 456-789-0123",
    email: "lisa.martinez@email.com",
    connectedOn: "Jun 12, 2024",
    recommends: 9,
    recommendedBy: [
      { initials: "MS", color: "bg-[#E6F7E6]" },
      { initials: "JD", color: "bg-[#FDDDE1]" },
    ],
    notesCount: 2,
  },
  {
    initials: "RT",
    name: "Robert Taylor",
    color: "bg-[#FFF0F5]",
    tag: "Handymen",
    tags: ["Handymen", "Electrician"],
    phone: "+1 789-012-3456",
    email: "robert.taylor@email.com",
    connectedOn: "Jul 25, 2024",
    recommends: 14,
    recommendedBy: [
      { initials: "LM", color: "bg-[#F0F8FF]" },
      { initials: "DA", color: "bg-[#FFE7D6]" },
    ],
    notesCount: 3,
  },
  {
    initials: "SB",
    name: "Sarah Brown",
    color: "bg-[#E0FFFF]",
    tag: "Tutor",
    tags: ["Tutor", "Doctor", "Handymen"],
    phone: "+1 012-345-6789",
    email: "sarah.brown@email.com",
    connectedOn: "Aug 14, 2024",
    recommends: 7,
    recommendedBy: [
      { initials: "RT", color: "bg-[#FFF0F5]" },
      { initials: "AW", color: "bg-[#D3F2E6]" },
    ],
    notesCount: 1,
  },
  {
    initials: "MJ",
    name: "Michael Johnson",
    color: "bg-[#F5F5DC]",
    tag: "Electrician",
    tags: ["Electrician", "Handymen", "Tutor", "Doctor"],
    phone: "+1 345-678-9012",
    email: "michael.johnson@email.com",
    connectedOn: "Sep 03, 2024",
    recommends: 18,
    recommendedBy: [
      { initials: "SB", color: "bg-[#E0FFFF]" },
      { initials: "MS", color: "bg-[#E6F7E6]" },
    ],
    notesCount: 6,
  },
  {
    initials: "EW",
    name: "Emily Wilson",
    color: "bg-[#FAFAD2]",
    tag: "Tutor",
    tags: ["Tutor", "Doctor", "Handymen", "Electrician", "Plumber"],
    phone: "+1 678-901-2345",
    email: "emily.wilson@email.com",
    connectedOn: "Oct 20, 2024",
    recommends: 11,
    recommendedBy: [
      { initials: "MJ", color: "bg-[#F5F5DC]" },
      { initials: "LM", color: "bg-[#F0F8FF]" },
    ],
    notesCount: 4,
  },
];