import React from 'react';

import styles from './styles.module.css';

import Menu from '../menu';
import withAuth from '../with-auth';

const Header = () => {
   return (
      <div className={styles.header}>
         <Menu />
      </div>
   )
}

export default withAuth(Header);