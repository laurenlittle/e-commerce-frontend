import React, {useState, useEffect} from 'react';

const Checkbox = ({categories, handleFilters}) => {

  const [checked, setChecked] = useState([]);

  const handleToggle = category => () => {

    const currentCategoryId = checked.indexOf(category) // return index of the first occurrence OR not found return -1
    const newCheckedCategoryId = [...checked];

    if(currentCategoryId === -1) { // if currently checked category wasn't in the state - add
      newCheckedCategoryId.push(category)
    } else { // remove
      newCheckedCategoryId.splice(currentCategoryId, 1);
    }
    // console.log(newCheckedCategoryId);
    setChecked(newCheckedCategoryId);
    handleFilters(newCheckedCategoryId);


  }
  return categories.map((category) => (

      <li key={category._id} className='list-unstyled'>
        <input onChange={handleToggle(category._id)} value={checked.indexOf(category._id === -1)} id='category-checkbox' type='checkbox' className='form-check-input' />
        <label htmlFor='category-checkbox' className='form-check-label'> {category.name} </label>
      </li>
  ));
};

export default Checkbox;