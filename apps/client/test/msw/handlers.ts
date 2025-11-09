import { HttpResponse, http } from 'msw';

const tickets = [
  { _id: '1', projectId: 'p1', boardId: 'b1', title: 'Boot app', status: 'todo', order: 0 },
  { _id: '2', projectId: 'p1', boardId: 'b1', title: 'Setup CI', status: 'inprogress', order: 0 },
];

export const handlers = [http.get('/api/tickets', () => HttpResponse.json(tickets))];
