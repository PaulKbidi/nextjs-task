import { getTasks, getTaskById, createTask, updateTask, deleteTaskById } from "@/prisma/task";
import { NextResponse } from "next/server";

export async function GET(req:Request) {
    try {
        const {searchParams} = new URL(req.url);
        const id = searchParams.get("id");
        if (id) {
            const task = await getTaskById(id);
            return NextResponse.json(task, {status: 200});
        }
        const tasks = await getTasks();
        return NextResponse.json(tasks, {status: 200});    
    } catch (error) {
        return NextResponse.json({error: "Internal server error"}, {status: 500});
    }
}

export async function POST(req:Request) {
    try {
        const { name } = await req.json();
        const create = await createTask(name);
        return NextResponse.json(create, {status: 200});
    } catch (error) {
        return NextResponse.json({error: "Internal server error"}, {status: 500});
    }
}

export async function PATCH(req: Request) {
    try {
        const { id, realesed } = await req.json();
        const update = await updateTask(id, realesed);
        return NextResponse.json(update, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Can't update" }, { status: 500 });
    }
}

export async function DELETE(req:Request) {
    try {
        const {searchParams} = new URL(req.url);
        const id = searchParams.get("id");
        if (id) {
            const deleteTask = await deleteTaskById(id);
            return NextResponse.json(deleteTask, {status: 200});
        }
    } catch (error) {
        return NextResponse.json({error: "Internal server error"}, {status: 500});
    }
}