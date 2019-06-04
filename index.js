const container = require('markdown-it-container')
const { path } = require('@vuepress/shared-utils')

module.exports = {
    name: '@talltotal/vuepress-plugin-ppt',

    multiple: true,

    enhanceAppFiles: [
        path.resolve(__dirname, 'enhanceAppFile.js')
    ],

    extendMarkdown: md => {
        md.use(container, 'ppt', {
            render: (tokens, idx, options, env, vm) => {
                const token = tokens[idx]
                if (token.nesting === 1) {
                    vm.__ppt = true
                    return `<ppt><ppt-item>\n`
                } else {
                    delete vm.__ppt
                    return `</ppt-item></ppt>\n`
                }
            }
        })
        md.renderer.rules.hr = (tokens, idx, options, env, vm) => {
            if (vm.__ppt) {
                return `</ppt-item><ppt-item>\n`
            } else {
                return '<hr />'
            }
        }
    },
}