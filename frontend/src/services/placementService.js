import api from './api';

export const placementService = {
  async getKPIs() {
    const response = await api.get('/analytics/kpis');
    return response.data;
  },

  async getRoundStats() {
    const response = await api.get('/analytics/rounds');
    return response.data;
  },

  async getCompanyPlacements() {
    const response = await api.get('/analytics/companies');
    return response.data;
  },

  async getRecentPlacements() {
    const response = await api.get('/analytics/recent-placements');
    return response.data;
  },

  async getDrives() {
    const response = await api.get('/drives/');
    return response.data;
  },

  async addDrive(data) {
    const response = await api.post('/drives/', data);
    return response.data;
  },

  async markPlaced(studentName, companyName) {
    const response = await api.post('/final/', {
      student_name: studentName,
      company_name: companyName
    });
    return response.data;
  },

  async addRound(data) {
    const response = await api.post('/rounds/', data);
    return response.data;
  },

  async getRounds() {
    const response = await api.get('/rounds/');
    return response.data;
  }
};