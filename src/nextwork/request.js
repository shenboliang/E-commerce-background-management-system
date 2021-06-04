import {request} from './axios.js'

export  function  requestLogin(url,param){


    return    request({

            url : url,
            params:param,
                  
      
            method: 'post'
      })


}