import toast from "react-hot-toast";
import { ICabin } from "../utils/schemas";
import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function deleteCabin(id: number) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
}

export async function createEditCabin(newCabin: ICabin, id?: number) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Create/Edit cabin
  let query;

  // A) CREATE
  if (!id)
    query = supabase.from("cabins").insert([{ ...newCabin, image: imagePath }]);
  else
    query = supabase
      .from("cabins")
      .update({ ...newCabin, image: imagePath })
      .eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    toast.error("Cabin could not be created");
    throw new Error("Cabin could not be created");
  }

  if (!data || data.length === 0) {
    toast.error("No data returned after cabin creation");
    throw new Error("No data returned after cabin creation");
  }

  if (hasImagePath) return data;

  // 2. Upload image
  const cabin = data[0];
  const file = new File([newCabin.image], imageName);

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, file);

  if (storageError) {
    if (cabin.id) await supabase.from("cabins").delete().eq("id", cabin.id);
    console.error(storageError);
    toast.error(
      "Cabin image could not be uploaded therefore cabin was not created"
    );
    throw new Error(
      "Cabin image could not be uploaded therefore cabin was not created"
    );
  }

  return data;
}
