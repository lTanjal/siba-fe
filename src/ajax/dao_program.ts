import { Program, ResponseFiner } from "../types";
import { create, get, remove, update } from "./request";

const baseUrl = import.meta.env.VITE_BE_SERVER_BASE_URL;

// fetching all programs
export const fetchProgramsForSelect = async (): Promise<
  ResponseFiner<Program>
> => {
  const response = await get(`${baseUrl}/program`);
  if (response.status === 200) {
    const programs: Program[] = await response.json();
    return { httpStatus: response.status, data: programs };
  } else {
    return { httpStatus: response.status, data: [] };
  }
};

export const getProgramByUserEmail = async (
  email: string,
): Promise<ResponseFiner<Program>> => {
  const response = await get(`${baseUrl}/program/programName/${email}`);
  if (response.status === 200) {
    const programs: Program[] = await response.json();
    return { httpStatus: response.status, data: programs };
  } else {
    return { httpStatus: response.status, data: [] };
  }
};

// creating new program
export const postNewProgram = async (newProgram: Program): Promise<boolean> => {
  const response = await create(`${baseUrl}/program`, newProgram);
  return response.ok;
};

// update program
export const editProgram = async (editedProgram: Program): Promise<boolean> => {
  const response = await update(`${baseUrl}/program`, editedProgram);
  return response.ok;
};

// remove single program
export const deleteProgram = async (programId: number): Promise<boolean> => {
  const response = await remove(`${baseUrl}/program/${programId}`);
  if (response.status === 403) {
    return false;
  }
  const data = await response.json();
  return data?.returnedNumberValue === 1;
};
