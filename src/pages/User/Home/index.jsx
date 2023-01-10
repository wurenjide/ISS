import { inject, observer } from "mobx-react";
const UserHome = ({ todoStore }) => {
    return <>
        前台首页
        <button onClick={() => {
            todoStore.addTodo("sb")
            console.log(todoStore.totalTodos)
            console.log(todoStore.todoList)
        }}>点击添加todoStore库中的任务</button>
    </>
}
export default inject("todoStore")(observer(UserHome));