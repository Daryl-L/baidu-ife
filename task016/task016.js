/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var city = document.getElementById("aqi-city-input").value;
    var aqi = document.getElementById("aqi-value-input").value;
    aqiData[city] = aqi;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var table = document.getElementById("aqi-table");
    table.innerHTML = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
    for (let key in aqiData) {
        let tr = document.createElement("tr");
        tr.innerHTML = "<td>" + key + "</td><td>" + aqiData[key] + "</td><td><button class=\"del-btn\">删除</button></td>";
        table.appendChild(tr);
    }
    var delBtn = document.getElementsByClassName("del-btn");
    for (let i = 0; i < delBtn.length; i++) {
        delBtn[i].addEventListener("click", delBtnHandle);
    }
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(e) {
    var aqiTable = document.getElementById("aqi-table");
    var tr = e.target.parentElement.parentElement;
    var td = tr.getElementsByTagName("td");
    delete aqiData[td[0].innerHTML];
    aqiTable.removeChild(tr);
}
    
(function () {
    var addBtn = document.getElementById("add-btn");
    addBtn.addEventListener("click", addBtnHandle);
})();