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
          <el-button plain @click="handleSelectCourse">提交</el-button>
        </el-col>
      </el-row>
    </div>

    <!-- 表格 -->
    <el-table :data="list" v-loading="listLoading" element-loading-text="加载中..." border fit highlight-current-row style="100%">

      <el-table-column align="center" label="多选" width="55">
        <template slot-scope="scope">
          <el-checkbox :disabled="isStudent" @change="handleSelectChange(scope.row)"></el-checkbox>
        </template>
      </el-table-column>

      <el-table-column align="center" label="课程编码">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="课程名称">
        <template slot-scope="scope">          <!-- <router-link class="editPrimary" :to="toComment(scope.row)">{{scope.row.title}}</router-link> -->
          <span class="editPrimary" @click="toComment(scope.row)">{{scope.row.title}}</span>
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
  </div>
</template>

<script>
import courseApi from "@/api/course";
export default {
  data() {
    return {
      list: null,
      listLoading: false,
      selectDisable: false,
      pageTotal: 20,
      studentId: "",
      isStudent: false,
      timeOption: [
        "8:30--10:00",
        "10:20--11:50",
        "14:0--15:30",
        "15:50--17:20"
      ],
      multipleSelection: [],
      queryList: {
        page: 1,
        courseName: "",
        time: "",
        teacher: ""
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

    // 搜索列表
    handleFilter() {
      this.queryList.page = 1;
      this.getList();
    },

    // 换页
    handleCurrentChange(val) {
      this.queryList.page = val;
      this.getList();
    },

    // 更改选择
    handleSelectChange(row) {
      let flag = false,
        index;
      if (this.multipleSelection.length === 0) {
        this.multipleSelection.push(row.id);
      } else {
        this.multipleSelection.forEach((item, i) => {
          if (item === row.id) {
            flag = true;
            index = i;
            return;
          }
        });
        if (!flag) {
          this.multipleSelection.push(row.id);
          if (this.multipleSelection.length >= 5) {
            this.$message({
              message: "至多选择五门课程",
              type: "warning"
            });
          }
        } else {
          this.multipleSelection.splice(index, 1);
        }
      }
    },
    handleSelectCourse() {
      if (this.multipleSelection.length === 0) {
        this.$message({
          message: "请至少选择一门课程",
          type: "warning"
        });
        return;
      }
      let params = {
        dataArray: this.multipleSelection,
        id: this.studentId
      };
      courseApi.selectCourse(params).then(res => {
        if (res.code === 1) {
          this.$message({
            message: "提交成功",
            type: "success"
          });
        }
      });
    },

    // 查看留言板
    toComment(row) {
      this.$router.push({ path: "comment", query: { courseId: row.id } });
    }
  }
};
</script>
