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
