import request from '@/utils/request'

const scoreApi = {}

scoreApi.getList = function(params) {
    return request.get('/table/list', params)
}

// 学生提交选中课程
// scoreApi.selectscore = function(params){
//     const data = {
//         stu_id: params.id,
//         c_id_list: params.dataArray
//     }
//     return request({
//         url: '/user/login',
//         method: 'post',
//         data: data
//     })
// }

// 添加成绩
scoreApi.create = function(params){
    const data = {
        teacher_id:params.teacher_id,
        course_id: params.course_id,
        stu_id: params.stu_id,
        score: params.score,
    }
    return request({
        url: '/user/login',
        method: 'post',
        data: data
    })
}

scoreApi.update = function(params){
    const data ={
        teacher_id:params.teacher_id,
        course_id: params.course_id,
        stu_id: params.stu_id,
        score: params.score,
    }
    return request({
        url: '/user/login',
        method: 'post',
        data: data
    })
}

export default scoreApi