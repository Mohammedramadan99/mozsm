import { wrapper } from "../store/store";
import "../styles/Style.scss";
import Layout from "../components/Layout/Layout";
import { useStore } from "react-redux";
import { Provider } from "react-redux";
import { AnimatePresence } from "framer-motion";
import { PersistGate } from "redux-persist/integration/react";
import {SessionProvider} from 'next-auth/react'
const App = ({ Component, pageProps,session }) => {
  const store = useStore((state) => state);
  return (
    <PersistGate persistor={store.__persistor} loading={<div>Loading...</div>}>
        <AnimatePresence mode="wait">
          <SessionProvider session={session}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </SessionProvider>
        </AnimatePresence>
    </PersistGate>

  );
};
export default wrapper.withRedux(App);