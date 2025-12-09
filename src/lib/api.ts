import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getTickets = async (params?: { status?: string; priority?: string }) => {
  const response = await api.get('/tickets', { params });
  return response.data;
};

export const getTicket = async (id: string) => {
  const response = await api.get(`/tickets/${id}`);
  return response.data;
};

export const createTicket = async (data: { title: string; description: string; priority: string }) => {
  const response = await api.post('/tickets', data);
  return response.data;
};

export const updateTicket = async (id: string, data: { status?: string; priority?: string; assignedTo?: string }) => {
  const response = await api.put(`/tickets/${id}`, data);
  return response.data;
};

export const getComments = async (ticketId: string) => {
  const response = await api.get('/comments', { params: { ticketId } });
  return response.data;
};

export const createComment = async (ticketId: string, message: string) => {
  const response = await api.post('/comments', { ticketId, message });
  return response.data;
};

export const getAgentStats = async () => {
  const response = await api.get('/reports/agent-stats');
  return response.data;
};

export const deleteTicket = async (id: string) => {
  const response = await api.delete(`/tickets/${id}`);
  return response.data;
};

export const getAgents = async () => {
  const response = await api.get('/agents');
  return response.data;
};

export default api;
