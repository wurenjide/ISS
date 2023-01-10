import { inject, observer } from "mobx-react";
const UserHome = ({ userStore }) => {
    return <>
        前台首页
        <button onClick={() => {
            userStore.addTodo("sb")
            console.log(userStore.totalTodos)
            console.log(userStore.todoList)
        }}>点击添加userStore库中的任务</button>
    </>
}
export default inject("userStore")(observer(UserHome));