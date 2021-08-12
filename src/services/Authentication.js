import React from "react";
import axios from "axios";
import { useQuery } from "react-query";

const endpoint = "http://3.66.147.152:9000/graphql";
const signIn = `
  {
    signIn(input:{
       email:"superadmin"
      password:"MTT@1234"
    }){
      accessToken
    }
  }
`;

function Authentication() {
    useEffect(() => {
        login();
    }, []);

    const login = () => {
        const { data, isLoading, error } = useQuery("launches", () => {
            return axios({
              url: endpoint,
              method: "POST",
              data: {
                mutation: signIn
              }
            }).then(response => response.data.data);
          });
        
          if (isLoading) return "Loading...";
          if (error) return <pre>{error.message}</pre>;
          if(data) return data;
        
    }
}

export default Authentication;
