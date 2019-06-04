# [@talltotal/vuepress-plugin-ppt](https://github.com/talltotal/vuepress-plugin-ppt)

## install
```bash
yarn add -D @talltotal/vuepress-plugin-ppt
# OR npm install -D @talltotal/vuepress-plugin-ppt
```

## Usage
```js
module.exports = {
    plugins: ['@vuepress/back-to-top'] 
}
```

另外，最好在组件外增个容器或自定义布局（Additionally, you can add a container or custom layout outside the component）

```md
---
navbar: false
# ppt 组件配置（ppt options）
ppt:
    # 是否显示分页下标（whether to display pagination）
    showPage: true
    # 页面自定义样式，以页码为key（custom page-style with page number as 'key'）
    listStyle:
        1: 'background-image: url(/imgs/bg.jpg)'
---

::: ppt
# page one
xxxx

----

# page two
xxxx

----

# page three
xxxx
:::
```
