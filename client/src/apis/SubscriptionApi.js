import axios from "axios";

const BASEURL = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

export const newSubscription = async (formData) => {
  const res = await BASEURL.post("/api/v1/subscriptions", formData);
  // console.log(res.data)
  return res.data;
};


export const getSubscriptionByUser = async(id,status)=>{
  const res = await BASEURL.get(`/api/v1/subscriptions/user/${id}?status=${status}`);
  return res.data;
}

export const findSubscriptionById = async(id)=>{
  const res = await BASEURL.get(`/api/v1/subscriptions/${id}`);
  console.log(res.data)
  return res.data
}


export const updateSubscriptionById = async(id,formData)=>{
  const res = await BASEURL.put(`/api/v1/subscriptions/${id}`,formData);
  return res.data;
}


export const deleteSubscriptionById = async(id)=>{
  const res = await BASEURL.delete(`/api/v1/subscriptions/${id}`);
  return res.data;
}
