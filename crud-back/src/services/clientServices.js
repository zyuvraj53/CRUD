import { supabase } from "../config/supabaseClient.js";

export const getClients = async () => {
  const { data: clients, error } = await supabase
    .from("clients_tb")
    .select("*");

  if (error) {
    throw error;
  }

  return clients;
};

export const createClient = async (clientData) => {
  // Destructure your clientData. Note that your database column is "isactive" (all lowercase).
  const { name, email, job, rate, isActive } = clientData;

  const { data: newClient, error } = await supabase
    .from("clients_tb")
    .insert([{ name, email, job, rate, isactive: isActive }])
    .select(); // Returns the inserted rows

  if (error) {
    throw error;
  }

  // Supabase returns an array; return the first (and only) record.
  return newClient[0];
};

export const updateClient = async (clientId, clientData) => {
  const { name, email, job, rate, isActive } = clientData;

  const { data: updatedClient, error } = await supabase
    .from("clients_tb")
    .update({ name, email, job, rate, isactive: isActive })
    .eq("id", clientId)
    .select();

  if (error) {
    throw error;
  }

  // If no row was updated, updatedClient will be an empty array.
  return updatedClient[0];
};

export const deleteClient = async (clientId) => {
  const { data: deletedClient, error } = await supabase
    .from("clients_tb")
    .delete()
    .eq("id", clientId)
    .select();

  if (error) {
    throw error;
  }

  // Return true if a client was deleted, otherwise false.
  return deletedClient.length > 0;
};
