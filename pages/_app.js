import { wrapper } from "../store/store";
import "../styles/Style.scss";
import Layout from "../components/Layout/Layout";
import { Provider } from "react-redux";
function App({ Component, ...pageProps }) {
  const { store, props } = wrapper.useWrappedStore(pageProps);

  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
export default App;
