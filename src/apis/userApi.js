import fetcher from "./fetcher";


export const signUp = async (payload) => {
    try {
      const response = await fetcher.post("auth/signup", payload);
      return response.data?.content;
    } catch (error) {
      throw error.response?.data?.content;
    }
  };



  export const signIn = async (payload) => {
    console.log(payload);
    try {
      const response = await fetcher.post("auth/signin", payload);
      console.log(response);
      return response.data?.content;
    } catch (error) {
      throw error.response?.data?.content;
    }
  };