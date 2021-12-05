import Loader from './loader';

const API_KEYS = ['10043727cfce4838b8150305d26ca3d5', 'e253cf34b9294e80a86d3413764608e0'];

class AppLoader extends Loader {
  constructor() {
    super('https://nodenews.herokuapp.com/', {
      apiKey: API_KEYS[1], // получите свой ключ https://newsapi.org/
    });
  }
}

export default AppLoader;
