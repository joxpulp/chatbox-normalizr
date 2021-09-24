import { Schema, model } from 'mongoose';
import { Messages } from './interfaces';

const messagesCollection = 'normalizemensajes';

const messagesSchema = new Schema<Messages>(
	{
		author: {
			email: { type: String, required: true, max: 100 },
			name: { type: String, required: true, max: 100 },
			lastname: { type: String, required: true, max: 100 },
			alias: { type: String, required: true, max: 100 },
			age: { type: Number, required: true },
			avatar: { type: String, required: true, max: 100 },
			date: { type: String, required: true, max: 100 },
			time: { type: String, required: true, max: 100 },
		},
		text: { type: String, required: true, max: 1000 },
	},
	{ versionKey: false }
);

export const messages = model<Messages>(messagesCollection, messagesSchema);
