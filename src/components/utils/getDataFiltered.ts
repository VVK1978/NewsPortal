import { ISources } from '../interfaces';

export default function getDataFiltered(value: string, data: ISources) {
  return data.sources.filter((source) => {
    return source.id.toLowerCase().indexOf(value.toLowerCase()) > -1;
  });
}
