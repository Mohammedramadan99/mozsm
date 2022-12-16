import { wrapper } from "../store/store";
import "../styles/Style.scss";
import Layout from "../components/Layout/Layout";
function App({ Component, pageProps }) {
  return (
    <>
      <Layout>
        <Component {...pageProps} /> 
      </Layout>
    </>
  );
}
export default wrapper.withRedux(App);
