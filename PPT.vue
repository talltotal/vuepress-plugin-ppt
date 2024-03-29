<template>
    <div
        class="ppt"
        @touchstart.stop="onTouchStart"
        @scroll.capture="onScroll"
        @touchend.stop="onTouchEnd"
        :style="baseStyle"
    >
        <slot />
        <h1 v-if="title" class="ppt-title">{{ title }}</h1>
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
        title () {
            const { ppt = {} } = this.$page.frontmatter
            return ppt.title
        },
        baseStyle () {
            const { ppt = {} } = this.$page.frontmatter
            return ppt.baseStyle
        },
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
        // side swipe
        onTouchStart (e) {
            this.touchStart = {
                x: e.changedTouches[0].clientX,
                y: e.changedTouches[0].clientY,
            }
        },
        onScroll () {
            this.touchStart = null
        },
        onTouchEnd (e) {
            if (!this.touchStart) return
            const dx = e.changedTouches[0].clientX - this.touchStart.x
            const dy = e.changedTouches[0].clientY - this.touchStart.y
            if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
                if (dx > 0) {
                    this.goPrev()
                } else {
                    this.goNext()
                }
            }
        },
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
        pageTo(page) {
            const { currentPage, slides } = this;
            const length = slides.length;
            let p
            if (page >= length) {
                p = length;
            } else if (page <= 1) {
                p = 1;
            } else {
                p = page;
            }
            location.hash = `#${p}`
        },
        // shortcuts
        goNext() {
            this.pageTo(this.currentPage + 1);
        },
        goPrev() {
            this.pageTo(this.currentPage - 1);
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
}
.ppt pre {
    text-shadow: initial;
}
.ppt .extra-class {
    max-width: 100%;
    -webkit-overflow-scrolling: touch;
}
.ppt-title {
    position: absolute;
    top: 0;
    left: 20px;
}
</style>
