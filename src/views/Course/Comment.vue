<template>
  <div class="app-container">
    <div class="comment">
      <div class="comment-header">
        <el-row class="header-row">
          <el-col :span="5">
            <span>课程名称：</span>
          </el-col>
          <el-col :span="5">
            <span>XXX</span>
          </el-col>
        </el-row>

        <el-row class="header-row">
          <el-col :span="5">
            <span>任课教师：</span>
          </el-col>
          <el-col :span="5">
            <span>XXX</span>
          </el-col>
        </el-row>

        <el-row class="header-row">
          <el-col :span="5">
            <span>上课时间：</span>
          </el-col>
          <el-col :span="5">
            <span>XXX</span>
          </el-col>
        </el-row>

        <el-row class="header-row">
          <el-col :span="5">
            <span>上课教室：</span>
          </el-col>
          <el-col :span="5">
            <span>XXX</span>
          </el-col>
        </el-row>
      </div>

      <form class="comment-form">
        <h3>留言板</h3>
        <el-input type="textarea" :rows="6" placeholder="请输入评论内容" v-model="temp.comment">
        </el-input>
        <p v-show="error" class="error">{{errorTip}}</p>
        <div class="form-footer">
          <el-button type="primary" @click="handeleCreate">提交</el-button>
        </div>
      </form>

      <section class="comment-list">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>评论列表</span>
          </div>
          <div class="list-context" v-for="(item,index) in commentList" :key="index">
          <el-row :gutter="10" class="list-row">
            <el-col :span="5">
              <span>{{item.name}}</span>
            </el-col>
            <el-col :span="7" :offset="12">
              <span class="time">{{item.date}}</span>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="24">
              <p>{{item.comment}}</p>
            </el-col>
          </el-row>

        </div>
        </el-card>
      </section>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { parseTime } from '@/utils/index'
import courseApi from '@/api/course'

export default {
  data() {
    return {
      // courseId: this.$route.query.courseId,
      error: false,
      errorTip: "",
      temp: {
        courseId: this.$route.query.courseId,
        comment: "",
        date: parseTime(new Date(), '{y}-{m}-{d} {h}:{i}')
      },
      array: [],
      commentList: []
    };
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  created(){
    this.getList()
  },
  methods: {
    getList(){
      // courseApi.getCommentList(this.temp.courseId).then((res) => {
      //   this.commentList = res.data.list
      // })
      this.commentList = JSON.parse(window.localStorage.getItem('commentList'))
    },
    handeleCreate() {
      if (!this.temp.comment) {
        this.error = true;
        this.errorTip = "请填写内容";
        return;
      }
      if (this.temp.comment.length < 6) {
        this.error = true;
        this.errorTip = "留言内容不少于6个字符";
        return;
      }
      this.error = false;
      if(window.localStorage){
        this.temp.name = this.name
        this.array.push({
          id: this.$route.query.courseId,
          name: this.name,
          date: parseTime(new Date(), '{y}-{m}-{d} {h}:{i}'),
          comment: this.temp.comment
        })
        window.localStorage.setItem('commentList', JSON.stringify(this.array))
        this.temp.comment = null
        this.getList()
      }
      // courseApi.createComment(this.temp).then(() => {
      //   this.temp.comment = null
      //   this.getList()
      // })
    }
  }
};
</script>

<style lang="scss" scoped>
.comment {
  width: 60%;
  margin: 10px auto;
  border: 1px solid #e1e1e1;
  padding: 50px;
  .comment-header {
    padding-bottom: 20px;
    border-bottom: 1px solid #e1e1e1;
    .header-row {
      margin: 10px 0;
    }
  }
  .comment-form {
    margin: 30px 0 20px;
    text-align: center;
    padding-bottom: 20px;
    border-bottom: 1px solid #e1e1e1;
    .form-footer {
      margin-top: 20px;
      text-align: right;
    }
  }
  .comment-list {
    margin: 30px 0 20px;
    h3 {
      margin: 20px 0 50px;
      text-align: center;
    }
    .list-context {
      padding: 5px;
      border-bottom: 1px solid #e1e1e1;
      .list-row{
        margin-top: 10px;
      }
    }
    .time {
      color: #aaa;
      font-size: 14px;
    }
  }
  .error {
    font-size: 12px;
    color: red;
    margin: 5px 0;
    text-align: left;
  }
}
</style>


