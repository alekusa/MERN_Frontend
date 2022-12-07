import axios from "axios";

export const getPostsRequests = async () =>
  await axios.get("https://mernbackend-production-c23a.up.railway.app/posts");

export const getPostRequest = async (id) =>
  await axios.get(
    "https://mernbackend-production-c23a.up.railway.app/posts/" + id
  );

export const deletePostRequest = async (id) =>
  await axios.delete(
    "https://mernbackend-production-c23a.up.railway.app/posts/" + id
  );

export const createPostRequest = async (post) => {
  const form = new FormData();
  for (let key in post) {
    form.append(key, post[key]);
  }
  return await axios.post(
    "https://mernbackend-production-c23a.up.railway.app/posts",
    form,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

export const updatePostRequest = async (id, newFields) =>
  await axios.put(
    `https://mernbackend-production-c23a.up.railway.app/posts/${id}`,
    newFields
  );
