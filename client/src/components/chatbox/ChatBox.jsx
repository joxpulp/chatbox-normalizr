import React, { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import { socket } from '../../services/socket/socket';
import { motion } from 'framer-motion';
import { denormalize, schema } from 'normalizr';

function ChatBox() {
	const [email, setEmail] = useState('');
	const [name, setName] = useState('');
	const [lastname, setLastName] = useState('');
	const [age, setAge] = useState('');
	const [alias, setAlias] = useState('');
	const [avatar, setAvatar] = useState('');
	const [text, setText] = useState('');
	const [messages, setMessages] = useState([]);
	const [messagesDenor, setMessagesDenor] = useState(undefined);

	const chatBox = useRef(null);

	const author = new schema.Entity('author', {}, { idAttribute: 'email' });
	const msg = new schema.Entity(
		'message',
		{ author: author },
		{ idAttribute: '_id' }
	);
	const msgSchema = new schema.Array(msg);
	const denormalizeData = denormalize(
		messages.result,
		msgSchema,
		messages.entities
	);
	console.log(messagesDenor);

	const sendMessage = (e) => {
		e.preventDefault();
		socket.emit('sendMessage', {
			author: {
				email,
				name,
				lastname,
				age,
				alias,
				avatar,
				date: dayjs().format('DD/MM/YYYY'),
				time: dayjs().format('HH:mm:ss'),
			},
			text,
		});
		setText('');
	};

	useEffect(() => {
		setMessagesDenor(
			denormalize(messages.result, msgSchema, messages.entities)
		);
	}, [messages]);

	useEffect(() => {
		socket.on('messages', (data) => {
			setMessages(data);
			chatBox.current.scrollTop = chatBox.current.scrollHeight;
		});
		return () => {
			socket.off('messages');
		};
	}, [messages]);

	return (
		<div className='container'>
			<h2 className='text-center mb-4 text-light'>Centro de Mensajes</h2>
			<form onSubmit={sendMessage}>
				<div className='container d-flex flex-column flex-lg-row justify-content-center'>
					<div className='form-floating me-2 mb-3'>
						<input
							type='email'
							className='form-control'
							id='email'
							name='email'
							placeholder='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
						<label htmlFor='email'>Correo Electronico</label>
					</div>
					<div className='form-floating me-2 mb-3'>
						<input
							type='text'
							className='form-control'
							id='name'
							name='name'
							placeholder='name'
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
						/>
						<label htmlFor='name'>Nombre</label>
					</div>
					<div className='form-floating me-2 mb-3'>
						<input
							type='text'
							className='form-control'
							id='lastname'
							name='lastname'
							placeholder='lastname'
							value={lastname}
							onChange={(e) => setLastName(e.target.value)}
							required
						/>
						<label htmlFor='lastname'>Apellido</label>
					</div>
					<div className='form-floating me-2 mb-3'>
						<input
							type='number'
							className='form-control'
							id='age'
							name='age'
							placeholder='age'
							value={age}
							onChange={(e) => setAge(e.target.value)}
							required
						/>
						<label htmlFor='age'>Edad</label>
					</div>
					<div className='form-floating me-2 mb-3'>
						<input
							type='text'
							className='form-control'
							id='alias'
							name='alias'
							placeholder='alias'
							value={alias}
							onChange={(e) => setAlias(e.target.value)}
							required
						/>
						<label htmlFor='alias'>Alias</label>
					</div>
					<div className='form-floating me-2 mb-3'>
						<input
							type='text'
							className='form-control'
							id='avatar'
							name='avatar'
							placeholder='avatar'
							value={avatar}
							onChange={(e) => setAvatar(e.target.value)}
							required
						/>
						<label htmlFor='avatar'>Avatar</label>
					</div>
				</div>
				<hr style={{ backgroundColor: 'white' }} />
				<div
					style={{
						width: '80%',
						height: '400px',
						borderRadius: '5px',
						overflowY: 'scroll',
						overflowX: 'hidden',
					}}
					className='container bg-light p-3'
					ref={chatBox}
				>
					{messagesDenor !== undefined &&
						messagesDenor.map((amessage, index) => (
							<motion.div
								initial={{ opacity: 0, x: '-100%' }}
								animate={{ opacity: 1, x: 0 }}
								className='container d-flex flex-column flex-lg-row align-items-lg-center'
								key={index}
							>
								<img
									src={amessage.author.avatar}
									style={{ width: '48px', height: 'auto' }}
									className='me-2'
								/>
								<p className='me-2 mb-lg-0 text-primary'>
									{amessage.author.email}
								</p>
								<p className='me-2 mb-lg-0 text-danger'>
									[{amessage.author.date} {amessage.author.time}]:
								</p>
								<p className='me-2 mb-lg-0 text-success'>{amessage.text}</p>
								<hr style={{ backgroundColor: 'black' }} />
							</motion.div>
						))}
				</div>
				<div
					style={{ width: '80%' }}
					className='form-floating mx-auto my-2 d-flex'
				>
					<input
						type='text'
						className='form-control'
						id='text'
						name='text'
						placeholder='text'
						value={text}
						disabled={
							!/^[\a-z0-9._-]+@{1}[\\a-z0-9.]+\.[a-z]{2,3}$/.test(email)
						}
						onChange={(e) => setText(e.target.value)}
						onKeyUp={(e) => e.key === 'Enter' && sendMessage()}
						required
					/>
					<label htmlFor='text'>Mensaje</label>
					<button
						className='btn btn-success ms-2'
						disabled={
							!/^[\a-z0-9._-]+@{1}[\\a-z0-9.]+\.[a-z]{2,3}$/.test(email)
						}
						type='submit'
					>
						Enviar
					</button>
				</div>
			</form>
		</div>
	);
}

export default ChatBox;
