import axios from 'axios';
import authHeader from './authHeader';

const API_URL = 'http://localhost:8080/api/';

class UserService {
  getProducts() {
    return axios.get(API_URL + 'public/produits');
  }

  createProduct() {
    return axios.post(API_URL + 'employe/create', { product }, { headers: authHeader() });
  }
}

export default new UserService();
