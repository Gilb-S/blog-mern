// get all the post

const getPosts = async () => {
  const res = await fetch("/api/posts");
  const data = await res.json();

  // check the request if is not ok

  if (!res.ok) {
    throw Error(data.error);
  }

  return data;
};

// get user post
const getUserPost = async () => {
  // fetching api and bearer auth
  const res = await fetch("/api/posts/user", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const data = await res.json();
  // check if the res is ok
  if (!res.ok) {
    throw Error(data.error);
  }

  return data;
};

// creating post controller
const createPost = async (title, body) => {
  //check if the input is empty
  if (!title || !body) {
    throw Error("all fields are require");
  }
  // create post 
  const res = await fetch("/api/posts/create", {
    method: "POST", // method
    // check the header api url
    headers: {
      "Content-Type" : "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({title, body}),

  })
  // if success
  const data = await res.json();

  // check the res is ok
  if(!res.ok){
    throw Error("Unauthorized");
  };

  return { success: "Post created successfully!", ...data };
};


const deletePost = async (_id) => {
    const res = await fetch(`/api/posts/delete/${_id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
    });

    const data = await res.json();

    if (!res.ok) {
        throw Error(data.error);
    }

    return { success: "Post deleted successfully!", ...data }; // Ensure success message exists
};

// update

const updatePost = async(_id, title, body) => {
    // check the field 
    if(!title || !body) {
        throw Error("All fields are required");
    }

    // create res url
    const res = await fetch(`/api/posts/update/${_id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({title, body}),
    });

    const data = await res.json();

    // the response
    if(!res.ok){
        throw Error(data.error)
    }

    return { success: "Post updated successfully!", ...data };
}

export { getPosts, getUserPost, createPost, deletePost, updatePost };
