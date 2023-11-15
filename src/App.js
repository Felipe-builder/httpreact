import { useEffect, useState } from 'react';
import './App.css';
import { useFetch } from './hooks/useFetch';

const url = "http://localhost:3000/products"

function App() {
  const [products, setProducts] = useState([]);

  // 4 - custom hook
  const { data: items, httpConfig, loading, error } = useFetch(url);


  const [name, setName] = useState("");
  const [price, setPrice] = useState("");


  // 2 - add de produtos
  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = {
      name,
      price
    }
    
    // 5 - refatorando post
    httpConfig({data: product, method: "POST"})
    setName("");
    setPrice("");
  }

  const handleDelete = async (id) => {
    console.log('id', id)
    httpConfig({id, method: "DELETE"})
  }

  return (
    <div className="App">
      <h1>Lista de Produtos</h1>
      {/* 6 - loading */}
      {loading && <p>Carregando dados...</p>}
      {error && <p>{error}</p>}
      {(!loading && !error) && <ul>
        {Array.isArray(items) && items.map((product) => (
          <li key={product.id}>
            {product.name} - R$: {product.price} <button className='delete' onClick={() => handleDelete(product.id)}>DELETAR</button>
          </li>
        ))}
      </ul>}
      <div className='add-product'>
        <form onSubmit={handleSubmit}>
          <label>
            Nome:
            <input type='text' value={name} name="name" onChange={(e) => setName(e.target.value)} />
          </label>
          <label>
            Price:
            <input type='text' value={price} name="price" onChange={(e) => setPrice(e.target.value)} />
          </label>
          {/* 7 - state de loading no post */}
          {loading && <input type="submit" disabled value="Aguarde"/>}
          {!loading && <input type="submit" value="Criar"/>}
          
        </form>
      </div>
    </div>
  );
}

export default App;
