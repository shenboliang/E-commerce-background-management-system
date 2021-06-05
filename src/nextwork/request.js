import {request} from './axios.js'

//  登入验证数据

export  function  requestLogin(url,param){
    return    request({

            url : url,
            params:param,
            method: 'post'
      })
}

export function  requestMenuLeft(){

            return request({
                  url: 'menus'
            })


}
// 获取用户列表数据

 export function requestListdata(param){

            return  request({
                  url: 'users',
                  params: param
            })
 }

 // 修改用户权限,把其修改结果添加到数据库中

 export function changestatus(ur){

      return  request({
            url : ur,
            method: 'PUT'
      })
 }

 // 添加用户数据到数据库中

 export function  addUser(url,param){

return request({
      url:url,
      params: param,
      method: 'post'

})
 }