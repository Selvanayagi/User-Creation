import { User } from "../types/user";

// Completely Modify the existing list
export const modifyUser = (userList: Array<User>) => ({
    type: "MODIFY_USER",
    payload: userList
})

// update a specific user
export const updateUser = (user: User) => ({
    type: "UPDATE_USER",
    payload: user
})

// delete a specific user
export const deleteUser = (id: number) => ({
    type: "DELETE_USER",
    payload: id
})

// add a new user
export const addUser = (userListNew: Array<User>) => ({
    type: "ADD_USER",
    payload: userListNew
})

// searching users
export const searchUser = (searchQuery: string) => ({
    type: "SEARCH_USER",
    payload: searchQuery
})

// delete multiple users at a time
export const deleteSelectedUsers = (selectedUsers: string[]) => ({
    type: "DELETE_SELECTED_USERS",
    payload: selectedUsers
})
  