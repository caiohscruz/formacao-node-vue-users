import axios from 'axios'

export default function AdminAuth(to, from, next) {
    if (localStorage.getItem('token') != undefined) {
      var req = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem('token')
        }
      }
      axios.post(`${process.env.VUE_APP_API}/validate`, {}, req).then(res => {
        console.log(res);
        next();
      }).catch(err => {
        alert(err.response.data);
        next("/");
      })
    } else {
      next("/login");
    }
  }