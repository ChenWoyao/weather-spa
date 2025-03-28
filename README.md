### 项目

城市天气预报， 可以看城市最近 7 天的温度和天气

### 实现细节

1. 温度使用折线表示，横坐标是最近 7 天的日期，纵坐标是温度。绘制两条曲线，一条曲线表示最低温度，一条曲线表示最高温度。
   在日期下面可以方式天气图标

2. 上方支持输入框输入城市，获取城市的天气信息
   autocomplete 组件

### 用到的工具库

dayjs + ant-design + echarts-for-react + ahooks 引入 useDebounce 防止频繁调度 + lodash + axios

1. nextjs 接入 antd: https://ant.design/docs/react/use-with-next-cn

2. 天气接入： 心知 api **【免费用户只能返回 3 天的天气】**

### 怎么使用

1. npm install
2. npm run dev
