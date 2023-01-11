import { observable, action, computed,makeAutoObservable} from "mobx";
const State = true
class AppStore {
    constructor(){
        makeAutoObservable(this)
    }
    appState = State

    @computed
    get State() {
        return this.appState
    }

    @action
    changeState(t) {
        console.log(this.appState)
        this.appState = !this.appState
        console.log(this.appState)
    }
}


export default AppStore