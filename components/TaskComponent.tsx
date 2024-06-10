"use client"
import React, { useEffect, useState } from 'react';
import { Task } from '@prisma/client';
import Link from 'next/link';

const TaskComponent = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        fetch("/api/task")
        .then((res) =>  res.json())
        .then((data) => setTasks(data))
    }, []);

    const deleteTask = (id: string) => {
        fetch("/api/task?id=" + id, {
            method: "DELETE",
        }).then((res) => {
            if (res.ok) {
                setTasks((prevState) => prevState.filter((task) => task.id !== id))
            }
        })
    }

    const updateTask = (id: string, realesed: boolean) => {
        fetch("/api/task", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id,
                realesed
            }),
        }).then((res) => {
            if (res.ok) {
                setTasks((prevState) => prevState.map((task) => {
                    if (task.id === id) {
                        return {
                            ...task,
                            realesed
                        }
                    }
                    return task
                }))
    }})
    }

    return (
        <div className='flex justify-center items-center flex-col'>
            <h1 className='my-5'>Task List</h1>
            <div>
                {tasks.map((task) => (
                    <div key={task.id} className='flex justify-center items-center flex-row gap-5'>
                        <button onClick={() => deleteTask(task.id)} className='hover:text-red-500'>X</button>
                        <p>{task.name}</p>
                        <input
                            type='checkbox'
                            checked={task.realesed}
                            onChange={() => updateTask(task.id, !task.realesed)}
                        />
                    </div>
                ))}
            </div>
    
            <button className='hover:text-blue-500 mt-5'>
                <Link href="/task/create">Create Task</Link>
            </button>
        </div>
    );
};

export default TaskComponent;