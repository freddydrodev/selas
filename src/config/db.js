import { IMG_1, IMG_2, IMG_3, IMG_4 } from "../tools";

const db = {
  ticketType: [
    "Regular I",
    "Regular II",
    "Regular III",
    "VIP I",
    "VIP II",
    "VIP III"
  ],
  categories: ["Food", "Festival", "Music", "Party", "Religion", "Art"],
  data: [
    {
      id: "1",
      image: IMG_3,
      name: "Concert DJ Arafat",
      location: "Abidjan",
      date: "21 Sept 2018",
      hour: "10:00",
      basePrice: 20,
      rank: 0.1,
      category: "Music"
    },
    {
      id: "2",
      image: IMG_1,
      name: "Abidjan Mousse II",
      location: "Abidjan",
      date: "21 Sept 2018",
      hour: "10:00",
      basePrice: 30,
      rank: 3.6,
      category: "Party"
    },
    {
      id: "3",
      image: IMG_4,
      name: "Festival des grillades",
      location: "Abidjan",
      date: "21 Sept 2018",
      hour: "10:00",
      basePrice: 10,
      rank: 2,
      category: "Festival"
    },
    {
      id: "4",
      image: IMG_2,
      name: "Neon Party II",
      location: "Abidjan",
      date: "21 Sept 2018",
      hour: "10:00",
      basePrice: 10,
      rank: 2,
      category: "Festival"
    }
  ]
};

export default db;
