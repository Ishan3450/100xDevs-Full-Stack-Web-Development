import React from "react";
import { Link, useParams } from "react-router-dom";
import { useBlog } from "../hooks/useBlog";

const FullBlog = () => {
  const { blogId } = useParams();
  const { loading, blog } = useBlog({ id: Number(blogId) });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-100 text-gray-900 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6 flex justify-between">
          <h1 className="text-3xl font-bold">Blog</h1>
          <Link to={'/writeBlog'} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">New Blog</Link>
        </div>
      </header>

      <div className="bg-white p-6 rounded-lg shadow-md m-4 ">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold mb-2">{blog?.title}</h2>
          <h3 className="text-l font-bold mb-2">{blog?.author.name}</h3>
        </div>
        <p className="text-gray-700">{blog?.content}</p>
        <p className="mt-2">{new Date().toDateString()}</p>
      </div>
    </div>
  );
};

export default FullBlog;
