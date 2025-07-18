"use server";
const BASE_URL = process.env.API_BASE_URL || "https://petstore.swagger.io/v2";

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: HeadersInit;
  body?: any;
};

export async function apiFetch<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T | undefined> {
  const { method = "GET", headers = {}, body } = options;

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers: {
      // common auth headers goes here
      "Content-Type": "application/json",
      ...headers,
    },
    ...(body && { body: JSON.stringify(body) }),
    cache: "no-store", // or use 'force-cache' / 'no-cache' based on your needs
  });

  if (!res.ok) {
    const error = await res.text();
    // throw new Error(`API error (${res.status}): ${error}`);
    console.error(error, res.status, "error in apiFetch");
  }

  return res.json();
}
