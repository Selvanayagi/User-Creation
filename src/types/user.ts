export type User = {
    id: string;
    firstName: string;
    lastName: string;
    emailId: string;
    phone: string
}

export interface UserForm {
    userList: Array<User>
    setUserModalShow: any;
}

export interface UserListState {
    userList: User[];
    searchResults: User[];
  }
  
export type UserListAction = 
    | { type: 'MODIFY_USER'; payload: { users: User[] }; }
    | { type: 'DELETE_USER'; payload: { id: number }; }
    | { type: 'UPDATE_USER'; payload: { user: User }; }
    | { type: 'ADD_USER'; payload: { userListNew: User[] }; }
    | { type: 'SEARCH_USER'; payload: { searchQuery: string }; }
    | { type: 'DELETE_SELECTED_USERS'; payload: { selectedUsers: string[] }; };