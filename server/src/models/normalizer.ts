import { normalize, schema, denormalize } from 'normalizr';
import { messages } from './messageschema';
import { Messages } from './interfaces';

const author = new schema.Entity('author', {}, { idAttribute: 'email' });
const msg: schema.Entity<Messages> = new schema.Entity(
	'message',
	{ author: author },
	{ idAttribute: '_id' }
);

const msgSchema = new schema.Array<Messages>(msg);

export const getAllMessages = async () => {
	const messagesMap: Messages[] = (await messages.find()).map((msg) => ({
		_id: msg._id,
		author: msg.author,
		text: msg.text,
	}));

	let normalizedMessages = normalize(messagesMap, msgSchema);

	return normalizedMessages;
};

export const addMessage = async (msg: schema.Entity<Messages>) => {
	const msgs = new messages(msg);
	const newMessage = await msgs.save();
	return newMessage;
};
