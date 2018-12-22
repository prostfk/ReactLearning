const mysql = require('mysql');
// const pgp = require('pg-promise');
// const db = pgp("postgres://postgres:0@localhost:5432/truck");

let config = {
    host: 'localhost',
    user: 'prostrmk',
    password: '0',
    database: 'truck'
};

class Database {
    constructor() {
        this.connection = mysql.createConnection(config);
    }

    // executeQuery(sql){
    //     db.one(sql).then(rows=>{
    //         resolve(rows);
    //     })
    // }

    query(sql, args) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, args, (err, rows) => {
                if (err)
                    return reject(err);
                console.log(sql);
                resolve(rows);
            });
        });
    }

    execute(sql, args){
        this.connection.query(sql, args, (err)=>{
            if (err) console.log(err);
            console.log(sql);
        })
    }

    close() {
        return new Promise((resolve, reject) => {
            this.connection.end(err => {
                if (err)
                    return reject(err);
                resolve();
            });
        });
    }
}

module.exports.Database = Database;
// module.exports.execute = execute;
// module.exports.executeQuery = executeQuery;