<template>
  <el-card shadow="never" class="aui-card--fill">
    <div class="mod-demo__visitordetail}">
      <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
        <el-form-item>
          <el-input v-model="dataForm.name" placeholder="姓名" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-date-picker v-model="dataForm.reqTime" type="date" value-format="yyyy-MM-dd" placeholder="申请时间"> </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-input v-model="dataForm.authName" placeholder="审核人" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="dataForm.status" placeholder="状态" clearable>
            <el-option value="0" label="待审核">待审核</el-option>
            <el-option value="1" label="已审核">已审核</el-option>
            <el-option value="2" label="已驳回">已驳回</el-option>
            <el-option value="3" label="已进场">已进场</el-option>
            <el-option value="4" label="已离场">已离场</el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="getDataList()">{{ $t("query") }}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="info" @click="exportHandle()">{{ $t("export") }}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button v-if="$hasPermission('demo:visitordetail:save')" type="primary" @click="addOrUpdateHandle()">{{ $t("add") }}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button v-if="$hasPermission('demo:visitordetail:delete')" type="danger" @click="deleteHandle()">{{ $t("deleteBatch") }}</el-button>
        </el-form-item>
      </el-form>
      <el-table v-loading="dataListLoading" :data="dataList" border @selection-change="dataListSelectionChangeHandle" style="width: 100%">
        <!-- <el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column> -->
        <!-- <el-table-column prop="id" label="id" header-align="center" align="center"></el-table-column> -->
        <el-table-column prop="name" label="访客姓名" header-align="center" align="center"></el-table-column>
        <el-table-column prop="phone" label="手机号码" header-align="center" align="center"></el-table-column>
        <el-table-column prop="headUrl" label="头像" header-align="center" align="center">
          <template slot-scope="data">
            <el-image :src="data.row.headUrl"></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="idNo" label="身份证号码" header-align="center" align="center"></el-table-column>
        <el-table-column prop="authCode" label="邀请码" header-align="center" align="center"></el-table-column>
        <el-table-column prop="carNo" label="车牌号" header-align="center" align="center"></el-table-column>
        <el-table-column prop="cause" label="来访事由" header-align="center" align="center"></el-table-column>
        <el-table-column prop="reqTime" label="预约日期" header-align="center" align="center">
          <template slot-scope="data">
            {{ dayjs(data.row.reqTime).format("YYYY-MM-DD") }}
          </template>
        </el-table-column>
        <el-table-column prop="authName" label="审核人" header-align="center" align="center"></el-table-column>
        <el-table-column prop="auditTime" label="审核时间" header-align="center" align="center"></el-table-column>
        <el-table-column prop="comeTime" label="进场时间" header-align="center" align="center"></el-table-column>
        <el-table-column prop="leaveTime" label="离场时间" header-align="center" align="center"></el-table-column>
        <el-table-column prop="status" label="状态" header-align="center" align="center">
          <template slot-scope="scope">
            {{ { 0: "待审核", "1": "已审核", 2: "已驳回", 3: "已进场", 4: "已离场" }[scope.row.status] }}
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="page"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="limit"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="pageSizeChangeHandle"
        @current-change="pageCurrentChangeHandle">
      </el-pagination>
      <!-- 弹窗, 新增 / 修改 -->
      <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
    </div>
  </el-card>
</template>

<script>
import mixinViewModule from "@/mixins/view-module";
import AddOrUpdate from "./visitordetail-add-or-update";
import dayjs from "dayjs";
export default {
  mixins: [mixinViewModule],
  data() {
    return {
      dayjs,

      mixinViewModuleOptions: {
        getDataListURL: "/visit/visitordetail/page",
        getDataListIsPage: true,
        exportURL: "/visit/visitordetail/export",
        deleteURL: "/visit/visitordetail",
        deleteIsBatch: true,
      },
      dataForm: {
        id: "",
        reqTime: "",
        authCode: "",
        status: "",
      },
    };
  },
  components: {
    AddOrUpdate,
  },
};
</script>
