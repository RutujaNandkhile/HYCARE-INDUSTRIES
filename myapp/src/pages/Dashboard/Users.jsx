import React,{useEffect,useState} from "react";

import {
getUsers,
deleteUser,
updateUser
} from "../../services/userService";

import "./Users.css";

const Users=()=>{

const[users,setUsers]=useState([]);
const[editUser,setEditUser]=useState(null);

useEffect(()=>{
loadUsers();
},[]);

const loadUsers=async()=>{
const res=await getUsers();
setUsers(res.data);
};

const handleDelete=async(id)=>{

if(window.confirm("Delete user?")){

await deleteUser(id);

loadUsers();
}

};

const handleUpdate=async()=>{

await updateUser(editUser._id,editUser);

setEditUser(null);

loadUsers();

};

return(

<div className="container">

<h3>User Dashboard</h3>

{editUser && (

<div>

<input
value={editUser.name}
onChange={(e)=>
setEditUser({...editUser,name:e.target.value})
}
/>

<input
value={editUser.email}
onChange={(e)=>
setEditUser({...editUser,email:e.target.value})
}
/>

<input
value={editUser.password}
onChange={(e)=>
setEditUser({...editUser,password:e.target.value})
}
/>

<button onClick={handleUpdate}>
Update
</button>

</div>

)}

<table className="table">

<thead>

<tr>

<th>ID</th>
<th>Name</th>
<th>Email</th>
<th>Password</th>
<th>Action</th>

</tr>

</thead>

<tbody>

{users.map((u)=>(
<tr key={u._id}>

<td>{u._id}</td>
<td>{u.name}</td>
<td>{u.email}</td>
<td>{u.password}</td>

<td>

<button
onClick={()=>setEditUser(u)}
>
Edit
</button>

<button
onClick={()=>handleDelete(u._id)}
>
Delete
</button>

</td>

</tr>
))}

</tbody>

</table>

</div>

);

};

export default Users;