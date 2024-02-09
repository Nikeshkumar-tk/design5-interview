import { useEffect, useState } from "react";

export type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

export const usePosts = (filterKey?: string) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getPosts() {
      setLoading(true);
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      if (!response.ok) {
        setError(true);
        setLoading(false);
        return;
      }
      const data = await response.json();
      setPosts(data);
      setLoading(false);
    }
    getPosts();
  }, []);
  const localPosts = JSON.parse(localStorage.getItem("posts") || "[]") as Post[];
  const allPosts = [...localPosts.reverse(), ...posts];
  return {
    posts: filterKey ? allPosts.filter((post) => post.title.includes(filterKey)) : allPosts,
    loading,
    error,
    resetPosts: setPosts
  };
};
