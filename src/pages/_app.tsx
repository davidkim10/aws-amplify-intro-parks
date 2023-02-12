import "@/styles/globals.css";
import "@/styles/loading-state.css";
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import config from "../aws-exports";

Amplify.configure({ ...config, ssr: true });
export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
