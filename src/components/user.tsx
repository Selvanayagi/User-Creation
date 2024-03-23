import { useEffect, useState } from 'react'
import { User } from '../types/user';
import UserFormComp from './userForm';
import Modal from 'react-bootstrap/Modal';
import { validateUser } from '../utils/utils';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateUser, deleteUser, searchUser, deleteSelectedUsers } from '../actions/userListActions';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserComponent = () => {

    // Getting Search result and userList from redux state
    const userList = useSelector((state: any) => state.userList.userList);
    const searchResults = useSelector((state: any) => state.userList.searchResults);

    // Navigate and dispatch for routing and redux operations
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [ users, setUser ] = useState<Array<User>>([]); //userslist to show in local because we filter using search as well
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]); //selected users
    const [searchQuery, setSearchQuery] = useState(''); //searchQuery box
    const [editUser, setEditUser] = useState<User>({
        id: '',
        firstName: '',
        lastName: '',
        emailId: '',
        phone: ''
    }); //editUser template
    const [deleteUserIndex, setDeleteUserIndex] = useState<any>(); //storing index to delete one particular user at a time

    const [show, setShow] = useState(false); //modal control for adding users
    const [userModalShow, setUserModalShow] = useState(false); //modal control for editing user
    const [deleteModalShow, setDeleteModalShow] = useState(false); //modal control for deleting user
    const [deleteSelectedModalShow, setDeleteSelectedModalShow] = useState(false); //modal control for deleting users

    // Submit Edited User
    const saveEdit = () => {
        if(!validateUser(editUser.firstName, 'firstName') && !validateUser(editUser.lastName, 'lastName') && !validateUser(editUser.emailId, 'emailId') && !validateUser(editUser.phone, 'phone')) { //validate user
            dispatch(updateUser(editUser)); //set in redux
            setShow(false); //close modal
        } else {
            toast.error("Please enter valid values");
        }
    }

    // logging out an user
    const logout = () => {
        sessionStorage.removeItem('loggedIn');
        navigate('/login');
    }

    // Search from redux
    const handleSearch = () => {
        dispatch(searchUser(searchQuery));
    };

    // set default user list
    useEffect(()=>{
        setUser(userList);
    },[userList])

    // call search if conditions passed
    useEffect(()=>{
        if(searchQuery.length >= 3) {
            handleSearch();
        } else {
            setUser(userList)
        }
    },[searchQuery])

    // reset user data with search results
    useEffect(()=>{
        if(searchQuery.length >= 3) {
            setUser(searchResults)
        } 
    },[searchResults])
    
    return(
        <>
            <div className='actions'>
                <button onClick={() => { setUserModalShow(true) }} className='addUser'>Add Users</button>
                <button onClick={() => { logout() }}>Logout</button>
            </div>
            {/* Show user table */}
            <div className='users'>
                {
                    users?.length > 0 ?
                    <>
                        <h1>User List</h1>
                        <table>
                            <tr>
                                <td style={{ border: "unset", textAlign: "end" }} colSpan={7}>
                                    <div className="d-flex gap-2 justify-content-end">
                                        <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className='search' placeholder='Search User' />
                                        <button className='deleteUser'  onClick={()=>{ setDeleteSelectedModalShow(true) }} disabled={selectedUsers.length === 0}>Delete Users</button>
                                    </div>
                                    
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <input 
                                        style={{ width: "20px" }} 
                                        onClick={()=>{ 
                                            if(selectedUsers.length === userList.length) {
                                                setSelectedUsers([])
                                            } else {
                                                setSelectedUsers(userList.map((item: User) => item.id))
                                            }
                                        }} 
                                        type="checkbox" 
                                        checked={selectedUsers.length === userList.length} 
                                    />
                                </th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email ID</th>
                                <th>Phone Number</th>
                                <th colSpan={2}>Actions</th>
                            </tr>
                            {
                                users.map((user: User, index: number) => {
                                    return(
                                        <tr>
                                            <td>
                                                <input 
                                                    style={{ width: "20px" }} 
                                                    onClick={()=>{ 
                                                        if(selectedUsers.includes(user.id)) {
                                                            setSelectedUsers(selectedUsers.filter((item: string) => item !== user.id))
                                                        } else {
                                                            let newList = [...selectedUsers];
                                                            newList.push(user.id);
                                                            setSelectedUsers(newList)
                                                        }
                                                     }} 
                                                     type="checkbox" 
                                                     checked={selectedUsers.includes(user.id)} 
                                                />
                                            </td>
                                            <td>{user.firstName}</td>
                                            <td>{user.lastName}</td>
                                            <td>{user.emailId}</td>
                                            <td >{user.phone}</td>
                                            <td className='link' onClick={()=>{ setEditUser(users[index]); setShow(true) }}>Edit</td>
                                            <td className='link' onClick={()=>{ setDeleteModalShow(true); setDeleteUserIndex(index) }}>Delete</td>
                                        </tr>
                                    )
                                })
                            }
                        </table>
                    </>
                    :
                    <>
                        <h1>Click on Add users to add new users</h1>
                    </>
                }
            </div>

            {/* Edit User Modal */}
            <Modal show={show} onHide={() => { setShow(false); }}>
                <Modal.Header closeButton>
                <Modal.Title>Edit User Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table>
                        <tr>
                            <td>FirstName *</td>
                            <td style={{ width: "25px" }}></td>
                            <td>
                                <input 
                                    style={{ borderColor: editUser.firstName.length < 0 ? 'red' : '' }} 
                                    value={editUser.firstName} 
                                    onChange={(e) => {  
                                        setEditUser((prev: any) => ({
                                        ...prev,
                                        firstName: e.target.value
                                        })); 
                                    }} 
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>LastName *</td>
                            <td style={{ width: "25px" }}></td>
                            <td>
                                <input 
                                    style={{ borderColor: editUser.lastName.length < 0 ? 'red' : '' }} 
                                    value={editUser.lastName} 
                                    onChange={(e) => {  
                                        setEditUser((prev: any) => ({
                                        ...prev,
                                        lastName: e.target.value
                                        })); 
                                    }} 
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Email ID *</td>
                            <td style={{ width: "25px" }}></td>
                            <td>
                                <input 
                                    style={{ borderColor: editUser.emailId.length < 0 ? 'red' : '' }} 
                                    value={editUser.emailId} 
                                    onChange={(e) => {  
                                        setEditUser((prev: any) => ({
                                        ...prev,
                                        emailId: e.target.value
                                        })); 
                                    }} 
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Phone *</td>
                            <td style={{ width: "25px" }}></td>
                            <td>
                                <input 
                                    style={{ borderColor: editUser.phone.length < 0 ? 'red' : '' }} 
                                    value={editUser.phone} 
                                    onChange={(e) => {  
                                        setEditUser((prev: any) => ({
                                        ...prev,
                                        phone: e.target.value
                                        })); 
                                    }} 
                                />
                            </td>
                        </tr>
                    </table>
                    <button onClick={saveEdit}>Submit</button>
                </Modal.Body>
            </Modal>
            
            {/* Add user Modal */}
            <Modal show={userModalShow} onHide={() => { setUserModalShow(false); }} className='addUserModal'>
                <Modal.Header closeButton>
                <Modal.Title>Add Users</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <UserFormComp userList={users} setUserModalShow={setUserModalShow} />
                </Modal.Body>
            </Modal>

            {/* Delete Single user modal */}
            <Modal show={deleteModalShow} onHide={() => { setDeleteModalShow(false); }}>
                <Modal.Header closeButton>
                <Modal.Title>Delete User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure want to delete user?
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={() => { dispatch(deleteUser(deleteUserIndex)); setDeleteModalShow(false) }}>Yes</button>
                    <button onClick={()=>{ setDeleteModalShow(false); }}>No</button>
                </Modal.Footer>
            </Modal>

            {/* Delete multiple User modal */}
            <Modal show={deleteSelectedModalShow} onHide={() => { setDeleteSelectedModalShow(false); }}>
                <Modal.Header closeButton>
                <Modal.Title>Delete Users</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure want to delete selected users?
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={() => { dispatch(deleteSelectedUsers(selectedUsers)); setDeleteSelectedModalShow(false); setSelectedUsers([]) }}>Yes</button>
                    <button onClick={()=>{ setDeleteSelectedModalShow(false); }}>No</button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default UserComponent