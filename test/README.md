---
navbar: false
ppt:
    showPage: true
---

<div style="margin-top: 0;height: calc(100vh - 8rem);">

::: ppt

# [@talltotal/vuepress-plugin-ppt](https://github.com/talltotal/vuepress-plugin-ppt)

----

## install
```bash
yarn add -D @talltotal/vuepress-plugin-ppt
# OR npm install -D @talltotal/vuepress-plugin-ppt
```

----

## Usage
### 在 `config.js` 中引入
```js
module.exports = {
    plugins: ['@talltotal/vuepress-plugin-ppt'] 
}
```

----

## Usage
### 在 md 文档中使用
1. 在 `frontmatter` 增加 ppt 组件的配置，以及一些隐藏其他页面元素的设置
    - `showPage` Boolean 是否显示分页下标
    - `listStyle` Object 页面自定义样式，以页码为key

----

## Usage
### 在 md 文档中使用
2. 正文部分用 `::: ppt` + `:::` 包裹，中间以 `----` 为分页标识

----

## Usage
### 在 md 文档中使用
> 另外，最好在组件外加个容器或自定义布局
> 
> Additionally, you can add a container or custom layout outside the component

----

## Usage
### 操作
- 键盘
    - ⬆️⬅️：上一张
    - ⬇️➡️：下一张
- 手势
    - 向左划：上一张
    - 向右划：下一张

:::

</div>

