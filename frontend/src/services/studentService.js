import api from './api';

export const studentService = {
  async getStudents() {
    const response = await api.get('/students/');
    return response.data;
  },

  async getPlacedStudents() {
    const response = await api.get('/students/placed');
    return response.data;
  },

  async addStudent(data) {
    const response = await api.post('/students/', data);
    return response.data;
  }
};