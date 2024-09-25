import mysql from 'mysql'
import dotenv from 'dotenv'

dotenv.config()

const db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    port: process.env.MYSQL_PORT,
    database: process.env.MYSQL_DB
})

db.connect((err) => {
    if(err) {
        console.log('Err: ', err)
        return
    }
    console.log('Connected to mysqldb.')
})

export const doQuery = (sql, options) => {
    return new Promise((resolve, reject) => {
        db.query(sql, options, (err, res) => {
            if(err) return reject(err)
            resolve(res)
        })
    })
}

export default db