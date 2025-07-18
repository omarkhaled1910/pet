"use server";
import { apiFetch } from "@/apiFetch";
import { COOKIE_TOKEN } from "@/constants";
import { validateCokkieToken } from "@/lib/serverUtils";
import { cookies } from "next/headers";

export type Pet = {
  id: number;
  category: {
    id: number;
    name: string;
  };
  name: string;
  photoUrls: string[];
  tags: {
    id: number;
    name: string;
  }[];
  status: "available" | "pending" | "sold";
};

export const getPetsByStatus = async (
  status: "available" | "pending" | "sold"
) => {
  try {
    const token = await validateCokkieToken();
    const res = await apiFetch<Pet[]>(`/pet/findByStatus?status=${status}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const getPetById = async (id: string) => {
  try {
    const token = await validateCokkieToken();
    const res = await apiFetch<Pet>(`/pet/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const updatePetPut = async (id: string, pet: Pet) => {
  try {
    const token = await validateCokkieToken();
    const res = await apiFetch<Pet>(`/pet/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "PUT",
      body: pet,
    });
    return res;
  } catch (error) {
    console.error(error);
  }
};
export const updatePetPost = async (
  id: string,
  pet: {
    name: string;
    status: "available" | "pending" | "sold";
    petid: number;
  }
) => {
  try {
    const token = await validateCokkieToken();
    await apiFetch<Pet>(`/pet/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
      body: pet,
    });
    return {
      success: true,
      message: "Pet updated successfully",
    };
  } catch (error) {
    console.error(error);
  }
};

export const deletePet = async (id: string) => {
  try {
    const token = await validateCokkieToken();
    const res = await apiFetch<{
      id: number;
      type: string;
      message: string;
    }>(`/pet/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "DELETE",
    });
    return {
      success: true,
      message: "Pet deleted successfully",
      id,
    };
  } catch (error) {
    console.error(error);
  }
};
