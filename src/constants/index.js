export const ENDPOINT = " https://ap-blog-backend.up.railway.app/";
export const TOKEN = "blogToken";
export const ROLE = "blogRole";
export const LIMIT = 10;
export const LIMIT_CATEGORY = 4;
export const LIMIT_USERS = 10;
export const LIMIT_POSTS = 10;
export const BLOGLANGUAGE = "BLOG_LANGUAGE";

export const trueDate = (date) => {
  const berilganVaqt = new Date(date);
  const sana = berilganVaqt.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return sana;
};
