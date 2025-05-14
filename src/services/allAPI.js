import commonAPI from "./commonAPI"

export const uploadPost  = async(requestBody,requestHeader)=>{
  return await commonAPI('post','/upload',requestBody,requestHeader)
}

export const allPost  = async()=>{
  return await commonAPI('get','/allpost',"")
}

