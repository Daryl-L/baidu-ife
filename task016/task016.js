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
}
    
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

function delBtnHandle() {
    
}
    
(function () {
    var addBtn = document.getElementById("add-btn");
    addBtn.addEventListener("click", addBtnHandle);
})();