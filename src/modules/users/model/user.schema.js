export const userModel = {
    id: { type: 'INT', required: true },
    name: { type: 'VARCHAR', length: 50, required: true },
    birth: { type: 'DATE', required: false }
}

export const tableName = 'users'