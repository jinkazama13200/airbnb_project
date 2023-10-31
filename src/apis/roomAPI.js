import fetcher from "./fetcher";

export const getRoomListById = async (locationId) => {
  try {
    const res = await fetcher("phong-thue/lay-phong-theo-vi-tri", {
      params: {
        maViTri: locationId,
      },
    });
    return res.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};


