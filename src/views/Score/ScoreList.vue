<template>
  <div class="app-container">

    <!-- 搜索栏 -->
    <div class="filter-container">
      <el-row :gutter="10">
        <el-col :span="3" :offset="1" class="filter-item">
          <h3>{{studentName}}</h3>
        </el-col>

        <el-col :span="5" class="filter-item">
          <el-input placeholder="课程名称" v-model="queryList.courseName"></el-input>
        </el-col>

        <el-col :span="4" :offset="1" class="filter-item">
          <el-select v-model="queryList.term" placeholder="学期">
            <el-option v-for="(term, index) in termOption" :key="term" :value="index" :label="term">
            </el-option>
          </el-select>
        </el-col>

        <el-col :span="2" :offset="1" class="filter-item">
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

      <el-table-column align="center" label="成绩">
        <template slot-scope="scope">
          <span>{{scope.row.display_time}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="绩点">
        <template slot-scope="scope">
          <span>{{scope.row.address}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="任课老师">
        <template slot-scope="scope">
          <span>{{scope.row.pageviews}}</span>
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
import scoreApi from "@/api/score";
export default {
  data() {
    return {
      list: null,
      listLoading: false,
      selectDisable: false,
      pageTotal: 20,
      studentName: '学生姓名',
      isStudent: false,
      termOption: [1,2,3,4,5,6,7,8],
      queryList: {
        page: 1,
        courseName: "",
        term: "",
        studentId: ''
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      scoreApi.getList(this.queryList).then(res => {
        this.list = res.data.items;
        // this.pageTotal = res.data.total
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
      if(this.multipleSelection.length === 0) {
        this.$message({
          message: '请至少选择一门课程',
          type: 'warning'
        })
        return
      }
      let params = {
        dataArray: this.multipleSelection,
        id: this.studentId
      };
      scoreApi.selectCourse(params).then(res => {
        if(res.code === 1){
          this.$message({
            message: '提交成功',
            type: 'success'
          })
        }
      })
    }
  }
};
</script>

<style lang="css" scoped>
h3{
  margin-top: 10px !important;
}
</style>

