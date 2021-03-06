export default function ({ store, redirect, route }) {
  const isUser = store.state.auth.role;
  const isAdminPage = route.fullPath.indexOf('admin');

  let isAdminUser = null;
  let isRole = null;
  
  if(isUser){
    isRole = isUser;
  }

  if(isRole){
    isAdminUser = isRole === 'admin'
  }
  
  if(isAdminPage != -1 && !isAdminUser){
      redirect({ name: `index___${store.$i18n.locale}`})
  }
}