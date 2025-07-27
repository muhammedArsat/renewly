import axios from "axios";

const BASEURL = axios.create({
  baseURL:import.meta.env.VITE_BACKEND_URL,
  withCredentials:true
})


export const getMe=async()=>{
  const res = await BASEURL.get('/api/v1/auth/getMe');
  return res.data
}

export const signIn = async(FormData)=>{
  const res = await BASEURL.post('/api/v1/auth/sign-in',FormData);
  return res.data
}

export const signUp = async(FormData)=>{
  const res = await BASEURL.post('/api/v1/auth/sign-up',FormData);
  return res.data;
}

export const signOut = async()=>{
  const res = await BASEURL.post('/api/v1/auth/sign-out');
  return res.data
}