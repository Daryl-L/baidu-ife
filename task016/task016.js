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
    var city = document.getElementById("aqi-city-input");
    var aqi = document.getElementById("aqi-value-input");
    aqiData[city] = aqi;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var table = document.getElementById("aqi-table");
    table.innerHTML = null;
    var tr = document.createElement("tr");
    var td = createElement("td");
    td.innerHTML = "城市";
    tr.appendChild(td);
    td.innerHTML("空气质量");
    tr.appendChild(td);
    td.innerHTML("操作");
    tr.appendChild(td);
}