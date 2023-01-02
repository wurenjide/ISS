import routes from "../../router";
import { useRoutes } from "react-router-dom";
const Layout = () => {
    const elements = useRoutes(routes);
    return <>
        {elements}
    </>
}
export default Layout;