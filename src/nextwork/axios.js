import axios from 'axios'

export  function request(config,param){
    // (1) 创建一个 axios实例

    const  instance = axios.create({
        timeout : 5000,
        baseURL: 'http://47.108.206.212:9999/api/private/v1/'
    })

    

   
     // 请求拦截

       instance.interceptors.request.use(config=>{
          
            return config
        },err=>{
            console.log(err)
                return  err
        })


        // 响应拦截 


      instance.interceptors.response.use(res=>{
         
            return res
        },err=>{
            console.log(err)
        })

    return instance(config,param)
         
      } 
