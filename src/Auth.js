import axios from "axios";
import BI_BASE_CONFIG from "@/pnbi.base.config.js";
import EventBus, { PROFILE_UPDATED } from "./event-bus";
import is from "is";
export function unwrap(object) {
  if (typeof object.data.result.message !== "undefined") {
    return object.data.result.message;
  }
  return object.data;
}
export default {

  login(user) {
    const login = axios
      .post(`${BI_BASE_CONFIG.API}/login2`, user)
      .then(result => {
        return result.data.result;
      })
      .catch(error => Promise.reject(error.response));

    return Promise.all([login]).then(() => {
      return this.profile();
    });
  },
  logout() {
    return axios
      .get(`${BI_BASE_CONFIG.API}/logout`)
      .then(result => {
        EventBus.$emit(PROFILE_UPDATED, undefined);
        this._profile = undefined
        return result.data.result;
      })
      .catch(error => Promise.reject(error.response));
  },
  profile() {
    if (is.defined(this._profile)) {
      return Promise.resolve(this._profile);
    }
    return axios
      .get(`${BI_BASE_CONFIG.API}/profile`)
      .then(result => {
        const rn = result.data.result.realname
        let short = null
        if (rn.includes(' ')) {
          short = rn.split(' ').map(val =>  val.charAt(0).toUpperCase()).join('')
        } else {
          short = rn.substring(0,1)
        }
        this._profile = Object.assign(result.data.result, {short})
        EventBus.$emit(PROFILE_UPDATED, this._profile);
        window.CORE = window.CORE || {}
        window.CORE.user = result.data.result
        return this._profile;
      })
      .catch(error => Promise.reject(error.response));
  },
  password(password) {
    return axios
      .post(`https://bi.plan-net.com/api/v2/password`, password)
      .then(result => result.data.result)
      .catch(error => Promise.reject(error.response));
  },
  reset(data) {
    if (data.password_code) {
      return axios
        .post(`${BI_BASE_CONFIG.API}/reset`, data)
        .then(result => result)
        .catch(error => Promise.reject(error.response));
    }
    return axios
      .get(`${BI_BASE_CONFIG.API}/reset?email=${data.email}`)
      .then(result => result)
      .catch(error => Promise.reject(error.response));
  }
};

/* import axios from 'axios';

export const HTTP = axios.create({
  baseURL: `http://jsonplaceholder.typicode.com/`,
  headers: {
    Authorization: 'Bearer {token}'
  }
})
You could now use HTTP like so,

<script>
import {HTTP} from './http-common';

export default {
  data() {
    return {
      posts: [],
      errors: []
    }
  },

  created() {
    HTTP.get(`posts`)
    .then(response => {
      this.posts = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
  }
}
</script> */
