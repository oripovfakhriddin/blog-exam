export const ENDPOINT = " https://ap-blog-backend.up.railway.app/";
export const TOKEN = "blogToken";
export const ROLE = "blogRole";
export const LIMIT = 10;

export const trueDate = (date) => {
  const berilganVaqt = new Date(date);
  const sana = berilganVaqt.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return sana;
};
