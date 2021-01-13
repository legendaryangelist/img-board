export const groupComments = () => {
  return fetch("http...").then((re) => re.json());
};
export const myComments = () => {
  return fetch("https://jsonplaceholder.typicode.com/posts").then((re) =>
    re.json()
  );
};
