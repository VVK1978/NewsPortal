export type TSources = {
  category: string;
  country: string;
  description: string;
  id: string;
  language: string;
  name: string;
  url: string;
};

export default interface ISources {
  sources: TSources[];
  status: string;
}
