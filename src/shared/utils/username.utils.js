import slugify from "slugify";

export const generateUsername = (value) => {
  return slugify(value, {
    lower: true,
    strict: true,
    trim: true,
    remove: /[*+~.()'"!:@]/g,
    locale: "en",
    replacement: "-",
  });
};
