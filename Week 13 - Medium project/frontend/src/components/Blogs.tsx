import React from "react";
import Blog from "./Blog";
import { useBlogs } from "../hooks/useBlogs";
import { Link } from "react-router-dom";

const Blogs = () => {
  const {loading, blogs} = useBlogs();

  if(loading){
    return(
      <div>
        Fetching...
      </div>
    )
  }

  return (
    <div className="bg-gray-100 text-gray-900 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6 flex justify-between">
          <h1 className="text-3xl font-bold">My Blogs</h1>
          <Link to={'/writeBlog'} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">New Blog</Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="grid gap-6">
          {blogs.map(blog => <Link to={`/blog/${blog.id}`}><Blog title={blog.title} content={blog.content} authorName={blog.author.name} publishedOn={new Date().toDateString()}/></Link>)}
         
        </div>
      </main>
    </div>
  );
};

export default Blogs;
