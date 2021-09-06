import axios from 'axios';
import authHeader from './auth-header';
import config from "../common/config";

const API_URL = config.apiUrl;

class StepService {
  
  async getAllSteps(offset) {
      const limit = 20;
      if(offset > 0){
        offset = (offset * limit) + 1;
      }

      let result = null;
      const stepRequest = `
      query {
        stepsForCommunityEnroll(input: { pagination: { skip: ${offset}, take: ${limit} }}) {
            id
            name
            description
            createdAt
            trip {
              user {
                id
                firstName
                lastName
              }
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
              query: stepRequest
          }
      };

      await axios(requestOptions).then(response => {
          
          if(response.data.data){
              result = response.data.data
          }
          
      });
      return result;
  }

  async enrollToCommunity(stepId){
    let result = null;
      const stepQuery = `mutation{
        enrollStepToCommunity(input:{stepId:"${stepId}"}){
            id          
        }
      }`;

      const requestOptions = {
          url: API_URL,
          method: 'POST',
          headers: authHeader(),
          data: { 
              query: stepQuery
          }
      };

      await axios(requestOptions).then(response => {
          
          if(response.data.data){
              result = response.data.data
              console.log("result : ", result);
          }
          
      });
      return stepId;
  }
}



export default new StepService();
