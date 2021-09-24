import React from "react";
import ReactDOM from "react-dom";
import Popup from "./popup";
import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";
const antdConfig = {
  locale: zhCN,
};

ReactDOM.render(
  <ConfigProvider {...antdConfig}>
    <Popup />
  </ConfigProvider>,
  //   <React.StrictMode>
  //     <App />
  //   </React.StrictMode>,
  document.getElementById("root")
);
