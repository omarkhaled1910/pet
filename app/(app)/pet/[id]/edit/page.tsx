import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { ArrowBigLeft, Eye, Trash } from "lucide-react";

const EditPetPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return (
    <div>
      <header className="flex items-center justify-between gap-2 mb-6">
        <div className="flex items-center gap-2">
          <Link href={`/pet/${id}`}>
            <ArrowBigLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-2xl font-bold">Pet Details Form</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Link className="w-full h-full" href={`/pet/${id}`}>
              <Eye className="w-4 h-4" />
            </Link>
          </Button>
          <Button variant="destructive">
            <Trash className="w-4 h-4" />
          </Button>
        </div>
      </header>
    </div>
  );
};

export default EditPetPage;
