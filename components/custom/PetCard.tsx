import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Image from "next/image";
import { Pet } from "@/app/actions/pets";

export default function PetCard({ pet }: { pet: Pet }) {
  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-lg relative">
      {/* Tags positioned absolutely at top */}
      {pet.tags?.length > 0 && (
        <div className="absolute top-2 left-2 z-10 flex gap-1 flex-row items-center justify-center">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              pet.status === "available"
                ? "bg-green-100 text-green-800"
                : pet.status === "pending"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {pet.status}
          </span>
          {pet?.tags?.map((tag, i) => (
            <span
              key={tag.id + i}
              className="inline-block text-center bg-gray-100/90 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-medium text-gray-700 truncate"
            >
              {tag.name}
            </span>
          ))}
        </div>
      )}

      <CardHeader className="p-0">
        {true ? (
          <div className="aspect-square relative">
            <Image
              src={"/cute-happy-pup.webp"}
              alt={pet.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          </div>
        ) : (
          <div className="bg-gray-200 border-2 border-dashed aspect-square flex items-center justify-center">
            <span className="text-gray-500">No Image</span>
          </div>
        )}
      </CardHeader>

      <CardContent className="px-2 py-1 ">
        {/* Name and ID in columns */}
        <div className="grid grid-cols-1 text-start gap-2">
          <div className="truncate">
            <h3 className="font-semibold text-lg truncate">{pet.name}</h3>
          </div>
          <div className="">
            <span className="text-gray-600 text-sm">ID: {pet.id}</span>
          </div>
        </div>

        {/* Status badge */}
      </CardContent>
    </Card>
  );
}
