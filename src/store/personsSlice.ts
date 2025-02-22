import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getPersons } from "../utils";
import { IDoctor, INurse } from "./types";

interface IPersonsState {
  doctors: IDoctor[];
  nurses: INurse[];
}

const initialState: IPersonsState = {
  doctors: [],
  nurses: [],
};

export const personsSlice = createSlice({
  initialState,
  name: "personsSlice",
  reducers: {
    addDoctors: (
      state,
      { payload: { count } }: PayloadAction<{ count: number }>
    ) => {
      state.doctors = getPersons(count).map((e, i) => ({
        ...e,
        isManager: !(i%5)
      }))
    },
    addDoctor: (state, action: PayloadAction<IDoctor>)=> {
      state.doctors.push(action.payload);
    },
    editDoctor: (state, action: PayloadAction<IDoctor>)=> {
      const foundDoctorIndex = state.doctors?.findIndex(e=> e.id === action.payload.id);
      if(foundDoctorIndex > -1){
        state.doctors[foundDoctorIndex] = action.payload;
      }
    },
    deleteDoctor: (state, action: PayloadAction<string>)=> {
      state.doctors = state.doctors?.filter(e=> e.id !== action.payload);
    },
    addNurses: (
      state,
      { payload: { count } }: PayloadAction<{ count: number }>
    ) => {
      state.nurses = getPersons(count)
    },
    addNurse: (state, action: PayloadAction<INurse>)=> {
      state.nurses.push(action.payload);
    },
    editNurse: (state, action: PayloadAction<INurse>)=> {
      const foundDoctorIndex = state.nurses?.findIndex(e=> e.id === action.payload.id);
      if(foundDoctorIndex > -1){
        state.nurses[foundDoctorIndex] = action.payload;
      }
    },
    deleteNurse: (state, action: PayloadAction<string>)=> {
      state.nurses = state.nurses?.filter(e=> e.id !== action.payload);
    },
  },
});

export const { 
  addDoctors, 
  addNurses, 
  addDoctor, 
  addNurse, 
  deleteDoctor, 
  deleteNurse, 
  editDoctor, 
  editNurse 
} = personsSlice.actions;

