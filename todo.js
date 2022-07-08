var fs = require("fs"); //文件系统
var path = require("path"); // 路径系统

// 数据库：绝对路径
const basePath = path.join(__dirname, "db"); // 等价于 process.cwd()+'/db'

console.log("basePath", basePath);

const nodePath = process.argv[0]; // 参数0:node路径
const todoPath = process.argv[1]; // 参数1:todo路径
const verb = process.argv[2]; //参数2:执行命令
const index = process.argv[3]; // 参数3:执行项
const content = process.argv[4]; // 参数4:执行内容

// 请求数据库
const fetchDB = () => {
  const fileContent = fs.readFileSync(basePath);
  const list = JSON.parse(fileContent);
  return list;
};

//保存数据库
const saveDB = (list) => {
  // 序列化
  fs.writeFileSync(basePath, JSON.stringify(list));
};

// 展示数据库
const display = (list) => {
  for (let i = 0; i < list.length; i++) {
    const type = list[i][0];
    const status = list[i][1] ? "[x]" : "[_]";
    console.log(status + " " + "任务内容：" + type);
  }
};

// 添加列表项
const addDB = (list, index) => {
  list.push([index, false]);
};

// 删除列表项
const removeDB = (list, index) => {
  list.splice(index, 1);
};

// 检测是否存在：db数据库文件
try {
  fs.statSync(basePath);
} catch (error) {
  // 不存在直接创建
  fs.writeFileSync(basePath, "[]");
}

// 请求数据库
const list = fetchDB();
let n;

switch (verb) {
  case "add":
    addDB(list, index);

    // 存入数据库
    saveDB(list);
    display(list);
    break;
  case "list":
    display(list);
    break;
  case "done":
    n = index - 1; // 从1开始

    if (list.length === 0 || !list[n]) {
      // 不存在
      console.log("当前列表暂无待办");
    } else {
      list[n][1] = true;
      // 存入数据库
      saveDB(list);
      display(list);
    }

    break;
  case "delete":
    n = index - 1; // 从1开始

    removeDB(list, n);
    // 存入数据库
    saveDB(list);
    display(list);
    break;
  case "edit":
    n = index - 1; // 从1开始

    if (list.length === 0 || !list[n]) {
      // 不存在
      console.log("当前列表暂无待办");
    } else if (!content || !content.trim()) {
      // 不存在
      console.log("必须声明修改内容");
    } else {
      list[n][0] = content;

      // 存入数据库
      saveDB(list);
      display(list);
    }

    break;
  default:
    console.log("不存在当前命令");
    break;
}
