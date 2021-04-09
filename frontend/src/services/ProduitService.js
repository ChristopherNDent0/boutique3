import axios from 'axios';
import authHeader from '../auth/authHeader';

const API_URL = 'http://localhost:8080/api/';

class ProduitService {
  getProduits(pageNumber, perPage, searchWord, categoryId, price) {
    return axios.get(API_URL + `public/produits?pageNumber=${pageNumber}&perPage=${perPage}&searchWord=${searchWord}&categoryId=${categoryId}&price=${price}`);
  }

  // getProduitsByCategory(pageNumber, perPage, categoryId) {
  //   return axios.get(API_URL + `public/produits?pageNumber=${pageNumber}&perPage=${perPage}&categoryId=${categoryId}`);
  // }

  createProduit(produit) {
    return axios.post(API_URL + 'employe/produits/create', 
                produit, { headers: authHeader() });
  }

  deleteProduit(produit) {
    return axios.put(API_URL + `employe/produits/delete`, produit, { headers: authHeader()})
  }

  getAdminBoard() {
    return axios.get(API_URL + 'gerant', { headers: authHeader() });
  }
}

export default new ProduitService();