<template>
  <div class="app-container">

    <!-- 搜索栏 -->
    <div class="filter-container">
      <el-row :gutter="10">
        <el-col :span="5" :offset="1" class="filter-item">
          <el-input placeholder="教师姓名" v-model="queryList.courseName"></el-input>
        </el-col>

        <el-col :span="5" class="filter-item">
          <el-input v-model="queryList.teacher" placeholder="职工号"></el-input>
        </el-col>

        <el-col :span="2" :offset="1" class="filter-item">
          <el-button type="primary" @click="handleFilter">搜索</el-button>
        </el-col>

        <el-col :span="2" class="filter-item">
          <el-button plain @click="handleCreate">添加教师</el-button>
        </el-col>
      </el-row>
    </div>

    <!-- 表格 -->
    <el-table :data="list" v-loading="listLoading" element-loading-text="加载中..." border fit highlight-current-row style="100%">
      <el-table-column align="center" label="教师职工号">
        <template slot-scope="scope">
          <a href="javascript:;" class="editPrimary" @click="handleUpdate(scope.row)">{{scope.row.id}}</a>
        </template>
      </el-table-column>

      <el-table-column align="center" label="教师姓名">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="所属学院">
        <template slot-scope="scope">
          <span>{{scope.row.title}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="职称">
        <template slot-scope="scope">
          <span>{{scope.row.pageviews}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="性别">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="联系方式">
        <template slot-scope="scope">
          <span>{{scope.row.status}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="删除教师">
        <template slot-scope="scope">
          <el-button type="danger" @click="handelDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页列表 -->
    <div class="pagination-container">
      <el-pagination @current-change="handleCurrentChange" :current-page="queryList.page" background layout="prev, pager, next" :total="pageTotal">
      </el-pagination>
    </div>

    <!-- 表单弹框 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="dataForm" :model="temp" label-position="right" label-width="110px" style='width: 400px; margin-left:50px;'>
        <el-form-item label="职工号" prop="teacherId">
          <el-input v-model.number="temp.teacherId"></el-input>
        </el-form-item>

        <el-form-item label="姓名" prop="teacherName">
          <el-input v-model="temp.teacherName"></el-input>
        </el-form-item>

        <el-form-item label="所属学院" prop="college">
          <el-input v-model="temp.college"></el-input>
        </el-form-item>

        <el-form-item label="职称" prop="specialty">
          <el-input v-model="temp.specialty"></el-input>
        </el-form-item>

        <el-form-item label="联系方式" prop="phone" v-if="dialogStatus=='update'">
          <el-input v-model="temp.phone"></el-input>
        </el-form-item>

        <el-form-item label="性别" prop="six">
          <!-- <el-input v-model="temp.six"></el-input> -->
          <el-radio-group v-model="temp.six">
            <el-radio :label="0">男</el-radio>
            <el-radio :label="1">女</el-radio>
          </el-radio-group>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button v-if="dialogStatus=='create'" type="primary" @click="create">添加</el-button>
        <el-button v-else type="primary" @click="update">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import teacherApi from "@/api/teacher";
import validatPhone from "@/utils/validate";
export default {
  data() {
    var checkPhone = (rule, value, callback) => {
      if (!value) callback();
      setTimeout(() => {
        if (!validatPhone(value)) {
          callback(new Error("请填写正确的手机号码"));
        }
      }, 1000);
    };
    return {
      list: null,
      listLoading: false,
      pageTotal: 20,
      teacherId: "",
      teacherName: "",
      isReview: true,
      dialogStatus: "",
      dialogFormVisible: false,
      textMap: {
        create: "创建",
        update: "修改"
      },
      timeOption: [
        "8:30--10:00",
        "10:20--11:50",
        "14:0--15:30",
        "15:50--17:20"
      ],
      queryList: {
        page: 1,
        courseName: "",
        teacherName: "",
        teacherId: "",
        time: "",
        teacher: ""
      },
      temp: {
        teacherId: undefined,
        teacherName: "",
        college: "",
        specialty: "",
        six: 0,
        phone: ""
      },
      rules: {
        teacherId: [
          { required: true, message: "请填写教师职工号" },
          { type: "number", message: "职工号必须为数字值" }
        ],
        teacherName: [
          { required: true, message: "请填写教师姓名", trigger: "change" }
        ],
        college: [{ required: true, message: "请填写学院", trigger: "blur" }],
        specialty: [{ required: true, message: "请填写专业", trigger: "blur" }],
        phone: [{ validator: checkPhone, trigger: "change" }]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      teacherApi.getList(this.queryList).then(res => {
        this.list = res.data.items;
        this.listLoading = false;
      });
    },
    resetTemp() {
      this.temp = {
        teacherId: undefined,
        teacherName: "",
        college: "",
        specialty: "",
        six: 0,
        phone: ""
      };
    },
    handleFilter() {
      this.queryList.page = 1;
      this.getList();
    },
    handleCurrentChange(val) {
      this.queryList.page = val;
      this.getList();
    },
    handleCreate() {
      this.resetTemp();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    create() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          teacherApi.create(this.temp).then(res => {
            this.dialogFormVisible = false;
            this.$message({
              message: "添加成功",
              type: "success"
            });
          });
        }
      });
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row);
      console.log(this.temp);
      this.dialogStatus = "update";
      (this.dialogFormVisible = true),
        this.$nextTick(() => {
          this.$refs["dataForm"].clearValidate();
        });
    },
    update() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          // const tempDate = object.assign({},this.temp)
          teacherApi.update(this.temp).then(() => {
            this.dialogFormVisible = false;
            this.$message({
              message: "添加成功",
              type: "success"
            });
          });
        }
      });
    },
    handelDelete(row) {
      this.$confirm("此操作将永久删除该教师, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          teacherApi.deleteteacher(row.teacherId).then(res => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style lang="css" scoped>
h3 {
  margin-top: 10px !important;
}
</style>