import { format, startOfDay, startOfWeek, startOfMonth, addDays, addWeeks, addMonths, isBefore } from 'date-fns';
import { getCurrentUser, getUserTask, updateTaskStatusDate } from './appwrite';

export const updateTask = async () => {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser) throw new Error("No user found");

        const tasks = await getUserTask(currentUser.$id);
        const now = new Date();

        const updatedTasks = tasks.map(task => {
            const taskDate = new Date(task.date);
            let expired = false;

            switch (task.period) {
                case "Päivittäin":
                    console.log(taskDate);
                    if (isBefore(addDays(taskDate, 1), now)) {
                        expired = true;
                        console.log("expired päivitetty")
                    }
                    break;
                
                case "Viikoittain":
                    if (isBefore(addWeeks(taskDate, 1), now)) {
                        expired = true;
                    }
                    break;

                case "Kuukausittain":
                    if (isBefore(addMonths(taskDate, 1), now)) {
                        expired = true;
                    }
                    break;

                default:
                    console.warn(`Unknown period: ${task.period}`);
                    break;
            }

            if (expired) {
                return {
                    ...task,
                    done: false,
                    date: now.toISOString(),
                };
            }

            return task;
        });

        // Update the database with new task statuses
        for (const task of updatedTasks) {
            if (task.done === false) {
                await updateTaskStatusDate(task.$id, task.done, task.date);
                console.log(task.$id, task.done, task.date, "päivitetty taski");
            }
        }
        console.log("taskeja oli", updatedTasks);
        console.log('Tasks updated successfully');
    } catch (error) {
        console.error('Error updating tasks:', error);
    }
};
