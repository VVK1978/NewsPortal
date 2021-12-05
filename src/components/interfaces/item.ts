type TSource = {
  name: string;
};

export default interface IItem {
  urlToImage: string;
  author: string;
  source: TSource;
  publishedAt: string;
  title: string;
  description: string;
  url: string;
}
