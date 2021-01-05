/*
 * @Author: Kanata You 
 * @Date: 2021-01-05 13:12:08 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2021-01-05 19:52:39
 */

/** Express 框架 */
const express = require('express');
/** 基于 express 的服务 */
const app = express();
// /** 本地文件流操作相关的模块 */
// const fs = require("fs");
// /** 用于启动子进程，执行本地环境命令的模块 */
// const process = require('child_process');
/** nodeJS 的中间件工具 */
const bodyParser = require('body-parser');
const { ConnectionPool } = require('mssql');

const config = {
    server: 'localhost', // host
    database: 'inkacy',
    user: 'sa',
    options: {
        encrypt: true
    },
    password: 'admin',
    port: 1433
};


// 使用路由中间件，将传输限制设置为 50mb，设置 JSON 解析。
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json());


/**
 * 对传回前端的请求结果简单包装。
 *
 * @param {boolean}     state   状态
 * @param {*}           data    回传数据，或报错信息
 * @param {*}           comment 回传注释
 * @returns                     返回前端的 JS 对象
 */
const decorate = (state, data, comment) => {
    return {
        state: state ? "successed" : "failed",
        data: data,
        comment: comment
    };
};


// 一个简单的 GET 路由，可以用来检测后端服务器是否正确开启
app.get("/test", (_, res) => {
    // 设置请求头
    res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:3000");
    // 返回请求
    res.json(
        decorate(
            true,
            {},
            "位于端口号 2369 的服务器已开启"
        )
    );
});

const SCProps = {
    uid: null,
    uname: ""
};

app.post('/getSCProps', (_req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:3000");
    res.json(
        decorate(
            true,
            SCProps,
            "done"
        )
    );
});

app.post('/signin', (req, res) => {
    const name = req.body["name"];
    const pwd = req.body["pwd"];

    new ConnectionPool(config).connect().then(pool => {
        return pool.query(`SELECT * FROM UserList WHERE uname = '${ name }'`);
    }).then((result) => {
        const val = result.recordset;
        if (val.length === 0) {
            res.json(
                decorate(
                    false,
                    { code: -1 },
                    "User not found"
                )
            );
        } else {
            const rp = val[0].pwd.trimEnd();
            if (rp === pwd) {
                SCProps.uid = val[0].uid.trimEnd();
                SCProps.uname = val[0].uname.trimEnd();
                res.json(
                    decorate(
                        true,
                        { code: 1 },
                        "done"
                    )
                );
            } else {
                res.json(
                    decorate(
                        true,
                        { code: -2 },
                        "Wrong password"
                    )
                );
            }
        }
    }).catch((err) => {
        console.log(err);
        res.json(
            decorate(
                false,
                { code: 404 },
                err
            )
        );
    });
});


app.post('/searchGroup', (req, res) => {
    const keyword = req.body["keyword"];

    new ConnectionPool(config).connect().then(pool => {
        return pool.query(
            `SELECT * FROM GroupList`
        );
    }).then((result) => {
        const val = result.recordset.filter(d => {
            return new RegExp(".*" + keyword.split("").join(".*") + ".*", "i").exec(d.gname);
        });
        if (val.length === 0) {
            res.json(
                decorate(
                    false,
                    { code: -1, groups: [] },
                    "No result"
                )
            );
        } else {
            res.json(
                decorate(
                    true,
                    { code: 1, groups: val },
                    "done"
                )
            );
        }
    }).catch((err) => {
        console.log(err);
        res.json(
            decorate(
                false,
                { code: 404, groups: [] },
                err
            )
        );
    });
});


app.post('/myGroup', (req, res) => {
    const uid = req.body["uid"];

    new ConnectionPool(config).connect().then(pool => {
        return pool.query(
            `SELECT * FROM ((SELECT gid FROM MemberList WHERE uid=${ uid }) AS `
            + `T JOIN GroupList ON GroupList.gid = T.gid)`
        );
    }).then((result) => {
        const val = result.recordset;
        if (val.length === 0) {
            res.json(
                decorate(
                    false,
                    { code: -1, groups: [] },
                    "Joined 0 group"
                )
            );
        } else {
            res.json(
                decorate(
                    true,
                    { code: 1, groups: val },
                    "done"
                )
            );
        }
    }).catch((err) => {
        console.log(err);
        res.json(
            decorate(
                false,
                { code: 404, groups: [] },
                err
            )
        );
    });
});


// 使用任意 sql 语句查询
app.post('/sql', (req, res) => {
    const cmd = req.body["cmd"];

    new ConnectionPool(config).connect().then(pool => {
        return pool.query(cmd);
    }).then((result) => {
        res.json(
            decorate(
                true,
                result,
                "查询成功"
            )
        );
    }).catch((err) => {
        res.json(
            decorate(
                false,
                {},
                err
            )
        );
    });
});


// 开启服务，端口号为 2369
const server = app.listen(2369, () => {
    const addr = server.address().address;
    const host = addr === "::" ? "127.0.0.1" : addr;
    const port = server.address().port;
    console.log("Back-end server opened at http://" + host + ":" + port);
});
