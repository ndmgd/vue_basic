<template>
  <div>
    <el-table :data="tableData.list" stripe style="width: 100%">
      <el-table-column label="id" prop="id" />
      <el-table-column label="昵称" prop="name" />
      <el-table-column label="所属组别" prop="permissions_id">
        <template #default="scope">
          {{ permissionsName(scope.row.permissions_id) }}
        </template>
      </el-table-column>
      <el-table-column label="手机号" prop="mobile" />
      <el-table-column label="状态" prop="active">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-tag :type="scope.row.active ? 'success' : 'danger'">{{ scope.row.active ? '正常' : '失效' }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="创建时间">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-icon>
              <Clock />
            </el-icon>
            <span style="margin-left: 10px">{{ scope.row.create_time }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="primary" @click="handleEdit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, reactive, ref, computed } from 'vue'
  import { authAdmin, menuSelectList, } from '../../../apis'
  import dayjs from 'dayjs'
  import { useRoute } from 'vue-router'

  //绑定菜单树形数据
  onMounted(() => {
    authAdmin(paginationData).then(({ data }) => {
      console.log('管理员请求列表数据：', data)
      const { list, total } = data.data
      list.forEach(element => {
        element.create_time = dayjs(element.create_time).format('YYYY-MM-DD')
      });
      tableData.list = list
      tableData.total = total
    })
    menuSelectList().then((res) => {
      console.log('弹出菜单树形对话框数据', res)
      options.value = res.data.data
    })
  })

  const options = ref([])

  const permissionsName = (permissions_id: number) => {
    const data = options.value.find(el => el.id === permissions_id)
    return data ? data.name : '超级管理员'
  }

  // 列表数据
  const tableData = reactive({
    list: [],
    total: 0
  })

  // // 定义分页数据
  const paginationData = reactive({
    pageNum: 1,
    pageSize: 5
  })


  const handleEdit = (row: any) => {

  }
</script>

<style></style>
