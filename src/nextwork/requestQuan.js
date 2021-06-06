import  {request} from './axios.js'

// 获取权限列表

export  function requestList(){

    return  request({

        url: 'rights/list',
        params:{
            type: 'list'
        }

    })
}

// 获取角色列表数据

export function requestjuese(){
    return request({
        url : 'roles'
    })
}

//  添加角色  ------> 这种方式不能成功,换成 this.$http方式

// export function addPerson(param){
//     return  request({
//         url:'roles',
//         method: 'post',
//         params:param
//     })
// }