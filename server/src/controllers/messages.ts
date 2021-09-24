import { Request, Response } from 'express';
import { getAllMessages, addMessage } from '../models/normalizer';

class MessageController {
	async getMessages(req: Request, res: Response) {
		try {
			const getMessages = await getAllMessages();

			return res.json({ messages: getMessages });
		} catch (error) {
			if (error instanceof Error) {
				let errorMessage = error.message;
				res.status(500).json({ error: errorMessage });
			}
		}
	}
	async addMessage(req: Request, res: Response) {
		try {
			const body = req.body;

			if (!body.email || !body.name || !body.lastname || !body.alias || !body.age || !body.avatar || !body.text)
				return res.status(404).json({ error: 'Body invalido' });

			const newMessage = await addMessage(body);

			return res.json({ message: newMessage });
		} catch (error) {
			if (error instanceof Error) {
				let errorMessage = error.message;
				res.status(500).json({ error: errorMessage });
			}
		}
	}
}

export const messageController = new MessageController();
