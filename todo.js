var fs = require("fs"); //文件系统
var path = require("fs"); // 路径系统

const nodePath = process.argv[0]; // 参数0:node路径
const todoPath = process.argv[1]; // 参数1:todo路径
const verb = process.argv[2]; //参数2:执行命令
const index = process.argv[3]; // 参数3:执行项
const content = process.argv[4]; // 参数4:执行内容

switch (verb) {
  case "add":
    fs.stat("/Users/xinjn/work/project/Node/todo/db", (err, stat) => {
      // 存在
      if (err === null) {
        // todo列表
        const fileContent = fs.readFileSync(
          "/Users/xinjn/work/project/Node/todo/db"
        );
        const list = JSON.parse(fileContent); // 反序列化

        const task = index;
        list.push([task, false]);

        // 序列化
        fs.writeFileSync(
          "/Users/xinjn/work/project/Node/todo/db",
          JSON.stringify(list)
        );

        console.log(list);
      } else if (err.code === "ENOENT") {
        // 不存在
        // 序列化
        fs.writeFileSync("/Users/xinjn/work/project/Node/todo/db", "");

        // todo列表
        const list = [];

        const task = index;
        list.push([task, false]);

        // 序列化
        fs.writeFileSync(
          "/Users/xinjn/work/project/Node/todo/db",
          JSON.stringify(list)
        );

        console.log(list);
      } else {
        console.log("Some other erro", err.code);
      }
    });
    break;
  case "list":
    fs.stat("/Users/xinjn/work/project/Node/todo/db", (err, stat) => {
      // 存在
      if (err === null) {
        // todo列表
        const fileContent = fs.readFileSync(
          "/Users/xinjn/work/project/Node/todo/db"
        );
        const list = JSON.parse(fileContent); // 反序列化
        console.log(list);
      } else if (err.code === "ENOENT") {
        // 不存在
        console.log("当前列表暂无待办");
      } else {
        console.log("Some other erro", err.code);
      }
    });
    break;
  case "done":
    fs.stat("/Users/xinjn/work/project/Node/todo/db", (err, stat) => {
      // 存在
      if (err === null) {
        const n = index - 1; // 从1开始
        // todo列表
        const fileContent = fs.readFileSync(
          "/Users/xinjn/work/project/Node/todo/db"
        );
        const list = JSON.parse(fileContent); // 反序列化
        if (list.length === 0 || !list[n]) {
          // 不存在
          console.log("当前列表暂无待办");
        } else {
          list[n][1] = true;
          // 序列化
          fs.writeFileSync(
            "/Users/xinjn/work/project/Node/todo/db",
            JSON.stringify(list)
          );

          console.log(list);
        }
      } else if (err.code === "ENOENT") {
        // 不存在
        console.log("当前列表暂无待办");
      } else {
        console.log("Some other erro", err.code);
      }
    });

    break;
  case "delete":
    fs.stat("/Users/xinjn/work/project/Node/todo/db", (err, stat) => {
      // 存在
      if (err === null) {
        const n = index - 1; // 从1开始
        // todo列表
        const fileContent = fs.readFileSync(
          "/Users/xinjn/work/project/Node/todo/db"
        );
        const list = JSON.parse(fileContent); // 反序列化

        list.splice(n, 1);
        // 序列化
        fs.writeFileSync(
          "/Users/xinjn/work/project/Node/todo/db",
          JSON.stringify(list)
        );

        console.log(list);
      } else if (err.code === "ENOENT") {
        // 不存在
        console.log("当前列表暂无待办");
      } else {
        console.log("Some other erro", err.code);
      }
    });
    break;
  case "edit":
    fs.stat("/Users/xinjn/work/project/Node/todo/db", (err, stat) => {
      // 存在
      if (err === null) {
        const n = index - 1; // 从1开始
        // todo列表
        const fileContent = fs.readFileSync(
          "/Users/xinjn/work/project/Node/todo/db"
        );
        const list = JSON.parse(fileContent); // 反序列化

        if (list.length === 0 || !list[n]) {
          // 不存在
          console.log("当前列表暂无待办");
        } else if (!content || !content.trim()) {
          // 不存在
          console.log("必须声明修改内容");
        } else {
          list[n][0] = content;

          // 序列化
          fs.writeFileSync(
            "/Users/xinjn/work/project/Node/todo/db",
            JSON.stringify(list)
          );

          console.log(list);
        }
      } else if (err.code === "ENOENT") {
        // 不存在
        console.log("当前列表暂无待办");
      } else {
        console.log("Some other erro", err.code);
      }
    });

    break;
  default:
    console.log("不存在当前命令");

    break;
}
