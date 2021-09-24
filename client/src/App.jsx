import React from 'react';
import { motion } from 'framer-motion';
import ChatBox from './components/chatbox/ChatBox';

function App() {
	return (
		<motion.div
			style={{ height: '100%' }}
			className='d-flex flex-column
			justify-content-center align-items-center'
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
		>
			<motion.h1
				initial={{ opacity: 0, y: '-100%'}}
				animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
				className='text-center my-4 text-light'
			>
				Bienvenido al centro de mensajes
			</motion.h1>
			<hr style={{ backgroundColor: 'white', width: '80%' }} />
			<ChatBox />
		</motion.div>
	);
}

export default App;
