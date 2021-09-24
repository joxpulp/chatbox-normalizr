import * as http from 'http';
import { Server } from 'socket.io';
import { getAllMessages, addMessage } from '../models/normalizer';

// Socket Server
export const ioServer = (server: http.Server) => {
	const io = new Server(server);
	io.on('connection', async (socket) => {
		console.log('Client Connected');

		try {

			socket.on('sendMessage', async (message) => {
				try {
					await addMessage(message);
					console.log(message)
				} catch (error) {
					console.log(error);
				}
				io.emit('messages', await getAllMessages());
			});

			socket.emit('messages', await getAllMessages());
		} catch (error) {
			console.log(error);
		}
	});

	return io;
};
