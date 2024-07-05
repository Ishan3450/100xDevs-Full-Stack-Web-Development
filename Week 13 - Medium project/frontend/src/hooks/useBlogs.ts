import axios from "axios";
import { useEffect, useState } from "react"

interface Blog{
    id: number,
    title: string,
    content: string,
    published: boolean,
    author: {name: string}
}

export const useBlogs = () => { 
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/blog/bulk").then(res => {
            const data = res.data.allBlogs;
            setLoading(false);
            setBlogs(data);
        });
    }, []);

    return {loading, blogs};
}