import React, {useState, useEffect} from 'react';
import Layout from './Layout';
import Card from './Card';
import { getCategories } from './apiCore';
import Checkbox from './Checkbox';

const Shop = () => {

  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);

  const init = () => {
    // make API request
    getCategories()
      .then(data => {
        if (data.error) {
          setError(data.error);
        } else {
          setCategories(data.categories);
        }
      })
  };
 

  /* ----------------------
   * @params
   * filters - type: String (Category Id or)
   * filterBy - type: String (price or category)
   * ---------------------- */

  const handleFilters = (filters, filterBy) => {
    console.log('SHOPPPPPP',filters, filterBy);
  }

  useEffect(() => {
    init();
  }, []);

  return (
  <Layout title='Shop' description='Books for all your programming needs' className='container-fluid'>

    <div className='row'>
      <div className='col-4'>
        <h4>Filter by Category</h4>
        <ul>
          <Checkbox categories={categories} handleFilters={filters => handleFilters(filters, 'category')} />
        </ul>
      </div>
      <div className='col-8'>
        right sidebar
      </div>

    </div>

  </Layout>
  );
};

export default Shop;