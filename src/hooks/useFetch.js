import { useEffect, useState } from "react"

// 4 - custom hook
export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [id, setId] = useState('');

  // 5 - refatorando post
  const [config, setConfig] = useState();
  const [method, setMethod] = useState();
  const [callFetch, setCallFetch] = useState();

  // 6 - loading
  const [loading, setLoading] = useState(false);

  // 7 - tratando erros
  const [error, setError] = useState(null);


  const httpConfig = ({ id = undefined, data = {}, method }) => {
    let config = {
      method,
      headers: {
        "Content-type": "application/json"
      }
    };

    if (method === "POST") {
      config.body = JSON.stringify(data);
    } else if (method === "DELETE" && id !== undefined) {
      setId(`${id}`);
    }

    setConfig(config);
    setMethod(method);

  }

  useEffect(() => {
    const fetchData = async () => {

      // 6 - loading 
      setLoading(true)
      try {
        const res = await fetch(url)
        const json = await res.json()
        setData(json)
      } catch (error) {
        setError("Houve algum erro ao carregar os dados!")
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, callFetch])

  // 5- refatorando post 
  useEffect(() => {
    const httpRequest = async () => {
      let json
      if (method === 'POST') {
        let fetchOptions = [url, config]
   
        const res = await fetch(...fetchOptions);
        json = await res.json()
      }
      if (method === 'DELETE') {
        let fetchOptions = [url+`/${id}`, config]
   
        const res = await fetch(...fetchOptions);
        json = await res.json()
      }
      setCallFetch(json)
    }

    httpRequest();
  }, [config, method, url, id])
  return { data, httpConfig, loading, error }
}