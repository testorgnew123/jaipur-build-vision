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
    author: "MILAP GOSWAMI",
    initial: "MG",
    rating: 5,
    date: "30 April, 2022",
    text: "Company is trustworthy, good quality work, professional staff and timely work done with new techniques.",
    project: "Client review",
  },
  {
    author: "Sakshi Goyal",
    initial: "SG",
    rating: 5,
    date: "1 May, 2026",
    text: "If you are looking for reliable building solutions, I highly recommend [Single Stop Building Solution]. Their workmanship is exceptional, and they use high-quality materials. The team is knowledgeable, polite, and maintained great communication throughout our project. The final result exceeded our expectations!",
    project: "Client review",
  },
  {
    author: "Harsh Goyal",
    initial: "HG",
    rating: 5,
    date: "30 April, 2026",
    text: "Excellent service and honest dealing. They are experts in house construction and interior solutions. We are very happy with our new home and the way they managed the entire process. A trustworthy brand for sure.Thanks Single Stop",
    project: "Client review",
  },
  {
    author: "Aman Goyal",
    initial: "AG",
    rating: 5,
    date: "9 April, 2026",
    text: "Mera experience bahut smooth raha. Team ne har step par support kiya, planning se execution tak. Work quality aur finishing dono top-class hai.",
    project: "Client review",
  },
];

export const aggregateRating = {
  rating: 4.9,
  count: 33,
};
