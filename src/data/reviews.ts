export type Review = {
  author: string;
  initial: string;
  rating: number;
  date: string;
  text: string;
  project?: string;
};

export const reviews: Review[] = [
  {
    author: "Vikram Agarwal",
    initial: "VA",
    rating: 5,
    date: "2 weeks ago",
    text: "Built our 4BHK villa in Mansarovar. Zero cost overruns, weekly updates on the dashboard, and finishing quality beat anything I'd seen in Jaipur.",
    project: "Mansarovar Villa",
  },
  {
    author: "Priya Sharma",
    initial: "PS",
    rating: 5,
    date: "1 month ago",
    text: "We're in Dubai. SingleStop's live tracking and drone footage made us feel like we were on site every day. Handover was 11 days ahead of schedule.",
    project: "NRI Residence",
  },
  {
    author: "Rajesh Goyal",
    initial: "RG",
    rating: 5,
    date: "1 month ago",
    text: "Renovated our C-Scheme bungalow. Heritage details preserved, modern systems retrofitted. The team's attention to detail is exceptional.",
    project: "C-Scheme Heritage",
  },
  {
    author: "Neha Mittal",
    initial: "NM",
    rating: 5,
    date: "2 months ago",
    text: "Transparent pricing from day one. They explained every line item. No surprises, no hidden costs. Highly recommend.",
    project: "Vaishali Nagar 3BHK",
  },
  {
    author: "Suresh Khandelwal",
    initial: "SK",
    rating: 5,
    date: "3 months ago",
    text: "Commercial tower in Jagatpura. Professional engineers, proper safety protocols, and timely milestones. Refreshing experience.",
    project: "Jagatpura Tower",
  },
  {
    author: "Anita Jain",
    initial: "AJ",
    rating: 4,
    date: "3 months ago",
    text: "Loved the design phase. Build was smooth. Minor delays in finishing but the team made up for it with quality.",
    project: "Malviya Nagar Interior",
  },
];

export const aggregateRating = {
  rating: 4.9,
  count: 187,
};
