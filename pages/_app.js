import { useEffect } from 'react';
import '../styles/globals.css';
import 'antd/dist/reset.css';
import { Provider } from 'react-redux';
import store, { initializeState } from '../store/store';
import { Layout } from 'antd';
import HeaderComponent from '../modules/HeaderComponent';
import React from 'react';
import MainContent from '../modules/MainContent';
import { AppProps } from 'next/app';

const { Content, Footer, Header } = Layout;
export default function App({ Component, pageProps }) {

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (store) {
        try {
          let serializedState = localStorage.getItem("arrimo-pro");
          if (serializedState === null) {
            const initialState = initializeState();
            localStorage.setItem("arrimo-pro", JSON.stringify(initialState));
          }
        } catch (err) {
          const initialState = initializeState();
          localStorage.setItem("arrimo-pro", JSON.stringify(initialState));
        }
      }
    }
  }, []);

  return (
    <Provider store={store}>
      <Layout>
        <Header style={{ background: '#c1ff16' }}>
          <HeaderComponent />
        </Header>
        <MainContent>
          <Component {...pageProps} />
        </MainContent>

        <Footer>Footer</Footer>
      </Layout>
    </Provider>
  )
}
