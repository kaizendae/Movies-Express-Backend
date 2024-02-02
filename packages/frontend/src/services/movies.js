import axios from 'axios';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5001';

class MovieDataService {
  getAll(page =0, limit = 20) {
    return axios.get(`${API_BASE_URL}/api/v1/movies?page=${page}&limit=${limit}`);
  }
  get(id) {
    return axios.get(`${API_BASE_URL}/api/v1/movies/id/${id}`);
  }
  find(query, by = "title", page = 0, limit = 20) {
    return axios.get(`${API_BASE_URL}/api/v1/movies?${by}=${query}&page=${page}&limit=${limit}`);
  }

  createReview( data) {
    return axios.post(`${API_BASE_URL}/api/v1/movies/review`, data);
  }

  updateReview(data) {
    return axios.put(`${API_BASE_URL}/api/v1/movies/review/`, data);
  }

  deleteReview(id, userId) {
    return axios.delete(`${API_BASE_URL}/api/v1/movies/review`, {data: {review_id: id, user_id: userId}});
  }

  getRating(id) {
    return axios.get(`${API_BASE_URL}/api/v1/movies/ratings`);
  }
}

export default new MovieDataService();
