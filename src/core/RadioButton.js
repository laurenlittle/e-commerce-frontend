import React, {useState, useEffect} from 'react';

const RadioButton =({prices, handleFilters}) => {

  const [values, setValues] = useState(0);

  const handleChange = event => {
    handleFilters(event.target.value);
    setValues(event.target.value);
  };

  return prices.map(priceRange => (

    <div key={priceRange._id}>
      <input
        onChange={handleChange}
        value={`${priceRange._id}`}
        name={priceRange}
        type='radio'
        id='price-range'
        className='mr-2 ml-4'
      />
      <label htmlFor='price-range' className='form-check-label'>{priceRange.name}</label>
    </div>
  ));
};

export default RadioButton;