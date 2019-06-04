<template>
    <transition name="ppt">
        <div v-show="currentPage === index" class="ppt-item" :style="style">
            <div class="ppt-content">
                <slot />
            </div>

            <div v-if="isShowPage" class="ppt-page">
                {{ index }} / {{ list.length }}
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
    computed: {
        list () {
            return this.$parent.slides
        },
        style () {
            return this.styles || this.$parent.styleObj[this.index]
        },
        currentPage () {
            return this.$parent.$data.currentPage
        },
        index () {
            let index = 0
            this.list.forEach((item, i) => {
                if (item.child === this) {
                    index = i
                    return false
                }
            })
            return index + 1
        },
        isShowPage () {
            return this.$parent.isShowPage
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
