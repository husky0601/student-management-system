import request from '@/utils/request'

const teacherApi = {}

teacherApi.getList = function(params) {
    return request.get('/table/list', params)
}


// 添加教师
teacherApi.create = function(params){
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

// 修改教师信息
teacherApi.update = function(params){
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

// 删除教师信息
teacherApi.deleteTeacher = function(teacherId){
    const data = {
        teacherId:teacherId
    }
    return request({
        url: '/user/login',
        method: 'post',
        data: data
    })
}

// 获取教师课表
teacherApi.getTimetable = function(teacherId){
    return request({
        url: '/user/info',
        method: 'get',
        params: {
            teacherId: teacherId
        }
    })
}

export default teacherApi