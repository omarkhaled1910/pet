"use client";
import React, { useState, useDeferredValue } from "react";
import PetsWrapper from "./PetsWrapper";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PetDashboardPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState<"available" | "pending" | "sold">(
    "available"
  );
  const deferredQuery = useDeferredValue(searchTerm);
  return (
    <div className="min-h-screen  container mx-auto">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-primary mb-2">Pet Dashboard</h1>
      </header>
      <div className="mb-8 flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search pets by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full sm:w-48">
          <Select
            value={status}
            onValueChange={(value) =>
              setStatus(value as "available" | "pending" | "sold")
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="sold">Sold</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <PetsWrapper searchTerm={deferredQuery} status={status} />
    </div>
  );
};

export default PetDashboardPage;
