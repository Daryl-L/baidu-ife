// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}

function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = ''
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}

var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};

//用来渲染图标的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: "北京",
    nowGraTime: "week"
};

/**
 * 渲染图表
 */
function renderChart() {
    var aqiChartWrap = document.getElementById("aqi-chart-wrap");
    aqiChartWrap.innerHTML = null;
    for (let date in chartData["北京"][pageState.nowGraTime]) {
        var level;
        if (chartData[pageState.nowSelectCity][pageState.nowGraTime][date] <= 50) {
            level = "great ";
        }
        else if (chartData[pageState.nowSelectCity][pageState.nowGraTime][date] <= 100) {
            level = "good ";
        }
        else if (chartData[pageState.nowSelectCity][pageState.nowGraTime][date] <= 200) {
            level = "worth ";
        }
        else if (chartData[pageState.nowSelectCity][pageState.nowGraTime][date] <= 300) {
            level = "serious ";
        }
        else {
            level = "disaster ";
        }
        let item = document.createElement("div");
        item.className = "pillar " + level + pageState.nowGraTime;
        item.style = "height: " + chartData[pageState.nowSelectCity][pageState.nowGraTime][date] + "px";
        item.title = "日期：" + date + "\naqi：" + chartData[pageState.nowSelectCity][pageState.nowGraTime][date];
        aqiChartWrap.appendChild(item);
    }
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
    var time = document.getElementsByName("gra-time");
    for (let key in time) {
        if (time[key].checked) {
            if (pageState.nowGraTime != time[key].value) {
                pageState.nowGraTime = time[key].value;
            }
        }
    }
    renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
    // 确定是否选项发生了变化 
    var citySelect = document.getElementById("city-select");
    var cityOption = citySelect.getElementsByTagName("option");
    for (let i = 0; i < cityOption.length; i++) {
        if (cityOption[i].selected) {
            if (pageState.nowSelectCity != cityOption[i].innerHTML) {
                pageState.nowSelectCity = cityOption[i].innerHTML;
            }
        }
    }
    renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    var time = document.getElementsByName("gra-time");
    for (let i = 0; i < time.length; i++) {
        time[i].addEventListener("click", graTimeChange);
    }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    var citySelect = document.getElementById("city-select");
    for (let city in aqiSourceData) {
        let cityOption = document.createElement("option");
        cityOption.innerHTML = city;
        citySelect.appendChild(cityOption);
    }
    citySelect.addEventListener("change", citySelectChange);
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    for (var key in aqiSourceData) {
        let city = {
            "day": {},
            "week": {},
            "month": {}
        };
        city.day = aqiSourceData[key];
        var month = {};
        var day = 0;
        var aqiSum = 0;
        var start;
        var time;
        for (time in aqiSourceData[key]) {
            if (0 == day) {
                start = time;
            }
            ++day;
            aqiSum += aqiSourceData[key][time];
            if (7 == day) {
                city.week[start + "~" + time] = Math.round(aqiSum / day);
                day = 0;
                aqiSum = 0;
            }
            let datetime = new Date(time);
            let yearMonth = datetime.getFullYear() + "-" + (datetime.getMonth() + 1);
            if (null == city.month[yearMonth]) {
                month[yearMonth] = Array();
            }
            month[yearMonth].push(aqiSourceData[key][time]);
        }
        if (0 != day) {
            city.week[start + "~" + time] = Math.round(aqiSum / day);
        }
        for (let key in month) {
            var monthSum = 0;
            var i;
            for (i = 0; i < month[key].length; i++) {
                monthSum += month[key][i];
            }
            city.month[key] = monthSum / i;
        }
        chartData[key] = city;
    }
}

(function () {
    initGraTimeForm()
    initCitySelector();
    initAqiChartData();
})();