import { useState } from 'react';
import './App.css';

function App() {
	const [age, setAge] = useState<number>(1985);

	const lifeGone = new Date().getFullYear() - age!;
	const lifeExpectancy = 80;

	const dots = Array(lifeExpectancy).fill(0).fill(1, 0, lifeGone);

	return (
		<>
			<div className='input-container'>
				<input
					type='number'
					style={{
						height: '30px',
						padding: '0 0.5rem',
						border: 'none',
						borderRadius: '0.4rem',
					}}
					value={age}
					name='age'
					id='age'
					min={1945}
					max={new Date().getFullYear()}
					maxLength={4}
					onChange={(e) => setAge(Number(e.target.value.slice(0, 4)))}
				/>
			</div>
			<p>
				{lifeGone} {lifeGone === 1 ? 'year' : 'years'} gone.
			</p>
			<p>{Math.round((1 - lifeGone / lifeExpectancy) * 100) + '%'} left</p>
			<div className='dots'>
				{dots.map((dot, i) => (
					<span
						key={i}
						className={`dot ${dot ? 'dot-filled' : 'dot-empty'} ${
							i === lifeGone ? 'dot-current' : ''
						}`}
					></span>
				))}
			</div>
		</>
	);
}

export default App;
