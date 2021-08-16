import axios from 'axios';
import authHeader from './auth-header';
import config from "../common/config";

const API_URL = config.apiUrl;

class PostService {
  getPublicPosts(req, res, next) {
    return axios.get(API_URL + 'all');
  }

  async getAllPosts(offset) {
      const limit = 20;
      if(offset > 0){
        offset = (offset * limit) + 1;
      }

      let result = null;
      const postRequest = `
      query {
          postsByType(input: { pagination: { skip: ${offset}, take: ${limit} }, isPrivate: false }) {
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
          }
          
      });
      return result;
  }

  async enrollToCommunity(postId){
    let result = null;
      const postQuery = `mutation{
        createPostForumPost(input:{postId:"${postId}"}){
            id          
        }
      }`;

      const requestOptions = {
          url: API_URL,
          method: 'POST',
          headers: authHeader(),
          data: { 
              query: postQuery
          }
      };

      await axios(requestOptions).then(response => {
          
          if(response.data.data){
              result = response.data.data
              console.log("result : ", result);
          }
          
      });
      return postId;
  }
}



export default new PostService();
