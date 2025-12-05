<template>
  <div>
    <panel-head :route="route" />
    <div class="btns">
      <el-button @click="open(null)" type="primary" size="small" :icon="Plus">新增</el-button>
    </div>
    <el-table :data="tableData.list" stripe style="width: 100%">
      <el-table-column label="id" prop="id" />
      <el-table-column label="昵称" prop="name" />
      <el-table-column label="菜单权限" prop="permissionName" width="500px" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="primary" @click="open(scope.row)">编辑</el-button>
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
        <el-form-item v-show="false" prop="id">
          <el-input v-model="form.id" placeholder="请输入昵称" />
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" placeholder="请填写权限名称" />
        </el-form-item>
        <el-form-item label="权限" prop="authInfo">
          <el-tree ref="treeRef" style="max-width: 600px" :data="permissionData" show-checkbox node-key="id"
            :default-expanded-keys="[2]" :default-checked-keys="defaultKeys" />
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
  import { ref, reactive, onMounted, nextTick } from 'vue'
  import { userGetMenu, userSetmenu, menuList } from '../../../apis'
  import { Plus, Delete } from "@element-plus/icons-vue";
  import { useRoute } from 'vue-router'

  const route = useRoute()
  //绑定菜单树形数据
  onMounted(() => {
    userGetMenu().then((res) => {
      console.log('弹出菜单树形对话框数据', res)
      permissionData.value = res.data.data
    })
    getListData()
  })

  // 定义对话框显示状态
  const dialogFormVisible = ref(false)

  // 定义菜单树形数据
  const permissionData = ref([])
  // 定义表单数据
  const form = reactive({
    id: '',
    name: '',
    permissions: []
  })
  // 定义表单验证规则
  const rules = {
    name: [{ required: true, message: '请填写权限名称', trigger: 'blur' }]
  }

  // 默认选中权限的索引节点
  const defaultKeys = [4, 5]
  // 定义树形数据，用于选中树形节点
  const treeRef = ref();
  // 定义表单引用
  const formRef = ref()
  // 定义关闭对话框方法
  const beforeClose = (done?: () => void) => {
    dialogFormVisible.value = false
    // 清空表单数据
    formRef.value.resetFields()
    // 重置树形数据
    treeRef.value.setCheckedKeys(defaultKeys)
  }

  // 列表数据
  const tableData = reactive({
    list: [],
    total: 0
  })

  // 请求列表数据
  const getListData = () => {
    menuList(paginationData).then(({ data }) => {
      console.log('请求列表数据：', data)
      const { list, total } = data.data
      tableData.list = list
      tableData.total = total
    })
  }

  // 定义分页数据
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
  // 打开编辑对话框
  const open = (rowData = {}) => {
    dialogFormVisible.value = true;
    nextTick(() => {
      // 弹窗打开form生产是异步的
      if (rowData) {
        // 不能直接整体赋值给reactive对象，否则会失去响应式，选择object.assign可以
        Object.assign(form, { id: rowData.id, name: rowData.name })
        treeRef.value.setCheckedKeys(rowData.permissions)
      }
    })
  }

  // 定义确认按钮方法
  const confirm = async (formEl: any) => {
    if (!formEl) return;
    try {
      // 直接 await validate（无需回调），校验通过进入 try，失败进入 catch
      await formEl.validate();

      // 校验通过后执行的逻辑
      const permissions = JSON.stringify(treeRef.value.getCheckedKeys());
      const data = await userSetmenu({ id: form.id, name: form.name, permissions });
      console.log('提交后的数据', data);
      beforeClose();
      getListData();
    } catch (fields) {
      // 校验失败的逻辑
      console.log('error submit!', fields);
    }
  };
</script>



<style scoped>
  .btns {
    padding: 10px 0 10px 10px;
    background-color: #fff;
  }
</style>
