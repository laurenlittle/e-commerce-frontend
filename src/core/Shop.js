import React, {useState, useEffect} from 'react';
import Layout from './Layout';
import Card from './Card';
import { getCategories, getFilteredProducts } from './apiCore';
import Checkbox from './Checkbox';
import RadioButton from './RadioButton';
import { prices } from './fixedPrices';

const Shop = () => {

  const [categories, setCategories] = useState([]);
  const [selectedFilters, setFilters] = useState({
    filters: {
      category: [], // array of category Ids
      price: [] // Price Range
    }
  })
  const [error, setError] = useState(false);
  const [limit, setLimit] = useState(6);
  const [size, setSize] = useState(0);
  const [skip, setSkip] = useState(0);
  const [filteredResults, setfilteredResults] = useState([]);

  console.log(filteredResults);

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

  const loadFilteredResults = (myFilters) => {
    // make API request
    getFilteredProducts(skip, limit, myFilters)
    .then(data => {
      if (data.error) {
        setError(data.error);
      }  else {
        setfilteredResults(data.data);
        setSize(data.size);
        setSkip(0);
      }
    })
  };

  const loadMore = () => {

    let SkipTo = skip + limit;
    // make API request
    getFilteredProducts(SkipTo, limit, selectedFilters.filters)
      .then(data => {
        if (data.error) {
          setError(data.error);
        } else {
          setfilteredResults([...filteredResults, ...data.data]); // mix of old/new data
          setSize(data.size);
          setSkip(SkipTo);
        }
      })
    };

  const loadMoreButton = () => {
    return (
      size > 0 && size >= limit && (
        <button onClick={loadMore} className='btn btn-secondary'>Load More</button>
      )
    )
  }

  useEffect(() => {
    init();
    loadFilteredResults(skip, limit, selectedFilters.filters);
  }, []);

  /* ----------------------
   * @params
   * filters - type: String (Category Id or price range)
   * filterBy - type: String (price or category)
   * ---------------------- */

  const handleFilters = (filters, filterBy) => {
    const newFilters = {...selectedFilters};

                  // State Object
    newFilters.filters[filterBy] = filters;
                                    // Function Args

    if(filterBy === 'price') {
      let priceValues = handlePrice(filters);
      newFilters.filters[filterBy] = priceValues;
    }

    loadFilteredResults(selectedFilters.filters);
    setFilters(newFilters); // value to be sent to backend
  }

  const handlePrice = value => {
    const data = prices;
    let array = [];

    for (let key in data) {
      // Find _id that matches from radiobutton
      if(data[key]._id === parseInt(value)) {
        array = data[key].array;
      }
    }

    return array;
  }


  return (
  <Layout title='Shop' description='Books for all your programming needs' className='container-fluid'>

    <div className='row'>
      <div className='col-4'>
        <h4>Filter by Category</h4>
        <ul>
          <Checkbox categories={categories} handleFilters={filters => handleFilters(filters, 'category')} />
        </ul>

        <h4>Filter by Price</h4>
        <>
          <RadioButton prices={prices} handleFilters={filters => handleFilters(filters, 'price')}/>
        </>

      </div>

      <div className='col-8'>
        <h2 className='mb-4'> Products</h2>
         <div className='row'>
          {
            filteredResults.map(result => {
              return <Card key={result._id} product={result}/>
            })
          }
        </div>
        <hr />
        {loadMoreButton()}
      </div>

    </div>

  </Layout>
  );
};

export default Shop;