<template>
  <div class="app-container">

    <!-- 搜索栏 -->
    <div class="filter-container">
      <el-row :gutter="10">
        <el-col :span="3" :offset="1" class="filter-item">
          <h3>{{studentName}}</h3>
        </el-col>

        <el-col :span="5" :offset="1" class="filter-item">
          <el-input placeholder="课程名称" v-model="queryList.courseName"></el-input>
        </el-col>

        <el-col :span="4" class="filter-item">
          <el-select v-model="queryList.term" placeholder="学期">
            <el-option v-for="(term, index) in termOption" :key="index" :value="term" :label="term">
            </el-option>
          </el-select>
        </el-col>

        <!-- <el-col :span="5" class="filter-item">
          <el-input v-model="queryList.teacher" placeholder="任课老师"></el-input>
        </el-col> -->

        <el-col :span="2" :offset="1" class="filter-item">
          <el-button type="primary" @click="handleFilter">搜索</el-button>
        </el-col>

        <el-col :span="2" class="filter-item">
          <el-button plain>个人课表</el-button>
        </el-col>
      </el-row>
    </div>

    <!-- 表格 -->
    <el-table :data="list" v-loading="listLoading" element-loading-text="加载中..." border fit highlight-current-row style="100%">
      <!-- <el-table-column align="center" label="审核状态">
        <template slot-scope="scope">
          <el-tag size="mini" v-if="isReview" type="success" disabled>已审核</el-tag>
          <el-tag size="mini" v-else disabled>待审核</el-tag>
        </template>
      </el-table-column> -->

      <el-table-column align="center" label="课程编码">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="课程名称">
        <template slot-scope="scope">
          <span class="editPrimary" @click="handleUpdate(scope.row)">{{scope.row.title}}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column align="center" label="上课时间">
        <template slot-scope="scope">
          <span>{{scope.row.display_term}}</span>
        </template>
      </el-table-column> -->

      <!-- <el-table-column align="center" label="上课教室">
        <template slot-scope="scope">
          <span>{{scope.row.address}}</span>
        </template>
      </el-table-column> -->

      <el-table-column align="center" label="任课老师">
        <template slot-scope="scope">
          <span>{{scope.row.pageviews}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="成绩">
        <template slot-scope="scope">
          <span>{{scope.row.max}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="绩点">
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
      pageTotal: 20,
      studentId: "",
      studentName: '',
      isReview: true,
      termOption: [1,2,3,4,5,6,7,8],
      queryList: {
        page: 1,
        courseName: "",
        term: "",
        teacher: ""
      },
      
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
    handleFilter() {
      this.queryList.page = 1;
      this.getList();
    },
    handleCurrentChange(val) {
      this.queryList.page = val;
      this.getList();
    },
  }
};
</script>

<style lang="css" scoped>
h3{
  margin-top: 10px !important;
}
</style>