import { Equipment, ResponseFiner } from "../types";
import { create, download, get, remove, update } from "./request";

const baseUrl = import.meta.env.VITE_BE_SERVER_BASE_URL;

// fetching all equipments
export const fetchEquipmentData = async (): Promise<
  ResponseFiner<Equipment>
> => {
  const response = await get(`${baseUrl}/equipment`);
  if (response.status === 200) {
    const equipments: Equipment[] = await response.json();
    return { httpStatus: response.status, data: equipments };
  } else {
    return { httpStatus: response.status, data: [] };
  }
};

// fetching equipment by id
export const fetchEquipmentById = async (
  id: number,
): Promise<ResponseFiner<Equipment>> => {
  const response = await get(`${baseUrl}/equipment/${id}`);
  if (response.status === 200) {
    const equipments: Equipment[] = await response.json();
    return { httpStatus: response.status, data: equipments };
  } else {
    return { httpStatus: response.status, data: [] };
  }
};

// creating new equipment
export const postNewEquipment = async (
  newEquipment: Equipment,
): Promise<boolean> => {
  const response = await create(`${baseUrl}/equipment`, newEquipment);
  return response.ok;
};

//add multiple equipments
export const postNewEquipments = async (
  newEquipment: Equipment[],
): Promise<boolean> => {
  const response = await create(`${baseUrl}/equipment/multi`, newEquipment);
  return response.ok;
};

// updating equipment
export const editEquipment = async (
  editedEquipment: Equipment,
  id: number,
): Promise<boolean> => {
  const response = await update(`${baseUrl}/equipment/${id}`, editedEquipment);
  return response.ok;
};

// removing a single equipment
export const deleteSingleEquipment = async (
  equipmentId: number,
): Promise<boolean> => {
  const response = await remove(`${baseUrl}/equipment/${equipmentId}`);
  try {
    const data = await response.json();
    return data?.returnedNumberValue === 1;
  } catch (_) {
    return false;
  }
};

export const downloadEquipmentTemplate = async (): Promise<
  ResponseFiner<Equipment>
> => {
  return download<Equipment>("equipment", baseUrl);
};
