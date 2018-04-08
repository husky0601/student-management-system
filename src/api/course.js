import request from '@/utils/request'

const courseApi = {}

courseApi.getList = function(params) {
    return request.get('/table/list', params)
}

// 学生提交选中课程
courseApi.selectCourse = function(params){
    const data = {
        stu_id: params.id,
        c_id_list: params.dataArray
    }
    return request({
        url: '/user/login',
        method: 'post',
        data: data
    })
}

// 添加课程
courseApi.create = function(params){
    const data = {
        teach_id:params.id,
        courseName: params.courseName,
        period: params.period,
        c_total: params.maxStudent,
        c_type: params.type,
        c_zxs: params.credits
    }
    return request({
        url: '/user/login',
        method: 'post',
        data: data
    })
}

courseApi.createForManage = function(params){
    const data = {
        teach_id:params.id,
        courseName: params.courseName,
        period: params.period,
        c_total: params.maxStudent,
        c_type: params.type,
        c_zxs: params.credits,
        time: params.time,
        classroom: params.classroom,
        teacher: params.teacher
    }
    return request({
        url: '/user/login',
        method: 'post',
        data: data
    })
}
courseApi.update = function(params){
    const data = {
        teach_id:params.id,
        courseName: params.courseName,
        period: params.period,
        c_total: params.maxStudent,
        c_type: params.type,
        c_zxs: params.credits,
        time: params.time,
        classroom: params.classroom,
        teacher: params.teacher
    }
    return request({
        url: '/user/login',
        method: 'post',
        data: data
    })
}

// 获取评论信息
courseApi.getCommentList = function(courseId){
    return request({
        url: '/user/info',
        method: 'get',
        params: {
            courseId: courseId
        }
    })
}
courseApi.createComment = function(params){
    const data = {
        courseId: params.courseId,
        studentId: params.studentId,
        data: params.data,
        comment: params.comment
    }
    return request({
        url: '/user/login',
        method: 'post',
        data: data
    })
}

export default courseApi