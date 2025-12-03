<template>
    <div class="panel-heading">
        <div class="panel-lead">
            <div class="title">菜单</div>
            <p class="description">你好</p>
        </div>
    </div>
</template>
<script setup lang="ts">
    const props = defineProps({
        info: {
            type: Object
        },
    })
</script>
<style lang="less" scoped>
    .panel-heading {
        padding: 15px;
        background: #e8edf0;
        border-color: #e8edf0;
        position: relative;

        .panel-lead {
            font-size: 14px;

            .title {
                font-weight: bold;
                font-style: normal;
            }

            .description {
                margin-top: 5px;
            }
        }
    }
</style>