import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import MainLayout from '../components/MainLayout/MainLayout';
import LoginForm from '../components/LoginForm'

function Login(state) {
  const dispatch = state.dispatch
  return (
    <MainLayout location={location}>
      <div className={styles.normal}>
        <h1 className={styles.title}>登陆</h1>
        <LoginForm dispatch={dispatch} />
      </div>
    </MainLayout>
  );
}

Login.propTypes = {
};

export default connect()(Login);
