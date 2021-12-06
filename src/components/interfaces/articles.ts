export type TArticles = {
  author: string;
  content: string;
  description: string;
  publishedAt: string;
  source: {
    id: string;
    name: string;
  };
  title: string;
  url: string;
  urlToImage: string;
};

export interface IArticles {
  articles: TArticles[];
  status: string;
  totalResults: number;
}
