const BASE_URL = `https://jsonplaceholder.typicode.com/`;

const getUserPosts = async (n) => {
  const ret = {};

  const user = await getUser(n);
  ret.id = user.id;
  ret.name = user.name;
  const posts = await getPost(n);
  posts.forEach((p) => delete p.userId);
  ret.posts = posts;
  return ret;
};

const getUser = async (n) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${n}`);
  return res.json();
};

const getPost = async (n) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?userId=${n}`
  );
  return res.json();
};

const obj = await getUserPosts(1);
console.log(obj);

// const myFetch = async (path) => {
//   const res = await fetch(`${BASE_URL}}/${path}`);
//   return res.json();
// };
// const getUserPosts = async (userId) => {
//   const { id, name } = await myFetch(`users/${userId}`);
//   const result = { id, name };
//   const posts = await myFetch(`posts?userId=${userId}`);
// };

// getUserPosts(1);
// const result = { id, name };
// console.log(`🚀 ~ result:`, result);
