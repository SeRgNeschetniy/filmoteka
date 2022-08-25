import axios from 'axios';

export class themoviedbAPI {
  #API_KEY = 'f2c538717486cd7dc01f7314dfb697ab';
  #BASE_URL = 'https://api.themoviedb.org/3';
  #page;

  async getTrendMovies(page) {
    const url = `${this.#BASE_URL}/trending/movie/week?api_key=${
      this.#API_KEY
    }&page=${page}`;
    const response = await axios.get(url);
    console.log(response.data);
    return response.data;
  }

  async getQueryMovies(query, page) {
    const url = `${this.#BASE_URL}/search/movie?api_key=${
      this.#API_KEY
    }&query=${query}&page=${page}`;
    const response = await axios.get(url);
    console.log(response.data);
    return response.data;
  }

  async getMovieById(id) {
    const url = `${this.#BASE_URL}/movie/${id}?api_key=${this.#API_KEY}`;
    const response = await axios.get(url);
    console.log(response.data);
    return response.data;
  }

  async getGenres() {
    const url = `${this.#BASE_URL}/genre/movie/list?api_key=${this.#API_KEY}`;
    const response = await axios.get(url);
    console.log(response.data.genres);
    return response.data.genres;
  }
}
