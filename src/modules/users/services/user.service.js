import { doQuery } from "../../../common/database/mysql.db.js";
import { userModel, tableName } from "../model/user.schema.js";

export const userService = {
    createService: async (payload) => {
        return await doQuery(`INSERT INTO ${tableName} SET?`, payload)
    },
    findService: async (searchParam) => {
        if (!searchParam) return await doQuery(`SELECT * FROM ${tableName}`)
        else return await doQuery(`SELECT * FROM ${tableName} WHERE name LIKE ?`, [`%${searchParam}%`])
    },
    findByIDService: async (id) => {
        return await doQuery(`SELECT * FROM ${tableName} WHERE id = ?`, id)
    },
    updateService: async (payload) => {
        return await doQuery(`UPDATE ${tableName} SET name = ?, birth = ? WHERE id = ?`, [payload.name, payload.birth, payload.id])
    },
    deleteService: async (id) => {
        return await doQuery(`DELETE FROM ${tableName} WHERE id = ?`, id)
    },
    getLatestService: async () => {
        const latestUser =  await doQuery(`SELECT * FROM ${tableName} ORDER BY id DESC LIMIT 1`)
        return latestUser ? latestUser[0] : null;
    }
}

export default userService