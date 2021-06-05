import axios from 'axios'

export  function request(config){
    // (1) 创建一个 axios实例

    const  instance = axios.create({
        timeout : 5000,
        baseURL: 'http://47.108.206.212:9999/api/private/v1/'

        // 该接口维护到 23年
        // baseURL:'http://timemeetyou.com:8889/api/private/v1/'
    })

    

   
     // 请求拦截

       instance.interceptors.request.use(config=>{
          
        config.headers.Authorization =  window.sessionStorage.getItem('token')

       
            return config
        },err=>{
           
                return  err
        })


        // 响应拦截 


      instance.interceptors.response.use(res=>{
         
            return res
        },err=>{
           return err
        })

    return instance(config)
         
      } 
