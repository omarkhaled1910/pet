import React from "react";
import PetWrapper from "./PetWrapper";

const PetPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  console.log(id);

  return (
    <div>
      <PetWrapper id={id} />
    </div>
  );
};

export default PetPage;
