import { useEffect, useState } from "react";

const useFetch = (url) => {
    const [data,setdata]=useState();
    const [isPending,setIsPending]=useState();
    const [error,setError]=useState();

    useEffect(()=>{
        const abortcont = new AbortController();
        fetch(url, { signal: abortcont.signal})
        .then(res => {
            if (!res.ok) {
                throw Error('could not fetch for that resource');
            }
            return res.json()
        }).then(data => {
            setdata(data);
            setIsPending(false);
            setError(null);
        })
        .catch(err => {
            if (err.name === 'AbortError') {
                console.log("abort");
            }else{
                setError(err.message);
                setIsPending(false);
            } 
        });
        return () => abortcont.abort();
    }, [url]);

    return {data,isPending,error};
}
 
export default useFetch;