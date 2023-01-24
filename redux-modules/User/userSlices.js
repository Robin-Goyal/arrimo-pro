import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import config from "../../config/config";
import fetchPost from "../../utils/fetchPost";

const userDetails = {
  username: 'robingoyalgmail.com',
  password: 'testrobin'
}

export const userInitialState = {
  currentUser: {},
  userList: [],
  tempEditUser: {},
  isLoggedIn: false,
  errorMessage: '',
  successMessage: "",
  userAddedSuccess: false,
  userAddedError: false,
  deletedCode: 0,
};


export const createNewUser = createAsyncThunk(
  'user/addNewUser',
  async payload => {
    const response = await fetchPost(`${config.apiUrl}/user`, "POST", payload);
    return response;
  }
)
export const checkUserLogin = createAsyncThunk(
  'user/login',
  async payload => {
    const response = await fetchPost(`${config.apiUrl}/user/login`, "POST", payload);
    return response;
  }
)
export const getAllUsers = createAsyncThunk(
  'user/getAllUsers',
  async () => {
    const response = await fetchPost(`${config.apiUrl}/user`);
    return response;
  }
)
export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async payload => {
    console.log('payload :>> ', payload);
    const response = await fetchPost(`${config.apiUrl}/user/${payload}`, "DELETE");
    return response;
  }
)

export const userSlices = createSlice({
  name: "product",
  initialState: userInitialState,
  reducers: {
    setCurrentUser: (state, action) => {
      return Object.assign({}, state, {
        ...state,
        currentUser: action.payload,
      });
    },
    updateCurrentUser: (state, action) => {
      return Object.assign({}, state, {
        ...state,
        SelectedVariantSize: action.payload,
      });
    },
    resertUserAddedStatus: (state) => {
      state.userAddedSuccess = false;
      state.userAddedError = false;
      state.errorMessage = '';
    },
    logout: (state) => {
      state.currentUser = '';
      state.isLoggedIn = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewUser.fulfilled, (state, action) => {
        const { code, data, success } = action.payload;
        switch (code) {
          case 200: {
            state.userAddedSuccess = true;
            state.userAddedError = false;
            state.errorMessage = '';
            state.userList.push(action.payload);
            break;
          }
          case 202: {
            state.userAddedError = true;
            state.userAddedSuccess = false;
            state.errorMessage = data;
            break;
          } default: {
            break;
          }
        }

      })
      .addCase(checkUserLogin.fulfilled, (state, action) => {
        state.currentUser = action.payload.data;
        const { code, data, success } = action.payload;
        switch (code) {
          case 200: {
            state.isLoggedIn = true;
            state.userAddedError = false;
            state.currentUser = data;
            break;
          }
          case 201: {
            state.isLoggedIn = false;
            state.currentUser = {};
            state.errorMessage = data;
            break;
          } default: {
            break;
          }
        }
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.userList = action.payload.data;
        state.successMessage = "user deleted successfully";
        state.deletedCode = 200;
      },)
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.userList = action.payload.data;
      },)
    // and provide a default case if no other handlers matched
  },
});

// Action creators are generated for each case reducer function

export const {
  setCurrentUser,
  updateCurrentUser,
  deleteCurrentUser,
  resertUserAddedStatus,
  logout
} = userSlices.actions;

export default userSlices.reducer;

export const userAddedStatus = state => state.user.userAddedSuccess
export const userAddedErrorStatus = state => state.user.userAddedError
export const userAddedErrorMessage = state => state.user.errorMessage
export const loggedIn = state => state.user.isLoggedIn;
export const userList = state => state.user.userList;
export const getCurrentUser = state => state.user.currentUser;
export const getDeleteCode = state => state.user.deletedCode;

