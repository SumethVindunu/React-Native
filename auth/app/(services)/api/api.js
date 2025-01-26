import axios from "axios"

export const loginUser = async ({email, password}) => {
   
        const response = await axios.post(
            "https://rude-animals-worry.loca.lt/api/users/login",
            user,
            {
              email,
              password,
            }
          );
          return response.data;
    
  };

  export const registerUser = async ({email, password}) => {
   
    const response = await axios.post(
        "https://cruel-banks-count.loca.lt/api/users/register",
        user,
        {
          email,
          password,
        }
      );
      return response.data;

};

