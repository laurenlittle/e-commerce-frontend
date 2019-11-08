import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth/index';
import { getItemTotal } from '../cart/helpers/cartHelpers';

const isActive = (history, path) => {

  if(history.location.pathname === path) {
    return { color: '#FF0745' }
  } else {
    return { color: '#39423E' }
  }
}

// history avail as props (via withRouter). instead passing props and using props.history - destructuring to get history

const Menu = ({history}) => (
  <div>
    <ul className='nav justify-content-end'>
      <li className='nav-item'>
        <Link className='nav-link' style={isActive(history, '/')} to='/'>Home</Link>
      </li>
      <li className='nav-item'>
        <Link className='nav-link' style={isActive(history, '/shop')} to='/shop'>Shop</Link>
      </li>

      { isAuthenticated() && isAuthenticated().user.role === 0 && (
         <li className='nav-item'>
          <Link className='nav-link' style={isActive(history, '/user/dashboard')} to='/user/dashboard'>Dashboard</Link>
        </li>
        )
      }

      { isAuthenticated() && isAuthenticated().user.role === 1 && (
         <li className='nav-item'>
          <Link className='nav-link' style={isActive(history, '/admin/dashboard')} to='/admin/dashboard'>Dashboard</Link>
         </li>
        )
      }

      { !isAuthenticated() && (
        <>
          <li className='nav-item'>
            <Link className='nav-link' style={isActive(history, '/signup')} to='/signup'>Sign up</Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' style={isActive(history, '/signin')}  to='/signin'>Sign in</Link>
          </li>
        </>
      )}

      { isAuthenticated() && (
        <li className='nav-item'>
          <span className='nav-link' style={{cursor: 'pointer', color: '#FF0745'}}
            onClick={() => signout(() => {
              history.push('/');
            })}
          > Sign out
          </span>
        </li>
      )}

      <li className='nav-item'>
        <Link className='nav-link' style={isActive(history, '/cart')} to='/cart'>
          Cart <sup><small className='cart-badge'>{getItemTotal()}</small></sup>
        </Link>
      </li>

    </ul>
  </div>
)

export default withRouter(Menu);