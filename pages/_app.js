import { wrapper } from "../store/store";
import "../styles/Style.scss";
import Layout from "../components/Layout/Layout";
import { Provider } from "react-redux";
import { AnimatePresence } from "framer-motion";

function App({ Component, ...pageProps }) {
  const { store, props } = wrapper.useWrappedStore(pageProps);

  return (
    <Provider store={store}>
      <Layout>
        <AnimatePresence mode="wait">
          <Component {...pageProps} />
        </AnimatePresence>
      </Layout>
    </Provider>
  );
}
export default App;
