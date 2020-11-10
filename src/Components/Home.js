import React, { Component } from "react"
import { Button, ProgressBar } from "react-bootstrap"
import "../Styles/home.css"
import delimg from "../Assets/Images/delete.png"

class Home extends Component {
    state = {
        servers: 1,
        tasks: 0,
        percent: {},
        pending: 0
    }
    addServer = () => {
        let { tasks, servers, pending } = this.state
        let oldmin = Math.min(servers,tasks)
        if (servers < 10) {
            servers++
        }
        let newmin = Math.min(servers,tasks)
        for(let i=oldmin;i<newmin;i++){
            this.startInterval(i)
        }
        if (tasks >= servers) {
            pending = tasks - servers
        }
        this.setState({ pending, servers })
    }
    startInterval = (num) => {
        const interval = setInterval(() => {
            let percent = this.state.percent[num] || 0
            if (percent === 100) {                
                clearInterval(interval);
            }
            else {
                percent += 5
                this.setState({
                    percent: {
                        ...this.state.percent,
                        [num]: percent
                    }
                })
            }
        }, 1000);
    }
    taskHandler = event => {
        event.preventDefault()
        let { tasks, servers, pending } = this.state
        tasks = event.target[0].value
        this.setState({ tasks })
        if (tasks >= servers) {
            pending = tasks - servers
        }
        this.setState({ pending })
        const min = Math.min(servers,tasks)
        for(let i=0;i<min;i++){
            this.startInterval(i)
        }
    }

    removeTask = () => {
        let { pending } = this.state
        pending--
        this.setState({ pending })
    }
    removeServer = () => {
        let { servers, tasks } = this.state
        if (tasks < servers && servers > 1)
            servers--
        this.setState({ servers })
    }
    render() {
        const { servers, tasks, percent, pending } = this.state
        console.log("tasks", tasks, "servers", servers, "pending", pending,"percent",percent)
        return (
            <div className="container">
                <div className="box1">
                    <div className="head">
                        <h3>Task Manager</h3>
                    </div>
                    <div className="container2">
                        <div className="taskcontainer">
                            <div className="taskinput">
                                <form onSubmit={this.taskHandler}>
                                    <input type="number" />
                                    <Button type="submit">Add Task</Button>
                                </form>
                            </div>
                            <div className="tasksview">
                                <div className="ongoing">
                                    {(tasks <= servers && tasks > 0) &&
                                        ' '.repeat(tasks).split("").map((task,i) => {
                                            return (
                                                <ProgressBar now={percent[i] || 0} label={`${percent[i] || 0}%`} />
                                            )
                                        })
                                    }
                                    {(tasks > servers) &&
                                        ' '.repeat(servers).split("").map((task,i) => {
                                            return (
                                                <ProgressBar now={percent[i] || 0} label={`${percent[i] || 0}%`} />
                                            )
                                        })
                                    }
                                </div>
                                <div className="pending">
                                    {pending > 0 &&
                                        ' '.repeat(pending).split("").map(task => {
                                            return (
                                                <div className="pendview">
                                                    <ProgressBar style={{ flex: 1 }} now={0} />
                                                    <img src={delimg} onClick={this.removeTask} />
                                                </div>
                                            )
                                        })}
                                </div>
                            </div>
                        </div>
                        <div className="server">
                            <div className="serverbtn">
                                <Button onClick={this.addServer}>Add Server</Button>
                                <Button onClick={this.removeServer}>Remove Server</Button>
                            </div>
                            <div className="serverview">
                                {`${servers} server available`}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Home