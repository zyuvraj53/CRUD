import  supabase  from "../config/supabaseClient.js";

export const getClients = async (req, res) => {
  try {
    const { data: clients, error } = await supabase
      .from("clients_tb")
      .select("*");

    if (error) throw error;

    res.status(200).json(clients);
  } catch (err) {
    console.error("Error fetching clients:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createClient = async (req, res) => {
  try {
    const clientData = req.body;
    const { data: newClient, error } = await supabase
      .from("clients_tb")
      .insert(clientData)
      .select(); // returns the inserted rows

    if (error) throw error;

    // Supabase returns an array; if you expect a single record, return the first element.
    res.status(200).json(newClient[0]);
  } catch (err) {
    console.error("Error creating client:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateClient = async (req, res) => {
  try {
    const clientId = req.params.id;
    const clientData = req.body;
    const { data: updatedClient, error } = await supabase
      .from("clients_tb")
      .update(clientData)
      .eq("id", clientId)
      .select();

    if (error) throw error;

    if (updatedClient.length === 0) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.status(200).json(updatedClient[0]);
  } catch (err) {
    console.error("Error updating client:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteClient = async (req, res) => {
  try {
    const clientId = req.params.id;
    const { data: deletedClient, error } = await supabase
      .from("clients_tb")
      .delete()
      .eq("id", clientId)
      .select();

    if (error) throw error;

    if (deletedClient.length === 0) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.status(200).send();
  } catch (err) {
    console.error("Error deleting client:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
