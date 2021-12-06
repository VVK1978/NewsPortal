import Loader from './loader';

const API_KEY = process.env.NEWS_API_KEY;

class AppLoader extends Loader {
  constructor() {
    super('https://nodenews.herokuapp.com/', {
      apiKey: API_KEY, // получите свой ключ https://newsapi.org/
    });
  }
}

export default AppLoader;
