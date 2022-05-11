import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: "Desi Hip Hop (DHH)",
    description:
      "Desi hip hop is a term for music and culture which combines the influences of hip hop and the Indian subcontinent; the term desi referring to the South Asian diaspora. The term has also come to be used as an alternative for rap music and even pop music which involves rappers of South Asian origins.",
  },
  {
    _id: uuid(),
    categoryName: "Lo-Fi Hip Hop (LFH)",
    description:
      "Lofi hip hop (also known as Chillhop and lofi beats to study to) is a form of downtempo that combines elements of hip hop and Chill-out music.",
  },
];
