import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Loader from "./Loader";
import Post from "./Post";
import Banner from "./Banner";
import SearchInput from "./SearchInput";
import { FaArrowUp } from "react-icons/fa6";

const MemoizedPost = React.memo(Post);

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    loadPosts();
  }, [currentPage]);

  useEffect(() => {
    // Update showScrollToTop state based on scroll position
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 200
      ) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Remove event listener when component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const loadPosts = () => {
    setLoading(true);
    axios
      .get(`/posts?page=${currentPage}&limit=5`)
      .then((response) => {
        const newPosts = response.data;

        // Combine existing posts and new posts
        const allPosts = currentPage === 1 ? newPosts : [...posts, ...newPosts];

        // Apply the filter to all posts
        const filteredPosts = allPosts.filter((post) => {
          const titleMatch = post.title
            .toLowerCase()
            .includes(search.toLowerCase());
          const placeMatch = post.place
            .toLowerCase()
            .includes(search.toLowerCase());
          return titleMatch || placeMatch;
        });

        setPosts(filteredPosts);
        setHasMore(newPosts.length > 5);
        setLoading(false);

        if (currentPage > 1 && containerRef.current) {
          containerRef.current.scrollIntoView({
            behavior: "smooth",
            block: "end",
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setLoading(false);
      });
  };

  const loadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value;
    setSearch(searchTerm);
    setLoading(false);
    setCurrentPage(1);
  };

  // Scroll configs
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Banner />
      <div className="mx-auto px-6  pb-12 dark:bg-gray-950 dark:text-slate-200">
        <h1 className="text-5xl font-bold md:text-6xl pt-6 pb-2 mb-4 text-teal-700 dark:text-gray-300   dark:border-slate-200">
          Traveller's posts
        </h1>

        <SearchInput onChange={handleSearchChange} value={search} />
        {loading ? (
          <Loader />
        ) : (
          <div ref={containerRef} className="container flex flex-col mt-2">
            {posts.length === 0 ? (
              <p className="text-gray-800 dark:text-slate-300 mt-4 text-3xl">
                No posts to display
              </p>
            ) : (
              posts
                .filter((post) => {
                  const titleMatch = post.title
                    .toLowerCase()
                    .includes(search.toLowerCase());
                  const placeMatch = post.place
                    .toLowerCase()
                    .includes(search.toLowerCase());
                  return titleMatch || placeMatch;
                })
                .map((post) => <MemoizedPost key={post._id} post={post} />)
            )}
          </div>
        )}

        {hasMore && (
          <button
            onClick={loadMore}
            className="mt-4 p-2 bg-teal-500 text-white rounded dark:bg-gray-500"
          >
            Load More
          </button>
        )}
        {showScrollToTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-4 right-4 p-2 bg-teal-700 text-white rounded-full"
          >
            <FaArrowUp />
          </button>
        )}
      </div>
    </>
  );
};

export default PostList;
