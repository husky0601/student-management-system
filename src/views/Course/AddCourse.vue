<template>
  <div class="app-container">

    <!-- 搜索栏 -->
    <div class="filter-container">
      <el-row :gutter="10">
        <el-col :span="5" :offset="1" class="filter-item">
          <!-- <span>课程名称：</span> -->
          <el-input placeholder="课程名称" v-model="queryList.courseName"></el-input>
        </el-col>

        <el-col :span="4" class="filter-item">
          <!-- <label>上课时间：</label> -->
          <el-select v-model="queryList.time" placeholder="上课时间">
            <el-option v-for="time in timeOption" :key="time" :value="time" :label="time">
            </el-option>
          </el-select>
        </el-col>

        <el-col :span="5" class="filter-item">
          <!-- <label>任课老师：</label> -->
          <el-input v-model="queryList.teacher" placeholder="任课老师"></el-input>
        </el-col>

        <el-col :span="2" :offset="1" class="filter-item">
          <el-button type="primary" @click="handleFilter">搜索</el-button>
        </el-col>

        <el-col :span="2" class="filter-item">
          <el-button plain @click="handleAddCourse">添加</el-button>
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

      <el-table-column align="center" label="上课时间">
        <template slot-scope="scope">
          <span>{{scope.row.display_time}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="上课教室">
        <template slot-scope="scope">
          <span>{{scope.row.address}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="任课老师">
        <template slot-scope="scope">
          <span>{{scope.row.pageviews}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="课程剩余量">
        <template slot-scope="scope">
          <span>{{scope.row.pageviews}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="学分">
        <template slot-scope="scope">
          <span>{{scope.row.status}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="课程性质">
        <template slot-scope="scope">
          <span>{{scope.row.status}}</span>
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
      <el-form :rules="rules" ref="dataForm" :model="temp" label-position="right" label-width="110px"  style='width: 400px; margin-left:50px;'>
        <el-form-item label="课程名称" prop="courseName">
          <el-input v-model="temp.courseName"></el-input>
        </el-form-item>

         <el-form-item label="周学时" prop="period">
          <el-input v-model="temp.period"></el-input>
        </el-form-item>

         <el-form-item label="课程性质" prop="type">
          <el-input v-model="temp.type"></el-input>
        </el-form-item>

        <el-form-item label="学分" prop="credits">
          <el-input v-model="temp.credits"></el-input>
        </el-form-item>

        <el-form-item label="最大报名人数" prop="maxStudent">
          <el-input v-model="temp.maxStudent"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button v-if="dialogStatus=='create'" type="primary" @click="create">提交</el-button>
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
      studentId: '',
      dialogStatus: '',
      dialogFormVisible: false,
      textMap: {
        create: '创建',
        update: '修改'
      },
      timeOption: ["8:30--10:00", "10:20--11:50", "14:0--15:30", "15:50--17:20"],
      queryList: {
        page: 1,
        courseName: "",
        time: "",
        teacher: ""
      },
      temp:{
        id:undefined,
        courseName: '',
        period: '',
        maxStudent: null,
        type: '',
        credits: null
      },
      rules: {
        courseName: [{required: true , message: '请填写课程名称', trigger:'change'}],
        period:[{required: true , message: '请填写周学时', trigger:'change'}],
        type: [{required: true , message: '请填写课程性质', trigger:'blur'}],
        credits: [{required: true , message: '请填写学分', trigger:'blur'}],
        maxStudent: [{required: true , message: '请填写最大报名人数', trigger:'blur'}],
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
        // console.log(this.list)
        this.listLoading = false;
      });
    },
    resetTemp(){
      this.temp = {
        id:undefined,
        courseName: '',
        period: '',
        maxStudent: null,
        type: '',
        credits: null
      }
    },
    handleFilter() {
      this.queryList.page = 1;
      this.getList();
    },
    handleCurrentChange(val) {
      this.queryList.page = val;
      this.getList();
    },
    handleAddCourse(){
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    create(){
      this.$refs['dataForm'].validate((valid) => {
        if(valid) {
          courseApi.create(this.temp).then(res => {
            this.dialogFormVisible = false
            this.$message({
              message: '添加成功',
              type: 'success'
            })
          })
        }
      })
    }
  }
};
</script>
