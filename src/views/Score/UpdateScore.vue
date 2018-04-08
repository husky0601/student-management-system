<template>
  <div class="app-container">

    <!-- 搜索栏 -->
    <div class="filter-container">
      <el-row :gutter="10">
        <el-col :span="4" :offset="2" class="filter-item">
          <el-input placeholder="课程名称" v-model="queryList.courseName"></el-input>
        </el-col>

        <el-col :span="4" :offset="1" class="filter-item">
          <el-select v-model="queryList.time" placeholder="学期">
            <el-option v-for="(time, index) in timeOption" :key="time" :value="index" :label="time">
            </el-option>
          </el-select>
        </el-col>

        <el-col :span="4" :offset="1" class="filter-item">
          <el-input placeholder="学生姓名" v-model="queryList.studentName"></el-input>
        </el-col>

        <el-col :span="2" :offset="2" class="filter-item">
          <el-button type="primary" @click="handleFilter">搜索</el-button>
        </el-col>

      </el-row>
    </div>

    <!-- 表格 -->
    <el-table :data="list" v-loading="listLoading" element-loading-text="加载中..." border fit highlight-current-row style="100%">

      <el-table-column align="center" label="课程编码">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="课程名称">
        <template slot-scope="scope">
          <span>{{scope.row.title}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="学号">
        <template slot-scope="scope">
          <span class="editPrimary" @click="handleUpdate(scope.row)">{{scope.row.pageviews}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="学院专业">
        <template slot-scope="scope">
          <span>{{scope.row.status}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="学生姓名">
        <template slot-scope="scope">
          <span>{{scope.row.studentName}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="上课时间">
        <template slot-scope="scope">
          <span>{{scope.row.time}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="成绩">
        <template slot-scope="scope">
          <span v-if="scope.row.display_time">{{scope.row.display_time}}</span>
          <span v-else> </span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="绩点">
        <template slot-scope="scope">
          <span v-if="scope.row.address">{{scope.row.address}}</span>
          <span v-else>0</span>
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
        <el-form-item label="成绩" prop="score">
          <el-input v-model.number="temp.score" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button v-if="dialogStatus=='update'" type="primary" @click="update">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import courseApi from "@/api/course";
export default {
  data() {
    return {
      list: null,
      listLoading: false,
      pageTotal: 20,
      studentId: "",
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
        time: "",
        teacher: ""
      },
      temp: {
        courseId: "",
        studentId: "",
        teacherId: "",
        score: ""
      },
      rules: {
        score: [
          { required: true, message: "请填写成绩"},
          { type: 'number', message: '成绩必须为数字值'}
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      courseApi.getList(this.queryList).then(res => {
        this.list = res.data.items;
        this.listLoading = false;
      });
    },
    resetTemp() {
      this.temp = {
        courseId: "",
        studentId: "",
        teacherId: "",
        score: ""
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
    handleUpdate(row) {
      this.temp = Object.assign({}, row);
      (this.dialogStatus = "update"),
        (this.dialogFormVisible = true),
        this.$nextTick(() => {
          this.$refs["dataForm"].clearValidate();
        });
    },
    update() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          courseApi.createForManage(this.temp).then(() => {
            this.dialogFormVisible = false;
            this.$message({
              message: "添加成功",
              type: "success"
            });
            this.getList()
          });
        }
      });
    }
  }
};
</script>

