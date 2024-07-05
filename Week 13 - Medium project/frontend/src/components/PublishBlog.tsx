import axios from "axios";
import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const PublishBlog = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState<string>("");
    const[content, setContent] = useState<string>("");

    async function addBlog(e: FormEvent) {
        e.preventDefault();

        const response = await axios.post("http://localhost:3000/api/v1/blog/", {
            title, content
        }, {
            headers: {
                Authorization: localStorage.getItem("auth")
            }
        });
        
        if(response.data.postId){
            navigate(`/blog/${response.data.postId}`);
        }
    }
  return (
    <div className="min-w-screen min-h-screen">
      <form className="max-w-[50%] mx-auto mt-5" onSubmit={addBlog}>
        <div className="mb-3">
          <label
            htmlFor="large-input"
            className="block mb-2 text-lg font-medium text-gray-900"
          >
            Title
          </label>
          <input
            type="text"
            id="large-input"
            className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 "
            onChange={e => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="block mb-2 text-lg font-medium text-gray-900"
          >
            Content
          </label>
          <textarea
            id="message"
            rows={10}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
            onChange={e => setContent(e.target.value)}
          ></textarea>
        </div>

        <button type="submit" className="mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Publish</button>
      </form>
    </div>
  );
};

export default PublishBlog;
