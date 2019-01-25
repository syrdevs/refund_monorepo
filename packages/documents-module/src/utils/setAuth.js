
import { stringify } from 'qs';


export default function(isToken = false) {

  const token = localStorage.getItem('AUTH_TOKEN');

  const destroySession = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('antd-pro-authority');
    location.replace('/user/login');
  };


  // if token and isToken
  if (token && isToken) {



    //return decoded.exp > Date.now() / 1000 ? token : false;

    return token;
  }

  // if token expired
  if (token) {



    /*if (!(decoded.exp > Date.now() / 1000)) {
     destroySession();
    }*/
  }

  // if auth antd-pro-authority
  if (!localStorage.getItem('antd-pro-authority')) {
    //destroySession();
  }

}
