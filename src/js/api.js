import axios from 'axios';

export class themoviedbAPI {
  #API_KEY = 'f2c538717486cd7dc01f7314dfb697ab';
  #BASE_URL = 'https://api.themoviedb.org/3';
  #page;

  async getPopularMovies() {
    const url = `${this.#BASE_URL}/trending/movie/week?api_key=${
      this.#API_KEY
    }`;
    const response = await axios.get(url);
    console.log(response.data.results);
    return response.data.results;
  }
}
