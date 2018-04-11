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
          <el-select v-model="queryList.dayTime" placeholder="上课时间">
            <el-option v-for="time in timeOption" :key="time" :value="time" :label="time">
            </el-option>
          </el-select>
        </el-col>

        <el-col :span="5" class="filter-item">
          <el-input v-model="queryList.teacherName" placeholder="任课老师"></el-input>
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
      <el-table-column align="center" label="审核状态">
        <template slot-scope="scope">
          <el-tag size="mini" v-if="isReview" type="success" disabled>已审核</el-tag>
          <el-tag size="mini" v-else disabled>待审核</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="课程编码">
        <template slot-scope="scope">
          <span>{{scope.row.courseId}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="课程名称">
        <template slot-scope="scope">
          <span class="editPrimary" @click="handleUpdate(scope.row)">{{scope.row.courseName}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="上课时间">
        <template slot-scope="scope">
          <span>{{scope.row.weekTime}}<br>{{scope.row.dayTime}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="上课教室">
        <template slot-scope="scope">
          <span>{{scope.row.classroom}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="提交老师">
        <template slot-scope="scope">
          <span>{{scope.row.teacherName}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="最大报名人数">
        <template slot-scope="scope">
          <span>{{scope.row.courseTotal}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="学分">
        <template slot-scope="scope">
          <span>{{scope.row.credits}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="课程性质">
        <template slot-scope="scope">
          <span>{{scope.row.type}}</span>
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
        <el-form-item label="课程名称" prop="courseName">
          <el-input v-model="temp.courseName"></el-input>
        </el-form-item>

        <el-form-item label="周学时" prop="period">
          <!-- <el-input v-model="temp.period"></el-input> -->
          <el-input-number v-model="temp.period" :min="15" :max="25"></el-input-number>
        </el-form-item>

        <el-form-item label="学分" prop="credits">
          <!-- <el-input v-model.number="temp.credits"></el-input> -->
          <el-input-number v-model="temp.credits" :min="1" :max="4"></el-input-number>
        </el-form-item>

        <el-form-item label="课程性质" prop="type">
          <el-input v-model="temp.type"></el-input>
        </el-form-item>

        <el-form-item label="最大报名人数" prop="courseTotal">
          <el-input v-model.number="temp.courseTotal"></el-input>
        </el-form-item>

        <el-form-item label="任课老师" prop="teacherName">
          <el-input v-model="temp.teacherName"></el-input>
        </el-form-item>

        <el-form-item label="上课星期" prop="weekTime">
          <el-select v-model="temp.weekTime" placeholder="上课星期">
            <el-option v-for="(week,index) in weekOption" :key="index" :value="index" :label="week">
            </el-option>
          </el-select>
          <!-- <el-input v-model="temp.time"></el-input> -->
        </el-form-item>

        <el-form-item label="上课时间" prop="dayTime">
          <el-select v-model="temp.dayTime" placeholder="上课时间">
            <el-option v-for="(time,index) in timeOption" :key="index" :value="index" :label="time">
            </el-option>
          </el-select>
          <!-- <el-input v-model="temp.time"></el-input> -->
        </el-form-item>

         <el-form-item label="上课教室" prop="classroom">
          <el-input v-model="temp.classroom"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button  v-if="dialogStatus=='create'" type="primary" @click="create">添加</el-button>
        <el-button  v-else type="primary" @click="update">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import courseApi from "@/api/course";
// import mapGetters from 'vuex'
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
      weekOption:[
        "星期一", "星期二","星期三","星期四","星期五","星期六","星期日",
      ],
      queryList: {
        page: 1,
        courseName: "",
        dayTime: "",
        teacherName: ""
      },
      temp: {
        teacherId: undefined,
        teacherName: '',
        courseName: "",
        period: "",
        courseTotal: null,
        type: "",
        credits: null,
        classroom: "",
        dayTime: "",
        weekTime:''
      },
      rules: {
        courseName: [
          { required: true, message: "请填写课程名称", trigger: "change" }
        ],
        period: [
          { required: true, message: "请填写周学时", trigger: "change" }
        ],
        type: [{ required: true, message: "请填写课程性质", trigger: "blur" }],
        credits: [{ required: true, message: "请填写学分", trigger: "blur" }],
        courseTotal: [
          { required: true, message: "请填写最大报名人数"},
          { type: 'number', message: '最大报名人数必须为数字值'}
        ],
        classroom: [
          { required: true, message: "请填写上课教室", trigger: "blur" }
        ],
        teacherName: [
          { required: true, message: "请填写任课教师", trigger: "blur" }
        ],
        dayTime: [{ required: true, message: "请选择上课时间", trigger: "change" }],
        weekTime: [{ required: true, message: "请选择上课星期", trigger: "change" }],
      }
    };
  },
  // computed: {
  //   ...mapGetters([
  //     'id'
  //   ])
  // },
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
        id: undefined,
        courseName: "",
        period: "",
        maxStudent: null,
        type: "",
        credits: null,
        classroom: "",
        teacher: "",
        time: ""
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
    handleAddCourse() {
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
          courseApi.create(this.temp).then(res => {
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
      this.dialogStatus = "update"
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    update() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          // const tempDate = object.assign({},this.temp)
          courseApi.createForManage(this.temp).then(() => {
            this.dialogFormVisible = false;
            this.$message({
              message: "添加成功",
              type: "success"
            });
          });
        }
      });
    }
  }
};
</script>

