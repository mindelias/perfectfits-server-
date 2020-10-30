import App, { Container } from "next/app";
import React from "react";
import {withApollo} from "../lib/withApollo";

function MyApp() {
   
  return <div></div>;
}

export default withApollo({ ssr: true })(MyApp);
