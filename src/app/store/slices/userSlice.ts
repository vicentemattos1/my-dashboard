import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { useSelector, shallowEqual } from 'react-redux';

interface UserState {
  username: string;
  isAuthenticated: boolean;
}

interface UserStoreType {
  user: UserState | null;
}

const initialState: UserStoreType = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, { payload }: PayloadAction<{ username: string }>) => {
      state.user = {
        ...payload,
        isAuthenticated: true,
      };
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { updateUser, clearUser } = userSlice.actions;
export default userSlice.reducer;

export const userSelector = ({ user }: RootState) => {
  return user;
};

export const useUser = () => {
  const { user } = useSelector(userSelector, shallowEqual);
  return { user };
};
