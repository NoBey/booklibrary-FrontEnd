import React from 'react';
import { connect } from 'dva';
import styles from './Users.css';
import BooksComponent from '../components/Book/Book';
import MainLayout from '../components/MainLayout/MainLayout';

function Books({ location }) {
  return (
    <MainLayout location={location}>
      <div className={styles.normal}>
        <BooksComponent />
      </div>
    </MainLayout>
  );
}

export default connect()(Books);
