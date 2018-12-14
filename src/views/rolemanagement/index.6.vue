<template>
  <section class="app-container sectionBox">
        <div class="panel-heading">
        <div class="panel-lead">
        <em>角色组</em>
        <span>
        角色组可以有多个,角色有上下级层级关系,如果子角色有角色组和管理员的权限则可以派生属于自己组别的下级角色组或管理员
        </span>
        </div>
        </div>

        <!--工具条-->
        <div class="toolBox">
    <el-col :span="24" class="toolbar" style="height:100%; padding-bottom: 0px;">
      <el-form :inline="true" :model="filters" label-position label-width="120px" @submit.native.prevent>
        <div style="float: left;">
          <el-form-item>
          <el-button size="mini" icon="el-icon-refresh" v-if="buttons.selectshow==true" type="info" v-on:click="getKeyList"></el-button>
        </el-form-item>
        <!-- <el-form-item>
          <el-button size="mini" icon="el-icon-search" v-if="buttons.selectshow==true" type="primary" v-on:click="getKeyList">{{button.query}}</el-button>
        </el-form-item> -->
        <el-form-item>
          <el-button size="mini" icon="el-icon-zoom-in" v-if="buttons.selectshow==true" type="primary" v-on:click="elCard">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" icon="el-icon-edit" v-if="buttons.addshow==true" type="primary" @click="handleAdd">{{button.add}}</el-button>
        </el-form-item>
        <!-- <el-form-item>
      <el-button size="mini" icon="el-icon-menu" type="primary" @click="getKeyLists" v-if="buttons.selectshow==true">{{button.whole}}</el-button>
        </el-form-item> -->
        <el-form-item>
      <el-button type="danger" icon="el-icon-delete" size="mini" @click="batchRemove" :disabled="this.sels.length===0">{{button.batchRemove}}</el-button>
        </el-form-item>
        </div>
      </el-form>
    </el-col>
        </div>

            <!-- 查询筛选 -->
         <el-card class="box-card box-cardBox" v-if="elCardBox">
          <el-row>
            <!-- <el-button size="mini" round v-for="item in tableLabel" :key="item.Label" @click="conditionClick(item.Label)">{{item.Label}}</el-button> -->
            <el-col :span="24" class="toolbar" style="height:100%; padding-bottom: 0px;">
              <el-form :inline="true" :model="filters" label-position label-width="120px" @submit.native.prevent>
                <el-form-item :label="formLabel.value1">
                  <el-input style="width: 180px;" size="small" :autofocus='inputAutofocus' v-if="buttons.selectshow==true" v-model="filters.jiekoumingcheng" :placeholder="formPlaceholder.value1"></el-input>
                </el-form-item>
                <el-form-item :label="formLabel.value2">
                  <el-input style="width: 180px;" size="small" :autofocus='inputAutofocus' v-if="buttons.selectshow==true" v-model="filters.bllCode" :placeholder="formPlaceholder.value2"></el-input>
                </el-form-item>
                <!-- <el-form-item size="small" :label="formLabel.value3">
                  <el-select style="width: 180px;" v-model="filters.caidanguanlian" :placeholder="formPlaceholder.value3">
                    <el-option v-for="item in options" :key="item.id" :label="item.mingcheng" :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item> -->
                <el-form-item size="small" :label="formLabel.value4">
                  <el-select style="width: 180px;" v-model="filters.shifouyanzheng" :placeholder="formPlaceholder.value4">
                    <el-option label="是" :value='true'>是</el-option>
                    <el-option label="否" :value='false'>否</el-option>
                  </el-select>
                </el-form-item>
                <el-form-item size="small" :label="formLabel.value5">
                  <el-select style="width: 180px;" v-model="filters.shifouguanlihoutai" :placeholder="formPlaceholder.value5">
                    <el-option label="是" :value='true'>是</el-option>
                    <el-option label="否" :value='false'>否</el-option>
                  </el-select>
                </el-form-item>
                <el-form-item size="small" :label="formLabel.value6">
                  <el-select style="width: 180px;" v-model="filters.shifouqiyong" :placeholder="formPlaceholder.value6">
                    <el-option label="是" :value='true'>是</el-option>
                    <el-option label="否" :value='false'>否</el-option>
                  </el-select>
                </el-form-item>
                <el-form-item size="small" :label="formLabel.value7">
                  <el-select style="width: 180px;" v-model="filters.shifouxuyaodenglu" :placeholder="formPlaceholder.value7">
                    <el-option label="是" :value='true'>是</el-option>
                    <el-option label="否" :value='false'>否</el-option>
                  </el-select>
                </el-form-item>
                <div style="float: right;">
                  <el-form-item>
                    <el-button size="mini" v-if="buttons.selectshow==true" type="primary" v-on:click="getKeyList">确定</el-button>
                  </el-form-item>
                  <el-form-item>
                    <el-button size="mini" v-if="buttons.selectshow==true" type="" v-on:click="getDataList">{{button.Reset}}</el-button>
                  </el-form-item>
                  </div>
              </el-form>
            </el-col>
          </el-row>
         </el-card>

    <!--列表-->
    <el-table @row-dblclick='Rowdblclick' stripe border :data="dataList" highlight-current-row @selection-change="selsChange" style="width: 100%;">
      <el-table-column type="selection">
      </el-table-column>
      <el-table-column type="index" label="#" width="60">
      </el-table-column>
      <el-table-column prop="id" label="ID" width="60">
      </el-table-column>
      <el-table-column prop="juesemingcheng" label="角色名称" width="120">
      </el-table-column>
      <el-table-column prop="paixu" label="排序" width="120">
      </el-table-column>
      <!-- <el-table-column prop="moren" label="默认" width="120">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.moren" @change="setMorenRole(scope.row)">
          </el-switch>
        </template>
      </el-table-column> -->
      <el-table-column prop="beizhu" label="备注" min-width="160">
      </el-table-column>
      <el-table-column v-if="buttons.updateshow==true||buttons.delshow==true||buttons.interfaceshow==true||buttons.menushow==true" label="操作" fixed="right" width="180">
        <template slot-scope="scope">
          <el-button size="mini" style="padding: 7px 9px;margin-left: 0px;" icon="el-icon-edit" v-if="buttons.updateshow==true" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <!-- <el-button size="mini" v-if="buttons.menushow==true" @click="handlePermissionMenu(scope.$index, scope.row)">菜单权限</el-button> -->
          <!-- <el-button size="mini" v-if="buttons.interfaceshow==true" @click="handlePermissionInterface(scope.$index, scope.row)">接口权限</el-button> -->
          <el-button size="mini" style="padding: 7px 9px;margin-left: 0px;" icon="el-icon-delete" v-if="buttons.delshow==true" type="danger" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total"
        style="float:right;">
      </el-pagination>
    </el-col>

        <!--添加界面-->
    <el-dialog title="添加" :visible.sync="dialogFormVisibleAdd" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
        <el-form-item label="角色名称" prop="RoleName">
          <el-input v-model="editForm.juesemingcheng" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="editForm.paixu"></el-input-number>
        </el-form-item>
        <!-- <el-form-item label="默认">
          <el-radio-group v-model="editForm.moren">
            <el-radio class="radio" :label=true>是</el-radio>
            <el-radio class="radio" :label=false>否</el-radio>
          </el-radio-group>
        </el-form-item> -->
        <!-- <el-form-item label="权限">
          <el-select v-model="value11" multiple collapse-tags style="margin-left: 20px;" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="备注">
          <el-input type="textarea" v-model="editForm.beizhu"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click.native="dialogFormVisibleAdd=false">取消</el-button>
        <el-button size="mini" type="primary" @click="createData">添加</el-button>
      </div>
    </el-dialog>

    <!--编辑界面-->
    <el-dialog class="roleCard transferWrap" title="编辑" :visible.sync="dialogFormVisibleEdit" :close-on-click-modal="false">
      <!-- <el-card class="box-card">
      <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
        <el-form-item label="角色名称" prop="RoleName">
          <el-input v-model="editForm.juesemingcheng" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="editForm.paixu"></el-input-number>
        </el-form-item> -->
        <!-- <el-form-item label="默认">
          <el-radio-group v-model="editForm.moren">
            <el-radio class="radio" :label=true>是</el-radio>
            <el-radio class="radio" :label=false>否</el-radio>
          </el-radio-group>
        </el-form-item> -->
        <!-- <el-form-item label="权限">
          <el-select v-model="value11" multiple collapse-tags style="margin-left: 20px;" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item> -->
        <!-- <el-form-item label="备注">
          <el-input type="textarea" v-model="editForm.beizhu"></el-input>
        </el-form-item>
      </el-form>
      </el-card> -->

      <!-- 页面切换 -->
      <el-tabs style="margin: 0 30px">
        <!-- s -->
        <el-tab-pane label="角色信息">
                <el-card class="box-card">
      <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
        <el-form-item label="角色名称" prop="RoleName">
          <el-input v-model="editForm.juesemingcheng" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="editForm.paixu"></el-input-number>
        </el-form-item>
        <!-- <el-form-item label="默认">
          <el-radio-group v-model="editForm.moren">
            <el-radio class="radio" :label=true>是</el-radio>
            <el-radio class="radio" :label=false>否</el-radio>
          </el-radio-group>
        </el-form-item> -->
        <!-- <el-form-item label="权限">
          <el-select v-model="value11" multiple collapse-tags style="margin-left: 20px;" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="备注">
          <el-input type="textarea" v-model="editForm.beizhu"></el-input>
        </el-form-item>

      </el-form>
      </el-card>
      <!-- <div slot="footer" class="dialog-footer"> -->
        <el-button size="mini" @click.native="dialogFormVisibleEdit=false">取消</el-button>
        <el-button size="mini" type="primary" @click="updateData">修改</el-button>
      <!-- </div> -->
        </el-tab-pane>

        <el-tab-pane label="分配按钮">

            <!-- `checked` 为 true 或 false -->
            <!-- <el-checkbox v-model="defaultExpandAll">选中全部</el-checkbox> -->
            <!-- <el-checkbox :change='checkboxChange(defaultExpandAllX)' v-model="defaultExpandAllX">展开全部</el-checkbox> -->
            <!-- <el-checkbox :change='handleDeliveryRegionCheckAll(defaultExpandAllS)' v-model="defaultExpandAllS">选中全部</el-checkbox> -->
              <!-- <el-button size="small" type="danger" @click="cancelVent">清除选择</el-button> -->
              <!-- <el-button size="small" type="primary" @click="handleDeliveryRegionCheckAll" class="ml20">全选</el-button> -->


       <el-row class="tac tree-row">
        <el-col :span="24">
       <!-- <div style="text-align: center" class="transferBox">
          <el-transfer
          
            style="text-align: left; display: inline-block"
            v-model="value3"
            filterable
            filter-placeholder="请输入搜索内容"
            :left-default-checked="[2, 3]"
            :right-default-checked="[1]"
            :render-content="renderFunc"
            :titles="['所有菜单', '已有菜单']"
            
            :format="{
              noChecked: '${total}',
              hasChecked: '${checked}/${total}'
            }"
            @change="handleChange"
            :data="data">
            <el-button class="transfer-footer" slot="left-footer" size="small">操作</el-button>
            <el-button class="transfer-footer" slot="right-footer" size="small">操作</el-button>
          </el-transfer>
      </div> -->

      <!--工具条-->
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" :model="filters" @submit.native.prevent>
          <el-form-item>
            <el-input size="mini" v-model="editForm.juesemingcheng" placeholder="角色名称"><template slot="prepend">
                当前选中角色为：</template></el-input>
          </el-form-item>
        </el-form>
      </el-col>
            <el-row class="tac tree-row">
        <el-col :span="24">
          <!-- <el-tree
            :data="data2"
            show-checkbox
            node-key="id"
            :default-checked-keys="[10]"
            :props="defaultProps">
          </el-tree> -->
          <el-table :data="this.interface" ref="table" highlight-current-row @selection-change="selsChangeInterface"
            :max-height="400" style="width: 100%;">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column type="index" width="60">
            </el-table-column>
            <el-table-column prop="id" label="ID" width="40">
            </el-table-column>
            <el-table-column prop="jiekoumingcheng" label="接口名称" width="150">
            </el-table-column>
            <el-table-column prop="bllcode" label="接口标识" width="150">
            </el-table-column>
            <el-table-column prop="beizhu" label="备注" min-width="160">
            </el-table-column>
            <el-table-column prop="chuangjianriqi" label="创建时间" width="100">
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <!-- <div slot="footer" class="dialog-footer"> -->
        <el-button size="mini" @click.native="dialogFormPermissionVisibleInterface=false">取消</el-button>
        <el-button size="mini" type="primary" @click="SetInterfaceRole">保存</el-button>
      <!-- </div> -->
      
         <!-- <el-tree
          ref="treex"
            :data="data2"
            show-checkbox
            node-key="id"
            @check="handle"
            :check-on-click-node="true"
            :highlight-current="true"
            :default-checked-keys="DefaultCheckedKey"
            :props="defaultProps">
         </el-tree> -->
          <!-- <el-table :data="this.interface" ref="table" highlight-current-row @selection-change="selsChangeInterface"
            :max-height="400" style="width: 100%;">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column type="index" width="60">
            </el-table-column>
            <el-table-column prop="id" label="ID" width="40">
            </el-table-column>
            <el-table-column prop="jiekoumingcheng" label="接口名称" width="150">
            </el-table-column>
            <el-table-column prop="bllcode" label="接口标识" width="150">
            </el-table-column>
            <el-table-column prop="beizhu" label="备注" min-width="160">
            </el-table-column>
            <el-table-column prop="chuangjianriqi" label="创建时间" width="100">
            </el-table-column>
          </el-table> -->
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click.native="dialogFormPermissionVisibleInterface=false">取消</el-button>
        <el-button size="mini" type="primary" @click="SetInterfaceRole">保存</el-button>
      </div>
        </el-tab-pane>
<!-- s -->
        <el-tab-pane label="菜单管理">

            <!-- <el-checkbox v-model="defaultExpandAllX">展开全部</el-checkbox> -->
            <el-checkbox :change='checkboxChange(defaultExpandAllX)' v-model="defaultExpandAllX">展开全部</el-checkbox>

            <!-- {{this.$refs.treex.store.defaultExpandAll}} -->

      <el-row class="tac tree-row">
        <el-col :span="24">
          <el-tree :data="menus" ref="treex" show-checkbox node-key="value" :default-expanded-keys="[2, 3]"
            :default-checked-keys="this.editForm.caidanguanlian" :props="defaultProps">
          </el-tree>
        </el-col>
      </el-row>
      <!-- <div slot="footer" class="dialog-footer"> -->
        <el-button size="mini" @click.native="dialogFormPermissionVisibleMenu=false">取消</el-button>
        <el-button size="mini" type="primary" @click="SetMenuRole">保存</el-button>
      <!-- </div> -->
        </el-tab-pane>
      </el-tabs>
      <!-- <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click.native="dialogFormVisibleEdit=false">取消</el-button>
        <el-button size="mini" type="primary" @click="updateData">修改</el-button>
      </div> -->
    </el-dialog>

        <!-- 接口界面 -->
    <el-dialog style="Height:400px" title="接口权限" :visible.sync="dialogFormPermissionVisibleInterface"
      :close-on-click-modal="false" @open="callbackUp(dialogStatus)">
      <!--工具条-->
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" :model="filters" @submit.native.prevent>
          <el-form-item>
            <el-input size="mini" v-model="editForm.juesemingcheng" placeholder="角色名称"><template slot="prepend">
                当前选中角色为：</template></el-input>
          </el-form-item>
        </el-form>
      </el-col>
      <el-row class="tac tree-row">
        <el-col :span="24">
          <!-- <el-tree
            :data="data2"
            show-checkbox
            node-key="id"
            :default-checked-keys="[10]"
            :props="defaultProps">
          </el-tree> -->
          <el-table :data="this.interface" ref="table" highlight-current-row @selection-change="selsChangeInterface"
            :max-height="400" style="width: 100%;">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column type="index" width="60">
            </el-table-column>
            <el-table-column prop="id" label="ID" width="40">
            </el-table-column>
            <el-table-column prop="jiekoumingcheng" label="接口名称" width="150">
            </el-table-column>
            <el-table-column prop="bllcode" label="接口标识" width="150">
            </el-table-column>
            <el-table-column prop="beizhu" label="备注" min-width="160">
            </el-table-column>
            <el-table-column prop="chuangjianriqi" label="创建时间" width="100">
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click.native="dialogFormPermissionVisibleInterface=false">取消</el-button>
        <el-button size="mini" type="primary" @click="SetInterfaceRole">保存</el-button>
      </div>
    </el-dialog>



    <!-- 分配菜单权限 -->
    <el-dialog style="Height:400px" title="菜单分配" :visible.sync="dialogFormPermissionVisibleMenu"
      :close-on-click-modal="false" @open="callbackUp(dialogStatus)">
      <!--工具条-->
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" :model="filters" @submit.native.prevent>
          <el-form-item>
            <el-input size="mini" v-model="editForm.juesemingcheng" placeholder="角色名称"><template slot="prepend">
                当前选中角色为：</template></el-input>
          </el-form-item>
        </el-form>
      </el-col>
      <el-row class="tac tree-row">
        <el-col :span="24">
          <el-tree :data="menus" ref="tree" show-checkbox node-key="value" :default-expanded-keys="[2, 3]"
            :default-checked-keys="this.editForm.caidanguanlian" :props="defaultProps">
          </el-tree>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click.native="dialogFormPermissionVisibleMenu=false">取消</el-button>
        <el-button size="mini" type="primary" @click="SetMenuRole">保存</el-button>
      </div>
    </el-dialog>

  </section>
</template>

<script>
import store from "@/store/index.js"; //引入本地存储
import util from "@/utils/table.js";
import { paraHelper } from "@/utils/para.js"; //请求参数格式
import { handlePost, handleGet } from "@/api/apihelper.js";

export default {
  data() {
    // 穿梭框
        const generateData = _ => {
        const data = [];
        
        for (let i = 1; i <= 10; i++) {
          data.push({
            key: i,
            label: `备选项 ${ i }`,
            disabled: i % 4 === 0
          });
        }
        return data;
      };
    return {
      bllCode: {
        //接口标识，由后端提供
        add: "AddRole", //添加
        edit: "UpdateRole", //修改
        del: "DelRole", //删除
        getList: "GetListRole", //获取列表
        getObj: "GetRole", //获取对象（单个）
        getInterfaceList: "GetListInterface", //获取接口列表
        setInterfaceRole: "SetInterfaceRole", //提交接口分配
        setMorenRole: "SetMorenRole", //设置默认角色
        getTreeMenu: "GetTreeMenu", //获取树形菜单
        setMenuRole: "SetMenuRole" //提交菜单分配
      },
      //穿梭框
        data: generateData(),
        value3: [1],
        value4: [1],
        renderFunc(h, option) {
          return <span>{ option.key } - { option.label }</span>;
        },

      //接口TREE数
       data2: [
 

      ],

      checked: true,//是否全选
      defaultExpandAllX: null,
      defaultExpandAllS:null,
      treeStore:null,
      DefaultCheckedKey: [1,3,4,5,6,7,8,14,10], //选中的数组

        defaultProps: {
          children: 'children',
          label: 'label'
        },

      inputAutofocus: false,      
      elCardBox: false,
      filtersName: "角色名称",
      //搜索标题
      formLabel: {
        value1: "接口名称",
        value2: "接口标识",
        value3: "菜单关联",
        value4: "是否验证",
        value5: "是否启用",
        value6: "是否管理后台",
        value7: "是否需要登录"
      },
      //搜索框提示文字
      formPlaceholder: {
        value1: "名称",
        value2: "标识",
        value3: "关联",
        value4: "是否验证",
        value5: "是否启用",
        value6: "是否管理后台",
        value7: "是否需要登录"
      },
      button: {
        edit: "编辑",
        del: "删除",
        query: "查询",
        add: "添加",
        whole: "显示所有",
        batchRemove: "批量删除",
        condition: "筛选",
        Reset: "重置",
      },
      buttons: {
        //按钮的权限控制
        selectshow: false,
        addshow: false,
        updateshow: false,
        delshow: false,
        menushow: false,
        interfaceshow: false
      },
      paraSwitch: paraHelper, //开关按钮使用
      paraInterface: paraHelper, //获取interface
      paraMenu: paraHelper, //获取menus
      para: paraHelper, //获取主list
      addPara: paraHelper, //添加参数
      editPara: paraHelper, //编辑参数
      delPara: paraHelper, //删除参数

      dialogStatus: "",
      textMap: {
        update: "编辑角色",
        create: "添加角色",
        updatePermissionMenu: "菜单分配",
        updatePermissionInterface: "接口分配"
      },
      dialogFormVisibleAdd: false, //添加角色显示
      dialogFormVisibleEdit: false, //编辑角色显示
      dialogFormPermissionVisibleMenu: false, //分配菜单权限显示
      dialogFormPermissionVisibleInterface: false, //分配接口权限显示
      filters: {
        juesemingcheng: ""
      },
      dataList: [],
      menus: [], //菜单列表
      interface: [], //接口列表
      total: 0,
      page: 1,
      sels: [], // 列表选中列
      selsInterface: [], //选中接口列表
      editFormRules: {
        juesemingcheng: [
          {
            required: true,
            message: "请输入名称",
            trigger: "blur"
          }
        ]
      },
      // 编辑界面数据
      editForm: {
        id: "",
        juesemingcheng: "",
        caidanguanlian: [],
        jiekouguanlian: [],
        paixu: 1,
        moren: true,
        beizhu: ""
      },
      //查询条件
      selectData: {
        juesemingcheng: null,
        Page: 1,
        Size: 10
      },
      list: [],
      addFormVisible: false, // 添加界面是否显示
      addFormRules: {
        RoleName: [
          {
            required: true,
            message: "请输入名称",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    //穿梭框
    handleChange(value, direction, movedKeys) {
        console.log(value, direction, movedKeys);
      },
        //选定筛选条件
    conditionClick(val) {
      console.log(val);
      this.elCard();
    },
    //条件显示隐藏
    elCard() {
      if (this.elCardBox == false) {
        this.elCardBox = true;
      } else {
        this.elCardBox = false;
      }
    },
    //取消全选
    cancelVent(){
      // var ary = this.DefaultCheckedKey
      // console.log (ary)
      // this.DefaultCheckedKey = [1,3]
      // ary.splice(0,ary.length);
      // console.log (this.DefaultCheckedKey)
      this.$refs.treex.setCheckedKeys([])
    },
    // //设置默认角色
    // setMorenRole(rowdata) {
    //   // console.log('setIsCheckInterface--rowdata===',rowdata)
    //   this.paraSwitch.Code = this.bllCode.setMorenRole
    //   let data = {
    //     id: rowdata.id,
    //     moren: rowdata.moren
    //   }
    //   this.paraSwitch.Data = JSON.stringify(data)
    //   handlePost(this.paraSwitch).then(res => {
    //     if (res.IsSuccess == true) {
    //       this.getDataList()
    //     }
    //   })
    // },

    //加载按钮
    loadButton(data) {
      if (data && data.length > 0) {
        this.interfaces = data.map(item => item.bllcode);
        this.buttons.addshow =
          this.interfaces.indexOf(this.bllCode.add) > 0 ? true : false;
        this.buttons.selectshow =
          this.interfaces.indexOf(this.bllCode.getList) > 0 ? true : false;
        this.buttons.updateshow =
          this.interfaces.indexOf(this.bllCode.edit) > 0 ? true : false;
        this.buttons.delshow =
          this.interfaces.indexOf(this.bllCode.del) > 0 ? true : false;
        this.buttons.menushow =
          this.interfaces.indexOf(this.bllCode.getTreeMenu) > 0 ? true : false;
        this.buttons.interfaceshow =
          this.interfaces.indexOf(this.bllCode.getInterfaceList) > 0
            ? true
            : false;
        //console.log('this.interfaces.show', this.interfaces)
        //console.log('this.bllCode.add',this.bllCode.add)
      }
    },

    //查询
    getKeyList() {
      this.selectData.Page = 1;
      this.getDataList();
    },
    handleNodeClick(data) {
      console.log(data);
    },
    handleCurrentChange(val) {
      this.selectData.Page = val;
      this.getDataList();
    },
    // 获取接口列表
    getInterfaceList() {
      this.paraInterface.Code = this.bllCode.getInterfaceList;
      this.paraInterface.Data = "";
      handlePost(this.paraInterface).then(res => {
        if (res.IsSuccess == true) {
          this.interface = res.Data.List;
          this.dialogStatus = "updatePermissionInterface";
          this.dialogFormPermissionVisibleInterface = true;
        }
      });
    },
    //加载选中
    callbackUp(val) {
      if (val == "updatePermissionInterface") {
        let selected = this.editForm.jiekouguanlian;
        this.$nextTick(function() {
          selected.forEach(i => {
            this.$refs.table.toggleRowSelection(
              this.interface.find(d => d.id == i),
              true
            ); // 设置默认选中
          });
        });
      }
    },
    //获取菜单列表
    getMenuList() {
      this.paraMenu.Code = this.bllCode.getTreeMenu;
      this.paraMenu.Data = "";
      handlePost(this.paraMenu)
        .then(res => {
          if (res.IsSuccess == true) {
            this.menus = res.Data;
            this.dialogStatus = "updatePermissionMenu";
            this.dialogFormPermissionVisibleMenu = true;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取角色列表
    getDataList() {
      this.dataList = [];
      this.para.Data = JSON.stringify(this.selectData);
      this.para.Code = this.bllCode.getList;
      handlePost(this.para)
        .then(res => {
          if (res.IsSuccess == true) {
            this.dataList = res.Data.List;
            this.total = res.Data.Count;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 删除
    handleDel(index, row) {
      this.$confirm("确认删除该记录吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          const paraId = {
            id: row.id
          };
          this.delPara.Code = this.bllCode.del;
          this.delPara.Data = JSON.stringify(paraId);
          handlePost(this.delPara)
            .then(res => {
              if (res.IsSuccess == true) {
                this.getDataList();
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          console.log(err);
        });
    },
        //行点击事件
    Rowdblclick(index, row) {
      this.handleEdit(index, row);
    },
    //查看属性
    handle(data, checkState){
      console.log ('查看属性：',data, checkState)
    },
    //全选切换
    // handleDeliveryRegionCheckAll (i) {
      //   console.log (i)
      //   // this.$refs.treex.setCheckedNodes(this.deliveryRegion)
      //   // console.log(this.$refs.deliveryRegionTree.getCheckedNodes())
      //  if(i == true){
      //    $refs.deliveryRegionTree.setCheckedNodes([])
      //  }
      // },
      handleDeliveryRegionCheckAll () {
        this.$refs.treex.setCheckedNodes(this.data2)
        // console.log(this.$refs.treex.getCheckedNodes())
      },
    //展开切换
    checkboxChange(i){
      if(i == true){
        for(var i=0;i<this.$refs.treex.store._getAllNodes().length;i++){
           this.$refs.treex.store._getAllNodes()[i].expanded= true;
        }
      }
      if (i == false){
        for(var i=0;i<this.$refs.treex.store._getAllNodes().length;i++){
           this.$refs.treex.store._getAllNodes()[i].expanded= false;
        }
      }
      // alert (1232)
      console.log (123212,i)
    },
    // 显示编辑界面
    handleEdit(index, row) {
      this.dialogStatus = "update";
      this.dialogFormVisibleEdit = true;
      this.editForm = Object.assign({}, row);

      //获取接口所有数据
      this.paraInterface.Code = this.bllCode.getInterfaceList;
      this.paraInterface.Data = "";
      handlePost(this.paraInterface).then(res => {
        if (res.IsSuccess == true) {
          this.interface = res.Data.List;

                // 获取菜单管理信息
                this.paraMenu.Code = this.bllCode.getTreeMenu;
                this.paraMenu.Data = "";
                handlePost(this.paraMenu)
                  .then(res => {
                    if (res.IsSuccess == true) {
                      this.menus = res.Data;
                    }
                  })
                  .catch(err => {
                    console.log(err);
                  });


        }
      console.log ("this.interface:",this.interface)

      });

    //  console.log ('this.$refs.treex',this.$refs.treex.store.defaultExpandAll)
    //  console.log ('this.$refs.store',this.$refs.treex.store)
    //  for(var i=0;i<this.$refs.treex.store._getAllNodes().length;i++){
    //        this.$refs.treex.store._getAllNodes()[i].expanded= this.defaultExpandAll;
    //     }
     
    //  this.treeStore = this.$refs.treex.store.defaultExpandAll
    //  this.$refs.treex.store.defaultExpandAll = this.defaultExpandAll
    //  this.$refs.treex.store.defaultExpandAll = this.defaultExpandAll



    },
    // 显示菜单权限
    handlePermissionMenu(index, row) {
      this.editForm = Object.assign({}, row);
      this.getMenuList();
    },
    // 显示接口权限
    handlePermissionInterface(index, row) {
      this.editForm = Object.assign({}, row);
      this.getInterfaceList();
    },
    // 显示添加
    handleAdd() {
      this.dialogStatus = "create";
      this.dialogFormVisibleAdd = true;
      this.editForm = {
        id: "",
        juesemingcheng: "",
        caidanguanlian: [],
        jiekouguanlian: [],
        paixu: 1,
        moren: true,
        beizhu: ""
      };
    },
    // 编辑
    updateData() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消"
          })
            .then(() => {
              this.editPara.Code = this.bllCode.edit;
              this.editPara.Data = JSON.stringify(this.editForm);
              handlePost(this.editPara)
                .then(res => {
                  if (res.IsSuccess == true) {
                    this.getDataList();
                    this.$refs["editForm"].resetFields();
                    this.dialogFormVisibleEdit = false;
                  }
                })
                .catch(err => {
                  console.log(err);
                });
            })
            .catch(e => {
              // 打印一下错误
              console.log(e);
            });
        }
      });
    },
    // 添加
    createData: function() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消"
          })
            .then(() => {
              this.editForm.id = 0;
              this.addPara.Code = this.bllCode.add;
              this.addPara.Data = JSON.stringify(this.editForm);
              handlePost(this.addPara)
                .then(res => {
                  if (res.IsSuccess == true) {
                    this.getDataList();
                    this.$refs["editForm"].resetFields();
                    this.dialogFormVisibleAdd = false;
                  }
                })
                .catch(err => {
                  console.log(err);
                });
            })
            .catch(e => {
              // 打印一下错误
              console.log(e);
            });
        }
      });
    },
    //取出id数组
    changeHelp(array) {
      this.list = array.map(item => item.id);
      return this.list;
    },
    //菜单分配保存
    SetMenuRole() {
      this.$confirm("确认提交吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          //console.log(this.$refs.tree.getCheckedKeys());
          this.paraMenu.Code = this.bllCode.setMenuRole;
          this.editForm.caidanguanlian = this.$refs.tree.getCheckedKeys();
          //console.log('this.editForm.jiekouguanlian',this.editForm.caidanguanlian)
          this.paraMenu.Data = JSON.stringify(this.editForm);
          handlePost(this.paraMenu)
            .then(res => {
              if (res.IsSuccess == true) {
                let ift = this.$store.dispatch("GetInfo"); //更新用户权限信息
                this.getDataList();
                this.dialogFormPermissionVisibleMenu = false;
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(e => {
          // 打印一下错误
          console.log(e);
        });
    },
    //接口分配保存
    SetInterfaceRole() {
      this.$confirm("确认提交吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.paraInterface.Code = this.bllCode.setInterfaceRole;
          this.editForm.jiekouguanlian = this.changeHelp(this.selsInterface);
          console.log("this.editForm", this.editForm);
          this.paraInterface.Data = JSON.stringify(this.editForm);
          handlePost(this.paraInterface)
            .then(res => {
              if (res.IsSuccess == true) {
                let ift = this.$store.dispatch("GetInfo"); //更新用户权限信息
                this.getDataList();
                this.dialogFormPermissionVisibleInterface = false;
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(e => {
          // 打印一下错误
          console.log(e);
        });
    },
    // 全选单选多选
    selsChange(sels) {
      this.sels = sels;
      //console.log(this.sels)
    },
    // 接口全选单选多选
    selsChangeInterface(sels) {
      this.selsInterface = sels;
      //console.log('this.selsInterface ',this.selsInterface )
    },
    // 批量删除
    batchRemove() {
      var ids = this.sels.map(item => item.id);
      this.$confirm("确认删除选中记录吗？", "提示", {
        type: "warning",
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          const paraId = {
            ids: ids
          };
          this.para.Data = JSON.stringify(paraId);
          this.para.Code = this.bllCode.del;
          handlePost(this.para)
            .then(res => {
              if (res.IsSuccess == true) {
                this.getDataList();
                this.$message({
                  message: "删除成功！",
                  type: "success"
                });
              } else {
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.loadButton(store.getters.interfaces); //按钮显示
    this.getDataList();
      },
  //  created: function () {
  //    console.log ('this.$refs.treeX',this.$refs.treeX)
  //   },
  //   mounted() {
  //    console.log ('this.$refs.treeX',this.$refs.attrList.store.defaultExpandAll)
  // }
};
</script>

<style scoped>
.el-dialog__body {
    padding: 0;
}
.box-cardBox {
  background: #e8edf0;
}
.panel-heading {
    padding: 15px;
    background: #e8edf0;
    border-color: #e8edf0;
    border-bottom: 1px solid transparent;
    border-top-right-radius: 2px;
    border-top-left-radius: 2px;
}
.panel-lead {
    /* margin-bottom: 15px; */
}
.panel-lead em{
    font-weight: bold;
    font-size: 14px;
    display: block;
}
.panel-lead span{
    color: #666;
    font-size: 14px;
}
.toolBox {
  background: #fff;
  /* min-height: 3.6rem; */
}
.el-form-item {
  margin-bottom: 0px;
}
</style>
