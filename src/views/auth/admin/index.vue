<template>
  <div>
    <panel-head :route="route" />
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
    <div class="pagination-info">
      <el-pagination v-model:current-page="paginationData.pageNum" size="small" :background="false"
        :page-size="paginationData.pageSize" layout="total, prev, pager, next" :total="tableData.total"
        @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>

    <el-dialog v-model="dialogFormVisible" :before-close="beforeClose" title="添加权限" width="500">
      <el-form ref="formRef" label-width="100px" label-position="left" :model="form" :rules>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="form.mobile" disabled />
        </el-form-item>
        <el-form-item label="昵称" prop="name">
          <el-input v-model="form.name" placeholder="请输入昵称" />
        </el-form-item>
        <el-form-item label="菜单权限" prop="permissions_id">
          <el-select v-model="form.permissions_id" placeholder="请选择菜单权限" style="width: 240px">
            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="confirm(formRef)"> 确认 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, reactive, ref, computed } from 'vue'
  import { authAdmin, menuSelectList, updateAuth } from '../../../apis'
  import dayjs from 'dayjs'
  import { useRoute } from 'vue-router'

  const route = useRoute()
  console.log('route', route)
  //绑定菜单树形数据
  onMounted(() => {
    getListData()
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
  // 请求用户列表数据
  const getListData = () => {
    authAdmin(paginationData).then(({ data }) => {
      console.log('管理员请求列表数据：', data)
      const { list, total } = data.data
      list.forEach(element => {
        element.create_time = dayjs(element.create_time).format('YYYY-MM-DD')
      });
      tableData.list = list
      tableData.total = total
    })
  }

  // 分页功能
  // // 定义分页数据
  const paginationData = reactive({
    pageNum: 1,
    pageSize: 10
  })

  // 定义分页事件
  const handleSizeChange = (val: number) => {
    paginationData.pageSize = val
    getListData()
  }
  // 改变分页事件
  const handleCurrentChange = (val: number) => {
    paginationData.pageNum = val
    getListData()
  }


  // 弹窗功能
  // 定义表单验证规则
  const rules = {
    name: [{ required: true, message: '名称不能为空', trigger: 'blur' }],
    permissions_id: [{ required: true, message: '请选择菜单权限', trigger: 'change' }]
  }
  const dialogFormVisible = ref(false)
  // 点击编辑按钮
  const form = reactive({
    id: '',
    mobile: '',
    name: '',
    permissions_id: '',
  })
  // 定义表单引用
  const formRef = ref()
  // 定义确认按钮方法
  const confirm = async (formEl: any) => {
    if (!formEl) return;
    try {
      // 直接 await validate（无需回调），校验通过进入 try，失败进入 catch
      await formEl.validate();
      // 获取表单name,permissions_id属性数据
      const { name, permissions_id } = form
      console.log('提交后的数据', name, permissions_id)
      // 校验通过后执行的逻辑，通过id,name,permissions_id更新权限
      updateAuth({ id: form.id, name, permissions_id }).then((data) => {
        console.log('用户权限：提交后的数据', data)
        if (data.data.code === 10000) {
          // 关闭弹窗
          dialogFormVisible.value = false
          // 刷新页面显示列表数据
          getListData()
        }
      })
      // 校验通过后执行的逻辑
    } catch (fields) {
      // 校验失败的逻辑
      console.log('error submit!', fields);
    }
  }
  // 弹窗关闭方法
  const beforeClose = (done?: () => void) => {
    dialogFormVisible.value = false
    // 清空表单数据
    formRef.value.resetFields()
  }
  // 点击编辑按钮
  const handleEdit = (rowData: any) => {
    // 弹框显示
    dialogFormVisible.value = true
    // 赋值给表单数据
    Object.assign(form, { mobile: rowData.mobile, name: rowData.name, permissions_id: rowData.permissions_id })
  }
</script>

<style></style>
