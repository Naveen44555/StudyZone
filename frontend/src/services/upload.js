import { supabase } from "./supabaseClient";

export async function uploadMaterial(file) {
  const fileName = `${Date.now()}-${file.name}`;

  const { error } = await supabase
    .storage
    .from("materials")
    .upload(fileName, file);

  if (error) throw error;

  const { data } = supabase
    .storage
    .from("materials")
    .getPublicUrl(fileName);

  return data.publicUrl;
}
