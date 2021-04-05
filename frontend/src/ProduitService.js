import axios from 'axios';
import authHeader from './authHeader';

const API_URL = 'http://localhost:8080/api/';

class ProduitService {
  getProduits(pageNumber, perPage, searchWord, categoryId) {
    return axios.get(API_URL + `public/produits?pageNumber=${pageNumber}&perPage=${perPage}&searchWord=${searchWord}&categoryId=${categoryId}`);
  }

  // getProduitsByCategory(pageNumber, perPage, categoryId) {
  //   return axios.get(API_URL + `public/produits?pageNumber=${pageNumber}&perPage=${perPage}&categoryId=${categoryId}`);
  // }

  createProduit(produit) {
    return axios.post(API_URL + 'employe/produits/create', 
                produit, { headers: authHeader() });
  }

  deleteProduit(id) {
    return axios.delete(API_URL + `employe/produits/delete/${id}`)
  }

  getAdminBoard() {
    return axios.get(API_URL + 'gerant', { headers: authHeader() });
  }
}

export default new ProduitService();