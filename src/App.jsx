import style from './App.module.scss';
//引入antd全局样式
import "antd/dist/reset.css";

import { BrowserRouter } from "react-router-dom";
import Layout from './components/Layout';
import { Provider } from "mobx-react";
import stores from './mobx';

function App() {
  return (
    <BrowserRouter>
      {/* 在App父组件上注入状态管理库 */}
      <Provider {...stores}>
        <div className={style.app}>
          <Layout />
        </div>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
