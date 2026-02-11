import api from './api';

export const companyService = {
  async getCompanies() {
    const response = await api.get('/companies/');
    return response.data;
  },

  async addCompany(data) {
    const response = await api.post('/companies/', data);
    return response.data;
  }
};