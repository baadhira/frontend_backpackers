import axios, { Axios } from "axios";

export const BASE_URL = "http://127.0.0.1:8000/"

export const token="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjUyMDg0NTM3LCJpYXQiOjE2NTIwODI3MzcsImp0aSI6IjUzNmM3NTA4MjdlMDQ2Y2JhNzcxZjk4ZTM0N2M4ZjZmIiwidXNlcl9pZCI6NH0.4GHpr2PIgZMiVdh3UgzPXdc-mH_UTQxJkT90FhjAKzM"

export const MESSAGE_URL=BASE_URL + 'message/message'


export const axiosHandler = ({
    method = "",
    url = "",
    token = null,
    data = {},
    extra = null,
  }) => {
    let methodType = method.toUpperCase();
    if (
      ["GET", "POST", "PATCH", "PUT", "DELETE"].includes(methodType) ||
      {}.toString(data) !== "[object Object]"
    ) {
      let axiosProps = { method: methodType, url, data };
  
      if (token) {
        axiosProps.headers = { Authorization: `Bearer ${token}` };
      }
      if (extra) {
        axiosProps.headers = { ...axiosProps.headers, ...extra };
      }
      return axios(axiosProps);
    } else {
      alert(`method ${methodType} is not accepted or data is not an object`);
    }
  };