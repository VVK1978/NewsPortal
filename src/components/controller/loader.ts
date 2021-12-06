import { IArticles, ISources, TOptions } from '../interfaces';
import { errorHandler } from '../utils';

class Loader {
  private readonly baseLink: string;

  private readonly options: {
    apiKey: string | undefined;
  };

  constructor(baseLink: string, options: { apiKey: string | undefined }) {
    this.baseLink = baseLink;
    this.options = options;
  }

  getResp(
    { endpoint, options = {} }: { endpoint: string; options?: TOptions },
    callback: (data: ISources & IArticles) => void = () => {
      console.error('No callback for GET response');
    }
  ) {
    this.load('GET', endpoint, callback, options);
  }

  makeUrl(options: TOptions, endpoint: string) {
    const urlOptions: { [key: string]: string | number | undefined | null } = {
      ...this.options,
      ...options,
    };
    let url = `${this.baseLink}${endpoint}?`;
    Object.keys(urlOptions).forEach((key: string) => {
      url += `${key}=${urlOptions[key]}&`;
    });
    return url.slice(0, -1);
  }

  load(
    method: string,
    endpoint: string,
    callback: (data: ISources & IArticles) => void,
    options: TOptions
  ) {
    fetch(this.makeUrl(options, endpoint), { method })
      .then(errorHandler)
      .then((res) => res.json())
      .then((data) => callback(data))
      .catch((err) => console.error(err));
  }
}

export default Loader;
