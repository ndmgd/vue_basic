<template>
    <div class="score-search-container">
        <!-- 筛选条件输入框 -->
        <el-input v-model="searchForm.phone" placeholder="请输入手机号" style="width: 200px; margin-right: 10px;" />
        <el-input v-model="searchForm.cellId" placeholder="请输入小区ID" style="width: 200px; margin-right: 10px;"
            type="number" />
        <el-select v-model="searchForm.netType" placeholder="请选择网络类型" style="width: 150px; margin-right: 10px;"
            clearable>
            <el-option label="5G" value="0" />
            <el-option label="4G" value="1" />
            <el-option label="WiFi" value="2" />
            <el-option label="宽带" value="3" />
            <el-option label="其他" value="4" />
        </el-select>
        <el-button type="primary" @click="queryData">查询</el-button>

        <!-- 表格展示 -->
        <el-table :data="tableData.list" border style="margin-top: 20px; width: 100%;" v-loading="loading">
            <el-table-column label="ID" prop="id" width="80" />
            <el-table-column label="城市" prop="city" />
            <el-table-column label="手机号" prop="phonenuber" />
            <el-table-column label="评分" prop="score" />
            <el-table-column label="网络类型" prop="netType_display" />
            <el-table-column label="小区名称" prop="cellName" />
            <el-table-column label="小区ID" prop="cellId" />
            <el-table-column label="场景ID" prop="sceneId" />
            <el-table-column label="场景名称" prop="sceneName" />
            <el-table-column label="一级场景" prop="sceneType" />
            <el-table-column label="二级场景" prop="sceneSubType" />
            <el-table-column label="创建时间" prop="create_time" />
            <el-table-column label="更新时间" prop="update_time" />
        </el-table>
    </div>
</template>

<script setup lang='ts'>
    import { ElMessage } from 'element-plus'
    import { onMounted, reactive, ref } from 'vue'
    import { getUserScoreList } from '@/apis/apis'
    import dayjs from 'dayjs'
    import type { AxiosError } from 'axios'

    // 1. 类型定义（新增sceneName字段）
    interface SearchForm {
        phone: string
        cellId: number | ''
        netType: string
    }

    interface UserScoreItem {
        id: number
        city: string | null
        phonenuber: string | null
        score: number | null
        netType: string | null
        netType_display: string | null
        cellName: string | null
        cellId: number | null
        sceneId: number | null
        sceneName: string | null  // 新增sceneName字段
        sceneType: string | null
        sceneSubType: string | null
        create_time: string | null
        update_time: string | null
    }

    interface ApiResponse {
        list: UserScoreItem[]
        total: number
        code?: number
        msg?: string
    }

    // 2. 响应式数据
    const searchForm = reactive<SearchForm>({
        phone: '',
        cellId: '',
        netType: ''
    })

    const tableData = reactive({
        list: [] as UserScoreItem[],
        total: 0
    })

    const loading = ref<boolean>(false)

    // 3. 封装通用查询方法（支持筛选+分页）
    const fetchUserScore = async (params: Record<string, string | number> = {}) => {
        try {
            loading.value = true;
            console.log("【前端】最终请求参数：", params);
            // 直接调用API，无需额外合并参数
            const res = await getUserScoreList(params);
            console.log("【前端】后端返回完整数据：", res);
            // console.log("真实请求体（data）：", res.config.data);

            // 兼容后端返回结构：优先取res.data（axios标准响应结构）
            const response = res.data || res;
            const { code, msg, list, total } = response;

            if (code === 200) {
                console.log("【前端】筛选后的数据列表：", list);
                // 格式化时间（空数组forEach不会报错）
                (list || []).forEach(item => {
                    if (item?.create_time) {
                        item.create_time = dayjs(item.create_time).format('YYYY-MM-DD');
                    }
                    if (item?.update_time) {
                        item.update_time = dayjs(item.update_time).format('YYYY-MM-DD');
                    }
                });
                tableData.list = list || [];
                tableData.total = total || 0;
                ElMessage.success(`查询成功，共找到 ${total} 条数据`);
            } else if (code === 404) {
                tableData.list = [];
                tableData.total = 0;
                ElMessage.warning(msg || "未找到匹配的数据");
            } else {
                tableData.list = [];
                tableData.total = 0;
                ElMessage.error(msg || '查询失败');
            }
        } catch (error) {
            tableData.list = [];
            tableData.total = 0;
            const err = error as AxiosError;
            ElMessage.error(`接口调用失败：${err.message || '未知错误'}`);
        } finally {
            loading.value = false;
        }
    }

    // 4. 条件查询方法（核心修复：确保参数正确传递）
    const queryData = async () => {
        // 构造筛选参数（键名必须和后端接收的完全一致）
        const params: Record<string, string | number> = {
            page: 1,        // 强制携带分页参数
            page_size: 100  // 强制携带分页参数
        };

        // 手机号筛选：强制转为字符串，确保和后端数据库字段类型匹配
        const phoneStr = searchForm.phone.trim();
        if (phoneStr) {
            params.phonenuber = phoneStr; // 确保是字符串类型
        }
        // 小区ID筛选：确保传递数字类型
        if (searchForm.cellId) {
            params.cellId = searchForm.cellId;
        }
        // 网络类型筛选：键名netType必须和后端一致
        if (searchForm.netType) {
            params.netType = searchForm.netType;
        }

        console.log("构造的筛选参数（最终）：", params);
        // 调用查询方法，传递筛选参数
        await fetchUserScore(params);
    }

    // 5. 页面挂载时查询全部数据
    onMounted(() => {
        fetchUserScore() // 无参数 → 查询全部
    })
</script>

<style scoped>
    .score-search-container {
        padding: 20px;
    }
</style>