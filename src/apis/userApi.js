import fetcher from "./fetcher";

export const signUpAPI = async (payload) => {
  try {
    const response = await fetcher.post("auth/signup", payload);
    return response.data?.content;
  } catch (error) {
    throw error.response?.data?.content;
  }
};

export const signInAPI = async (payload) => {
  try {
    const response = await fetcher.post("auth/signin", payload);
    return response.data?.content;
  } catch (error) {
    throw error.response?.data?.content;
  }
};
