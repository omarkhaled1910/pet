"use client";
import { deletePet, getPetById } from "@/app/actions/pets";
import { useSelectedPetStore } from "@/store/selectedPet";
import { useQuery } from "@tanstack/react-query";
import { ArrowBigLeft, Loader2, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
// 528970077226004900 error
const PetWrapper = ({ id }: { id: string }) => {
  const router = useRouter();
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["pet", id],
    queryFn: () => getPetById(id),
  });

  const { clientStoredPet } = useSelectedPetStore();
  console.log({ data, isLoading, error, clientStoredPet });

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-4 md:p-6">
        <header className="flex items-center gap-2 mb-6">
          <div onClick={() => router.back()}>
            <ArrowBigLeft className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold">Pet Details</h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <div className="flex gap-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-16" />
            </div>
            <Skeleton className="h-64 w-full rounded-xl" />
          </div>

          <div className="space-y-6">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <div className="flex flex-wrap gap-2">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-6 w-16 rounded-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-4 md:p-6">
        <header className="flex items-center gap-2 mb-6">
          <div onClick={() => router.back()}>
            <ArrowBigLeft className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold">Pet Details</h1>
        </header>
        <Card className="bg-destructive/10 border-destructive">
          <CardHeader>
            <CardTitle>Error Loading Pet</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-destructive">
              {"Failed to load pet details,backend issue 404 please try again"}
            </p>
            <br />
            <Button
              variant="outline"
              onClick={() => {
                refetch();
              }}
            >
              Refetch
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const pet = data || clientStoredPet;
  if (!pet) return <div>No pet data available</div>;

  const statusVariant = {
    available: "bg-green-100 text-green-800 hover:bg-green-100",
    pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
    sold: "bg-red-100 text-red-800 hover:bg-red-100",
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <header className="flex items-center justify-between gap-2 mb-6">
        <div className="flex items-center gap-2">
          <div onClick={() => router.back()}>
            <ArrowBigLeft className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold">Pet Details</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Link className="w-full h-full" href={`/pet/${id}/edit`}>
              <Pencil className="w-4 h-4" />
            </Link>
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              deletePet(id).then((res) => {
                if (res?.success && res?.message) {
                  toast.success(res.message);
                  router.push("/pet-dashboard");
                }
              });
            }}
          >
            <Trash className="w-4 h-4" />
          </Button>{" "}
        </div>{" "}
      </header>

      <Card>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
          {/* Left Column - Images */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Photos</h2>
            <div className="grid grid-cols-2 gap-4">
              {pet.photoUrls.length > 0 ? (
                pet.photoUrls.map((url, index) => (
                  <div
                    key={index}
                    className="aspect-square relative rounded-lg overflow-hidden border"
                  >
                    <Image
                      src={"/cute-happy-pup.webp"}
                      alt={`${pet.name} photo ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                ))
              ) : (
                <div className="col-span-2 flex items-center justify-center h-48 bg-gray-100 rounded-lg">
                  <p className="text-gray-500">No photos available</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">{pet.name}</h1>
              <div className="flex items-center gap-3 mt-2">
                <Badge variant="outline" className="text-base">
                  {pet.category?.name || "No category"}
                </Badge>
                <Badge className={`${statusVariant[pet.status]}`}>
                  {pet.status}
                </Badge>
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-lg font-semibold">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {pet.tags && pet.tags.length > 0 ? (
                  pet.tags.map((tag) => (
                    <Badge
                      key={tag.id}
                      variant="secondary"
                      className="px-3 py-1"
                    >
                      {tag.name}
                    </Badge>
                  ))
                ) : (
                  <p className="text-gray-500">No tags available</p>
                )}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold">About</h2>
              <div className="mt-2 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">ID</p>
                  <p className="font-medium">{pet.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <p className="font-medium capitalize">{pet.status}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Category ID</p>
                  <p className="font-medium">{pet.category?.id || "N/A"}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="mt-6 flex flex-col gap-2">
        clientStoredPet: {JSON.stringify(clientStoredPet, null, 2)}
      </div>
      <div className="mt-6">
        fetched by id {id}
        {JSON.stringify(data, null, 2)}
      </div>
    </div>
  );
};

export default PetWrapper;
