import axios from 'axios';
import authHeader from './auth-header';
import config from "../common/config";

const API_URL = config.apiUrl;

class PostService {
  getPublicPosts(req, res, next) {
    return axios.get(API_URL + 'all');
  }

  async getAllPosts() {
      

      let result = null;
      const postRequest = `
      query {
          postsByType(input: { pagination: { skip: 0, take: 20 }, isPrivate: true }) {
            id
            topic
            description
            createdAt
            isPrivate
            user {
              id
              firstName
              lastName
            }
            likeCount
            uploads {
              id
              url
              thumbnailUrl
              metadata {
                name
                extension
                mimetype
                duration
                width
                height
              }
            }
          }
        }
        
      `;

      const requestOptions = {
          url: API_URL,
          method: 'POST',
          headers: authHeader(),
          data: {
              query: postRequest
          }
      };

      await axios(requestOptions).then(response => {
          
          if(response.data.data){
              result = response.data.data
              console.log("result : ", result);
          }
          
      });
      return result;
  }
}



export default new PostService();
