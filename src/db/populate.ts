import { getDateString } from '../helpers/functions';
import { db } from './db';

export async function populate() {
    await db.user.bulkAdd([
        {
            first_name: 'Student',
            last_name: 'One',
            email: 'studentone@usc.edu.ph',
            password: '!password2023',
            type: 'STUDENT',
            created_at: getDateString(),
            updated_at: getDateString(),
        },
        {
            first_name: 'Test',
            last_name: 'test',
            email: 'test@usc.edu.ph',
            password: '!password2023',
            type: 'STUDENT',
            created_at: getDateString(),
            updated_at: getDateString(),
        },
        {
            first_name: 'Student',
            last_name: 'Ern',
            email: 'studentern@usc.edu.ph',
            password: '!password2023',
            type: 'STUDENT',
            created_at: getDateString(),
            updated_at: getDateString(),
        },
        {
            first_name: 'Lab Tech',
            last_name: 'One',
            email: 'labtechone@usc.edu.ph',
            password: '!password2023',
            type: 'LAB_TECH',
            created_at: getDateString(),
            updated_at: getDateString(),
        },
        {
            first_name: 'Admin',
            last_name: 'One',
            email: 'adminone@usc.edu.ph',
            password: '!password2023',
            type: 'ADMIN',
            created_at: getDateString(),
            updated_at: getDateString(),
        },
    ])
}