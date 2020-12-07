<template>
    <transition name="ppt">
        <div v-show="num && (currentPage === index)" class="ppt-item" :style="style">
            <div class="ppt-content">
                <slot />
            </div>

            <div v-if="isShowPage" class="ppt-page">
                {{ index }} / {{ num }}
                <ul class="ppt-pager">
                    <li
                        v-for="i in num"
                        @click="goto(i)"
                        :key="i"
                        :class="index == i ? 'active' : ''"
                    >{{ i }}</li>
                </ul>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    props: {
        styles: {
            type: String,
            default: null
        }
    },
    name: 'PptItem',
    data () {
        return {
            index: -1,
        }
    },
    computed: {
        num () {
            return this.list.length
        },
        list () {
            return this.$parent.slides
        },
        style () {
            const {styleObj} = this.$parent
            return this.styles || ((styleObj[0] ? (styleObj[0] + ';') : '') + (styleObj[this.index] || '')) || {}
        },
        currentPage () {
            return this.$parent.$data.currentPage
        },
        isShowPage () {
            return this.$parent.isShowPage
        }
    },
    created () {
        this.index = this.$parent.__index ? ++this.$parent.__index : (this.$parent.__index = 1)
    },
    methods: {
        goto (pageNum) {
            this.$parent.pageTo(pageNum)
        }
    }
}
</script>

<style>
.ppt-enter,
.ppt-leave-to {
    opacity: 0;
}

.ppt-item {
    transition: all 0.3s;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    min-height: -webkit-fill-available;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
}

.ppt-content {
    margin: 0 auto;
    max-width: 740px;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 5% 5%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.ppt-page {
    position: absolute;
    left: 20px;
    bottom: 20px;
    font-size: 16px;
    opacity: 0.5;
    transition: opacity 0.3s;
    cursor: pointer;
}
.ppt-page:hover {
    opacity: 1;
}

.ppt-pager {
    position: absolute;
    bottom: 0;
    left: 0;
    list-style: none;
    pointer-events: none;
    padding: 0 8px;
    margin: 0;
    white-space: nowrap;
    background: #303133;
    color: #fff;
    cursor: auto;
    opacity: 0;
    border-radius: 4px;
}
.ppt-pager li {
    display: inline-block;
    vertical-align: top;
    cursor: pointer;
    padding: 0 2px;
}
.ppt-pager li:hover {
    text-decoration: underline;
}
.ppt-pager li + li {
    margin-left: 0.8em;
}
.ppt-pager li.active {
    opacity: 0.5;
    cursor: auto;
}

.ppt-page:hover .ppt-pager {
    pointer-events: unset;
    opacity: 1;
}

@page {
    size: legal landscape;
    margin: 0;
}
@media print {
    .ppt-item {
        break-after: always;
        page-break-after: always;
        overflow: hidden;
        position: relative;
        display: block !important;
        opacity: 1 !important;
    }
}
</style>
