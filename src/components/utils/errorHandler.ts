import ErrorStatusCode from '../enums';

export default function errorHandler(res: Response) {
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
