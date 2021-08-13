import axios from 'axios';
import authHeader from './auth-header';

const API_URL = config.apiUrl;

class PostService {
  getPublicPosts(req, res, next) {
    return axios.get(API_URL + 'all');
  }
}

export default new PostService();
