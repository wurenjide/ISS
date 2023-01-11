import UserStore from "./user";
import AdminStore from "./admin";
import AppStore from "./app"
let userStore = new UserStore();
let adminStore = new AdminStore();
let appStore=new AppStore();
const stores = {
    userStore,
    adminStore,
    appStore,
}
export default stores;