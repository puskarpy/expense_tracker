import { Outlet, Navigate } from 'react-router-dom';
import { Sidebar } from '../components';
import { useContext } from 'react';
import { AuthContext } from '../context/user/AuthProvider';

export default function ProtectedLayout() {

  const {user, loading} = useContext(AuthContext)
  
  if(loading){
    return <p>Loading...</p>
  }

  if(!user){
    return <Navigate to={"/login"} replace/>
  }

  return (
    <div className="min-h-screen bg-black text-zinc-100 flex">
      <Sidebar />
      <main className="flex-1 lg:ml-64 p-4 md:p-8 lg:p-12 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}