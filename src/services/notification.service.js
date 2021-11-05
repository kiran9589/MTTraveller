import axios from 'axios';
import authHeader from './auth-header';
import config from "../common/config";

const API_URL = config.apiUrl;

class NotificationService {

  async sendNotification(notficationObj){
    let result = null;

    let notifyObj = `type: "WebPortal", notificationType: "${notficationObj.notificationType}" ,title: "${notficationObj.title.trim()}", content: "${notficationObj.content.trim()}"`
    if(notficationObj.isPrivate != null){
      notifyObj = notifyObj + `, isPrivate: ${notficationObj.isPrivate}`
    }

    if(notficationObj.isCompleted != null){
      notifyObj = notifyObj + `, isCompleted: ${notficationObj.isCompleted}`
    }

    if(notficationObj.isVerified != null){
      notifyObj = notifyObj + `, isVerified: ${notficationObj.isVerified}`
    }

    if(notficationObj.typeId != null){
      notifyObj = notifyObj + `, typeId: ${notficationObj.typeId}`
    }

    if(notficationObj.notificationTo != null){
      notifyObj = notifyObj + `, notificationTo: "${notficationObj.notificationTo}"`
    } 

      const stepQuery = `mutation{
        sendCommonNotification(input: { ${notifyObj}})
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
              result = response.data.data;
          }
      });
      return result;
  }
}

export default new NotificationService();
