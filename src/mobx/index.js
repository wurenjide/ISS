import UserStore from "./user";
import AdminStore from "./admin";
let userStore = new UserStore();
let adminStore = new AdminStore();
const stores = {
    userStore,
    adminStore
}
export default stores;