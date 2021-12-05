import IArticles from '../interfaces/articles';
import ISources from '../interfaces/sources';

type TOptions = {
  sources?: string | null;
  pageSize?: number | null;
  page?: string | undefined;
};

enum ErrorStatusCode {
  Unauthorized = 401,
  NotFound = 404,
  TooManyRequests = 429,
}

class Loader {
  private baseLink: string;

  private options: {
    apiKey: string;
  };

  constructor(baseLink: string, options: { apiKey: string }) {
    this.baseLink = baseLink;
    this.options = options;
  }

  getResp(
    { endpoint, options = {} }: { endpoint: string; options?: TOptions },
    callback: (data: ISources & IArticles) => void = () => {
      console.error('No callback for GET response');
    },
  ) {
    this.load('GET', endpoint, callback, options);
  }

  errorHandler(res: Response) {
    if (!res.ok) {
      if (
        res.status === ErrorStatusCode.Unauthorized ||
        res.status === ErrorStatusCode.NotFound ||
        res.status === ErrorStatusCode.TooManyRequests
      )
        console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
      throw Error(res.statusText);
    }

    return res;
  }

  makeUrl(options: TOptions, endpoint: string) {
    const urlOptions: { [key: string]: string | number | null } = { ...this.options, ...options };
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
    options: TOptions,
  ) {
    fetch(this.makeUrl(options, endpoint), { method })
      .then(this.errorHandler)
      .then((res) => res.json())
      .then((data) => callback(data))
      .catch((err) => console.error(err));
  }
}

export default Loader;
