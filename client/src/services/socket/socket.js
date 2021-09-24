import io from 'socket.io-client';

export const socket = io('https://desafio23.herokuapp.com/', {
	transports: ['websocket'],
});
