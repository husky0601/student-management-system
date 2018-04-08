import request from '@/utils/request'

const studentApi = {}

studentApi.getList = function(params) {
    return request.get('/table/list', params)
}


// 添加学生
studentApi.create = function(params){
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

// 修改学生信息
studentApi.update = function(params){
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

// 删除学生信息
studentApi.deleteStudent = function(studentId){
    const data = {
        studentId:studentId
    }
    return request({
        url: '/user/login',
        method: 'post',
        data: data
    })
}

// 获取学生课表
studentApi.getTimetable = function(studentId){
    return request({
        url: '/user/info',
        method: 'get',
        params: {
            studentId: studentId
        }
    })
}

export default studentApi