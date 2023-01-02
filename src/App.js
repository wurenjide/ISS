import style from './App.module.css';
//引入antd全局样式
import "antd/dist/reset.css";
import { BrowserRouter } from "react-router-dom";
import Layout from './components/Layout';
function App() {
  return (
    <BrowserRouter>
      <div className={style.app}>
          <Layout/>
      </div>
    </BrowserRouter>
  );
}

export default App;
