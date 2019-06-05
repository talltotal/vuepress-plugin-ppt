<template>
    <div class="ppt">
        <slot />
    </div>
</template>

<script>
const getHash = () => {
  const matched = location.hash.match(/^\#(\d+)$/);
  return matched ? matched[1] : "";
}

export default {
    name: 'Ppt',
    props: {
        showPage: {
            type: Boolean,
            default: null,
        },
        listStyle: {
            type: Object,
            default: null,
        }
    },
    computed: {
        slides () {
            return this.$slots.default.filter(item => item.tag)
        },
        styleObj () {
            const { ppt = {} } = this.$page.frontmatter
            if (this.listStyle != null) {
                return this.listStyle
            } else if (ppt.listStyle != null) {
                return ppt.listStyle
            } else {
                return {}
            }
        },
        isShowPage () {
            const { ppt = {} } = this.$page.frontmatter
            if (this.showPage != null) {
                return this.showPage
            } else if (ppt.showPage != null) {
                return ppt.showPage
            } else {
                return false
            }
        }
    },
    data () {
        return {
            currentPage: 1,
        }
    },
    mounted() {
        this.currentPage = parseInt(getHash(), 10) || 1
        window.addEventListener('keydown', this.keydown)
        window.addEventListener('hashchange', this.hashChange)
    },
    destroyed() {
        window.removeEventListener('keydown', this.keydown)
        window.removeEventListener('hashchange', this.hashChange)
    },
    methods: {
        goto(page) {
            const { currentPage, slides } = this;
            const length = slides.length;
            if (page >= length) {
                this.currentPage = length;
            } else if (page <= 1) {
                this.currentPage = 1;
            } else {
                this.currentPage = page;
            }
        },
        // shortcuts
        goNext() {
            this.goto(this.currentPage + 1);
        },
        goPrev() {
            this.goto(this.currentPage - 1);
        },
        hashChange () {
            this.goto(parseInt(getHash(), 10))
        },
        keydown ({ keyCode }) {
            switch (keyCode) {
                // left
                case 33:
                case 37:
                // up
                case 38:
                    this.goPrev();
                    break;
                // right
                case 34:
                case 39:
                // down
                case 40:
                    this.goNext();
                    break;
                default:
            }
        }
    }
}
</script>

<style>
.ppt {
    position: relative;
    font-size: 22px;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    background-color: #fff;
    text-shadow: 0 0 .25em #ccc;
}
.ppt pre {
    text-shadow: initial;
}
</style>
