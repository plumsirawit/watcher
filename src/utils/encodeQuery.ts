export const encodeQuery = (params: Record<string, string>) =>
  Object.keys(params)
    .map((key) => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
    })
    .join('&');
