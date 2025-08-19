// controllers/clientController.js

import Client from '../models/Client.js';

const clientController = {
    addClient: async (req, res) => {
        try {
            const client = new Client(req.body);
            await client.save();
            res.status(201).json(client);
        } catch (error) {
            res.status(500).json({ error: 'Failed to add client.' });
        }
    },

    getClients: async (req, res) => {
        try {
            const clients = await Client.find();
            res.json(clients);
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve clients.' });
        }
    },

    deleteClient: async (req, res) => {
        try {
            await Client.findByIdAndDelete(req.params.id);
            res.json({ message: 'Client deleted' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete client.' });
        }
    }
};

export default clientController;
