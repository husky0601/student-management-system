import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: '权限',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },

  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: '例子',
  //   meta: { title: 'Example', icon: 'example' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: 'Table', icon: 'table' }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: 'Tree', icon: 'tree' }
  //     }
  //   ]
  // },

  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: '表单', icon: 'form' }
  //     }
  //   ]
  // },


  {
    path: '/course',
    component: Layout,
    redirect: '/course/list',
    name: '课程信息',
    meta: { title: '课程信息'},
    children: [
      {
        path: 'list',
        name: '课程列表',
        component: () => import('@/views/Course/CourseList'),
        meta: { title: '课程列表'},
      },
      {
        path: 'comment',
        name: '课程评价',
        component: () => import('@/views/Course/Comment'),
        hidden: true,
        meta: { title: '课程评价'},
      },
      {
        path: 'add',
        name: '添加课程',
        component: () => import('@/views/Course/AddCourse'),
        meta: { title: '添加课程'}
      },
      {
        path: 'review',
        name: '审核课程',
        component: () => import('@/views/Course/ReviewCourse'),
        meta: {title: '审核课程'}
      }
    ]
  },

  {
    path: '/score',
    component: Layout,
    redirect: '/score/list',
    name: '成绩信息',
    meta: { title: '成绩信息'},
    children: [
      {
        path: 'list',
        name: '成绩列表',
        component: () => import('@/views/Score/ScoreList'),
        meta: { title: '成绩列表'}
      },
      {
        path: 'add',
        name: '添加成绩',
        component: () => import('@/views/Score/AddScore'),
        meta: { title: '添加成绩'}
      },
      {
        path: 'update',
        name: '修改成绩',
        component: () => import('@/views/Score/UpdateScore'),
        meta: {title: '修改成绩'}
      }
    ]
  },

  {
    path: '/student',
    component: Layout,
    redirect: '/student/list',
    name: '学生信息',
    meta: { title: '学生信息'},
    children: [
      {
        path: 'list',
        name: '学生列表',
        component: () => import('@/views/Student/StudentList'),
        meta: { title: '学生列表'}
      },
      {
        path: 'selfList',
        name: '个人信息',
        component: () => import('@/views/Student/SelfStudentList'),
        meta: { title: '个人信息'}
      }
    ]
  },  

  {
    path: '/teacher',
    component: Layout,
    redirect: '/teacher/list',
    name: '教师信息',
    meta: { title: '教师信息'},
    children: [
      {
        path: 'list',
        name: '教师列表',
        component: () => import('@/views/Teacher/TeacherList'),
        meta: { title: '教师列表'}
      },
      {
        path: 'selfList',
        name: '个人信息',
        component: () => import('@/views/Teacher/SelfTeacherList'),
        meta: { title: '个人信息'}
      }
    ]
  },  

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

