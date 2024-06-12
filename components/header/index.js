import React from 'react';

import Menu from '../menu';
import withAuth from '../with-auth';

const Header = () => {
   return (
      <div>
         <Menu />
      </div>
   )
}

export default withAuth(Header);