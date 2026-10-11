export const CATEGORIES = [
  "All",
  "Romance",
  "Mystery",
  "Science Fiction",
  "Fantasy",
  "Historical",
  "Biography",
  "Self-help",
  "Memoir",
  "Travel",
  "Cooking",
  "Children's",
  "Young Adult",
  "Comics & Graphic Novels",
  "Poetry",
  "Drama",
  "Science",
  "Philosophy",
  "Religion",
  "Language Learning",
] as const;

export type CategoryType = (typeof CATEGORIES)[number];
