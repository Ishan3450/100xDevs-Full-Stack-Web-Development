import React from "react";

interface BlogProps {
  title: string,
  content: string,
  authorName: string,
  publishedOn: string
}

const Blog = ( { title, content, authorName, publishedOn }: BlogProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <h3 className="text-l font-bold mb-2">{authorName}</h3>
      </div>
      <p className="text-gray-700">
        {content.slice(0, 100)}...
      </p>
      <p className="mt-2">{publishedOn}</p>
    </div>
  );
};

export default Blog;
