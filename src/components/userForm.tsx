import { useState } from 'react';
import { User, UserForm } from '../types/user';
import { validateUser } from '../utils/utils';
import { useDispatch } from 'react-redux';
import { addUser } from '../actions/userListActions';

const UserFormComp = ( { userList, setUserModalShow }: UserForm ) => {

    const dispatch = useDispatch();

    const [form, setForms] = useState<Array<User>>([
        {
            id: userList.length.toString(),
            firstName: '',
            lastName: '',
            emailId: '',
            phone: ''
        }
    ]) //store local min max data

    const [error, setError] = useState([{
        id: userList.length.toString(),
        firstName: true,
        lastName: true,
        emailId: true,
        phone: true
    }]) //error for form data


    // Add new row of user
    const addUserForm = () => {
        let newUser = [...form];
        newUser.push({
            id: (Number(form[form.length - 1]) + 1).toString(),
            firstName: '',
            lastName: '',
            emailId: '',
            phone: ''
        })
        setForms(newUser)
        let newUserError = [...error];
        newUserError.push({
            id: (Number(form[form.length - 1]) + 1).toString(),
            firstName: true,
            lastName: true,
            emailId: true,
            phone: true
        })
        setError(newUserError)
    }

    // remove an user row
    const removeUser = (id: number) => {
        let newList = [...form];
        newList.splice(id, 1);
        setForms(newList)
        let newErrorList = [...error];
        newErrorList.splice(id, 1);
        setError(newErrorList)
    }

    // Set Data on change
    const setData = ( value: string, field: string, id: number, err: boolean ) => {
        let newList = [...form];
        let newErrorList = [...error];
        // @ts-ignore
        newList[id][field] = value;
        // @ts-ignore
        newErrorList[id][field] = err;
        setForms(newList);
        setError(newErrorList)
    }


    // Add users to redux store
    const addUsers = () => {
        let err = error.some(obj => Object.values(obj).some(value => value === true));
        if(err) {
            alert("Please enter valid values")
        } else {
            setError([{
                id: userList.length.toString(),
                firstName: false,
                lastName: false,
                emailId: false,
                phone: false
            }])
            setForms([
                {
                    id: userList.length.toString(),
                    firstName: '',
                    lastName: '',
                    emailId: '',
                    phone: ''
                }
            ])
            dispatch(addUser(form));
            setUserModalShow(false);
        }
    }

    return(
        <>
            <table>
                <tr>
                    <th>FirstName</th>
                    <th>LastName</th>
                    <th>Email ID</th>
                    <th>Phone</th>
                </tr>
                {
                    form.map(( f: User, id: number )=>{
                        return (
                           <tr>
                                <td>
                                    <input style={{ borderColor: f.firstName.length !== 0 && error[id].firstName ? 'red' : '' }} value={f.firstName} onChange={(e) => { setData(e.target.value, 'firstName', id, validateUser(e.target.value, 'firstName')); }} />
                                </td>
                                <td>
                                    <input style={{ borderColor: f.lastName.length !== 0 && error[id].lastName ? 'red' : '' }} value={f.lastName} onChange={(e) => { setData(e.target.value, 'lastName', id, validateUser(e.target.value, 'lastName')); }} />
                                </td>
                                <td>
                                    <input style={{ borderColor: f.emailId.length !== 0 && error[id].emailId ? 'red' : '' }} value={f.emailId} onChange={(e) => { setData(e.target.value, 'emailId', id, validateUser(e.target.value, 'emailId')); }} />
                                </td>
                                <td>
                                    <input style={{ borderColor: f.phone.length !== 0 && error[id].phone ? 'red' : '' }} value={f.phone} onChange={(e) => { setData(e.target.value, 'phone', id, validateUser(e.target.value, 'phone')); }} />
                                </td>
                                <td>
                                    <div className="d-flex gap-1 ml-2">
                                        <div className='button-action' onClick={()=>{ removeUser(id) }}>-</div>
                                        {
                                            form.length - 1 === id && form.length < 5 && 
                                            <div className='button-action' onClick={addUserForm}>+</div>
                                        }
                                    </div>
                                </td>
                           </tr>
                        )
                    })
                }
            </table>
            <button className='addUser' onClick={addUsers}>Add Users</button>
        </>
    )
}

export default UserFormComp;