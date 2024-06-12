import React from 'react'

const withAuth = (Component) => {
   return function WithAuth(props){
      const isLogin = false;

      if(!isLogin) return <div>Anda Harus Login</div>;

      return <Component { ...props } />;
   }
}

export default withAuth