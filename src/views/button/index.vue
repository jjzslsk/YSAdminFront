<template>
  <section class="app-container">
    <el-card class="box-card">
      <!-- <div class="panel-heading">
        <div class="panel-lead">
        <em>角色组</em>
        <span>
        角色组可以有多个,角色有上下级层级关系,如果子角色有角色组和管理员的权限则可以派生属于自己组别的下级角色组或管理员
        </span>
        </div>
      </div>-->
      <template>
        <div style="margin-top:1rem;">
          <a-row style="margin-bottom:1rem;">
            <a-col :span="8">
              <a-button size="small" type="primary">添加</a-button>
              <a-button size="small" type="primary">编辑</a-button>
              <a-button size="small" type="danger">删除</a-button>
            </a-col>
            <a-col :span="8"></a-col>
            <a-col :span="8">
              <el-input size="mini" class="input-with-select">
                <el-select slot="prepend" placeholder="请选择">
                  <el-option label="ID" value="1"></el-option>
                  <el-option label="接口名称" value="2"></el-option>
                  <el-option label="上级菜单" value="3"></el-option>
                  <el-option label="链接地址" value="4"></el-option>
                  <el-option label="页面标识" value="5"></el-option>
                  <el-option label="排序" value="6"></el-option>
                </el-select>
                <el-button size="mini" slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </a-col>
          </a-row>
          <template>
            <a-table :columns="columns" :dataSource="data" :scroll="{ x: 1500, y: 300 }">
              <a slot="action" slot-scope="text" href="javascript:;">action</a>
            </a-table>
          </template>
        </div>
      </template>
    </el-card>
  </section>
</template>
<script>
  const columns = [{
      title: 'ID',
      width: 100,
      dataIndex: 'name',
      key: 'name',
      fixed: 'left'
    },
    {
      title: '按钮名称',
      width: 100,
      dataIndex: 'age',
      key: 'age',
      fixed: 'left'
    },
    {
      title: '权限标识',
      dataIndex: 'address',
      key: '1',
      width: 150
    },
    {
      title: 'Column 2',
      dataIndex: 'address',
      key: '2',
      width: 150
    },
    {
      title: 'Column 3',
      dataIndex: 'address',
      key: '3',
      width: 150
    },
    {
      title: 'Column 4',
      dataIndex: 'address',
      key: '4',
      width: 150
    },
    {
      title: 'Column 5',
      dataIndex: 'address',
      key: '5',
      width: 150
    },
    {
      title: 'Column 6',
      dataIndex: 'address',
      key: '6',
      width: 150
    },
    {
      title: 'Column 7',
      dataIndex: 'address',
      key: '7',
      width: 150
    },
    {
      title: 'Column 8',
      dataIndex: 'address',
      key: '8'
    },
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: 100,
      scopedSlots: {
        customRender: 'action'
      },
    },
  ];

  const data = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      key: i,
      name: `Edrward ${i}`,
      age: 32,
      address: `London Park no. ${i}`,
    });
  }
  export default {
    data() {
      return {
        data,
        columns,
      }
    }
  }

</script>
<style scoped>
  .panel-heading {
    padding: 15px;
    padding-bottom: 0;
    background: #e8edf0;
    border-color: #e8edf0;
    position: relative;
    border-bottom: 1px solid transparent;
    border-top-right-radius: 2px;
    border-top-left-radius: 2px;
  }

  .panel-lead {
    margin-bottom: 15px;
  }

  .app-container {
    background: #f0f2f5;
  }

  .el-select .el-input {
    width: 130px;
  }

  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }

</style>
