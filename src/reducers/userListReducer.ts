import { Reducer } from "redux";
import { User, UserListAction, UserListState } from "../types/user";

const initialState: UserListState = {
  userList: [],
  searchResults: []
};
  
const userListReducer: Reducer<UserListState, UserListAction> = (state = initialState, action: any) => {
  switch (action.type) {

    // Update an user
    case 'UPDATE_USER':
      const userIndex = state.userList.findIndex((user: User) => user.id === action.payload.id);
      if (userIndex !== -1) {
        const updatedUserList = [
          ...state.userList.slice(0, userIndex),
          action.payload,
          ...state.userList.slice(userIndex + 1),
        ];
        return {
          ...state,
          userList: updatedUserList,
        };
      }
      return state;

    // Delete a single user
    case 'DELETE_USER':
      const updatedUserList = [
        ...state.userList.slice(0, action.payload),
        ...state.userList.slice(action.payload + 1),
      ].map((user: User, index) => ({ ...user, id: index + 1 })); 
      return {
        ...state,
        userList: updatedUserList,
      };

    // Add users
    case 'ADD_USER':
      const startingId = state.userList.length > 0 ? Number(state.userList[state.userList.length - 1].id) + 1 : 1;
      const usersWithIds = action.payload.map((user: User, index: number) => ({ ...user, id: startingId + index }));
      return {
        ...state,
        userList: [...state.userList, ...usersWithIds],
      };

    // modify complete user list
    case 'MODIFY_USER':
      return {
        ...state,
        userList: action.payload,
      };

    // Search user
    case 'SEARCH_USER':
      const searchQuery = action.payload.toLowerCase();
      const searchResults = state.userList.filter(user => {
        return Object.values(user).some(value => 
          typeof value === 'string' && value.toLowerCase().includes(searchQuery)
        );
      });
      // Commented code is for searching based on single field
      // const searchResults = state.userList.filter(user => user.firstName.toLowerCase().includes(searchQuery));
      return {
        ...state,
        searchResults,
      };

    // Delete multiple users
    case 'DELETE_SELECTED_USERS':
      return {
        ...state,
        userList: state.userList.filter((user: User) => !action.payload.includes(user.id)),
      };

    
    default:
      return state;
  }
};

export default userListReducer;