import prisma from "./prisma";

export const getTasks = async () => {
    return await prisma.task.findMany();
}

export const getTaskById = async (id: string) => {
    return await prisma.task.findUnique({
        where: {
            id
        }
    });
}

export const createTask = async (name: string) => {
    return await prisma.task.create({
        data: {
            name
        }
    });
}

export const updateTask = async (id: string,realesed: boolean) => {
    return await prisma.task.update({
        where: {
            id
        },
        data: {
            realesed
        }
    });
}

export const deleteTaskById = async (id: string) => {
    return await prisma.task.delete({
        where: {
            id
        }
    });
}