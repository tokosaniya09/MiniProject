import { createServer } from 'http';
import next from 'next';
import { setupSocket } from './socket-server.js';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = createServer((req, res) => {
        handle(req, res);
    });

    setupSocket(server);

    const PORT = process.env.PORT || 3002;

    server.listen(PORT, () => {
        console.log(`> Ready on http://localhost:${PORT}`);
        console.log(`> Socket server running on http://localhost:${PORT}http://localhost:5000/api/socket`);
    });
});