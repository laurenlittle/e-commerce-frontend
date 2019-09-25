import React, {useState, useEffect} from 'react';
import Card from './Card';
import { getProducts, getCategories } from './apiCore';


const Search = () => {

  const [data, setData] = useState({
    categories: [],
    category: '',
    search: '', // user input
    results: [], // search results
    searched: false
  });

  const {categories, category, search, results, searched} = data;

  const [error, setError] = useState(false);


  const loadCategories = () => {
    // make API request
    getCategories()
      .then(data => {
        if (data.error) {
          setError(data.error);
        } else {
          setData({...data, categories: data.categories});
        }
      })
  };

  const searchSubmit = () => {
    // TODO
  };

  const handleChange = () => {
    // TODO
  };

  const searchForm = () => (

    <form onSubmit={searchSubmit}>
      <span className='input-group-text'>
        <div className='input-group input-group-lg'>
          <div className='input-group-prepend'>
            <select className='btn mr-2' onChange={handleChange('category')}>
              <option value="All">Select a Category </option>
              {
                categories && categories.map(category => (
                  <option key={category._id} value={category._id}>{category.name}</option>
                ))
              }
            </select>

          </div>
          <input
            type='search'
            className='form-control'
            id='search-box'
            onChange={handleChange('search')}
          />
          <label htmlFor='search-box'/>
        </div>
        <div className='btn input-group-append' style={{border: 'none'}}>
          < button className='input-group-text'>Search</button>
        </div>
      </span>

    </form>
  );

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <div className='row'>
      <div className='container mb-3'>
        {searchForm()}
      </div>

    </div>
  )
};

export default Search;