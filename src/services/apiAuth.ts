import supabase, { supabaseUrl } from "./supabase";
import { ILogin, ISignup, IUser } from "../utils/schemas";

export async function signup({ fullName, password, email }: ISignup) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function login({ email, password }: ILogin) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  console.log(data);

  if (error) throw new Error(error.message);

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function updateCurrentUser({ password, fullName, avatar }: IUser) {
  // Update password or fullName
  let updatedData = null;
  if (password) updatedData = { password };
  if (fullName) updatedData = { data: { fullName } };
  const { data, error } = await supabase.auth.updateUser(
    updatedData as { password: string } | { data: { fullName: string } }
  );

  if (error) throw new Error(error.message);

  if (!avatar) return data;

  // Upload avatar image
  const fileName = `avatar-${data?.user ? data?.user.id : fullName?.length ?? password?.length}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);

  // Update avatar in the user
  const { data: updatedUser, error: errorAvatarUpdate } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });

  if (errorAvatarUpdate) throw new Error(errorAvatarUpdate.message);

  return updatedUser;
}
