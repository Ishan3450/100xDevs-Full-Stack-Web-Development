import axios from "axios";
import { useEffect, useState } from "react"

interface Blog{
    id: number,
    title: string,
    content: string,
    published: boolean,
    author: {name: string}
}

export const useBlog = ({id}: {id: number}) => { 
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();

    useEffect(() => {
        axios.get(`http://localhost:3000/api/v1/blog/getBlog/${id}`).then(res => {
            const data = res.data.blog;
            setLoading(false);
            setBlog(data);
        });
    }, []);

    return {loading, blog};
}