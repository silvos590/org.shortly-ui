import api from "./client";

export async function shortenUrl(originalUrl) {
  const response = await api.post("/", { originalUrl });
  return response.data; // assume it returns { code, shortUrl, originalUrl }
}

export async function getUrlByCode(code) {
  const response = await api.get(`/${code}`);
  return response.data; // assume { code, originalUrl, shortUrl }
}

// export async function deleteUrl(code) {
//   const response = await api.delete(`/${code}`);
//   return response.data;
// }
