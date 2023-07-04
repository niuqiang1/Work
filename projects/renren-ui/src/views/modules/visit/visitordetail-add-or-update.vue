<template>
  <el-dialog :visible.sync="visible" :title="!dataForm.id ? $t('add') : $t('update')" :close-on-click-modal="false" :close-on-press-escape="false">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmitHandle()" :label-width="$i18n.locale === 'en-US' ? '120px' : '80px'">
      <el-form-item label="访客姓名" prop="name">
        <el-input v-model="dataForm.name" placeholder="访客姓名"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="phone">
        <el-input v-model="dataForm.phone" placeholder="手机号码"></el-input>
      </el-form-item>
      <el-form-item label="头像" prop="headUrl">
        <el-input v-model="dataForm.headUrl" placeholder="头像"></el-input>
      </el-form-item>
      <el-form-item label="身份证号码" prop="idNo">
        <el-input v-model="dataForm.idNo" placeholder="身份证号码"></el-input>
      </el-form-item>
      <el-form-item label="邀请码" prop="authCode">
        <el-input v-model="dataForm.authCode" placeholder="邀请码"></el-input>
      </el-form-item>
      <el-form-item label="车牌号" prop="carNo">
        <el-input v-model="dataForm.carNo" placeholder="车牌号"></el-input>
      </el-form-item>
      <el-form-item label="来访事由" prop="cause">
        <el-input v-model="dataForm.cause" placeholder="来访事由"></el-input>
      </el-form-item>
      <el-form-item label="预约日期" prop="reqTime">
        <el-input v-model="dataForm.reqTime" placeholder="预约日期"></el-input>
      </el-form-item>
      <el-form-item label="审核时间" prop="auditTime">
        <el-input v-model="dataForm.auditTime" placeholder="审核时间"></el-input>
      </el-form-item>
      <el-form-item label="进场时间" prop="comeTime">
        <el-input v-model="dataForm.comeTime" placeholder="进场时间"></el-input>
      </el-form-item>
      <el-form-item label="离场时间" prop="leaveTime">
        <el-input v-model="dataForm.leaveTime" placeholder="离场时间"></el-input>
      </el-form-item>
      <el-form-item label="0 待审核 1 已审核 2 已驳回 3 已进场 4 已离场" prop="status">
        <el-input v-model="dataForm.status" placeholder="0 待审核 1 已审核 2 已驳回 3 已进场 4 已离场"></el-input>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <el-button @click="visible = false">{{ $t("cancel") }}</el-button>
      <el-button type="primary" @click="dataFormSubmitHandle()">{{ $t("confirm") }}</el-button>
    </template>
  </el-dialog>
</template>

<script>
import debounce from "lodash/debounce";
export default {
  data() {
    return {
      visible: false,
      dataForm: {
        id: "",
        name: "",
        phone: "",
        headUrl: "",
        idNo: "",
        authCode: "",
        carNo: "",
        cause: "",
        reqTime: "",
        auditTime: "",
        comeTime: "",
        leaveTime: "",
        status: "",
      },
    };
  },
  computed: {
    dataRule() {
      return {
        name: [{ required: true, message: this.$t("validate.required"), trigger: "blur" }],
        phone: [{ required: true, message: this.$t("validate.required"), trigger: "blur" }],
        headUrl: [{ required: true, message: this.$t("validate.required"), trigger: "blur" }],
        idNo: [{ required: true, message: this.$t("validate.required"), trigger: "blur" }],
        authCode: [{ required: true, message: this.$t("validate.required"), trigger: "blur" }],
        carNo: [{ required: true, message: this.$t("validate.required"), trigger: "blur" }],
        cause: [{ required: true, message: this.$t("validate.required"), trigger: "blur" }],
        reqTime: [{ required: true, message: this.$t("validate.required"), trigger: "blur" }],
        auditTime: [{ required: true, message: this.$t("validate.required"), trigger: "blur" }],
        comeTime: [{ required: true, message: this.$t("validate.required"), trigger: "blur" }],
        leaveTime: [{ required: true, message: this.$t("validate.required"), trigger: "blur" }],
        status: [{ required: true, message: this.$t("validate.required"), trigger: "blur" }],
      };
    },
  },
  methods: {
    init() {
      this.visible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].resetFields();
        if (this.dataForm.id) {
          this.getInfo();
        }
      });
    },
    // 获取信息
    getInfo() {
      this.$http
        .get(`/demo/visitordetail/${this.dataForm.id}`)
        .then(({ data: res }) => {
          if (res.code !== 0) {
            return this.$message.error(res.msg);
          }
          this.dataForm = {
            ...this.dataForm,
            ...res.data,
          };
        })
        .catch(() => {});
    },
    // 表单提交
    dataFormSubmitHandle: debounce(
      function () {
        this.$refs["dataForm"].validate((valid) => {
          if (!valid) {
            return false;
          }
          this.$http[!this.dataForm.id ? "post" : "put"]("/demo/visitordetail/", this.dataForm)
            .then(({ data: res }) => {
              if (res.code !== 0) {
                return this.$message.error(res.msg);
              }
              this.$message({
                message: this.$t("prompt.success"),
                type: "success",
                duration: 500,
                onClose: () => {
                  this.visible = false;
                  this.$emit("refreshDataList");
                },
              });
            })
            .catch(() => {});
        });
      },
      1000,
      { leading: true, trailing: false }
    ),
  },
};
</script>
