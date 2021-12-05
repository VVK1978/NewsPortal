type TArticle = {
  id: string;
  name: string;
};

type TArticles = {
  author: string;
  content: string;
  description: string;
  publishedAt: string;
  source: TArticle;
  title: string;
  url: string;
  urlToImage: string;
};

export default interface IArticles {
  articles: TArticles[];
  status: string;
  totalResults: number;
}
