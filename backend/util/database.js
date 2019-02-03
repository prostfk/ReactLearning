const mysql = require('mysql');
const configuration = require('../constants/config');
let config = {
    host: 'localhost',
    user: configuration.user,
    password: configuration.password,
    database: configuration.database,
    port: 3306
};

class Database {
    constructor() {
        this.connection = mysql.createPool(config);
    }


    executeQuery(sql, args) {
        return this.query(sql,args).then((data, err)=>{
            if (err) {
                this.connection.rollback(()=>{console.log()});
                throw err;
            }
            return data
        }).then(data=>{
            return data;
        })
    }

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

    execute(sql, args) {
        this.connection.query(sql, args, (err) => {
            if (err) console.log(err);
            console.log(sql);
        })
    }

    beginTransaction(callback){
        this.connection.beginTransaction(callback);
    }

    commit(callback){
        this.connection.commit(callback);
    }

    rollback(callback){
        this.connection.rollback(callback);
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

module.exports = Database;