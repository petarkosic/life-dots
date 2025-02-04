import { useMemo, useState } from 'react';
import './App.css';

function App() {
	const [birthYear, setBirthYear] = useState<number>(1985);
	const [birthMonth, setBirthMonth] = useState<number>(1);
	const [timeGranularity, setTimeGranularity] = useState<'months' | 'years'>(
		'years'
	);

	const currentYear = new Date().getFullYear();
	const currentMonth = new Date().getMonth() + 1;
	const lifeGone = new Date().getFullYear() - birthYear;
	const lifeExpectancy = 80;

	const calculateMonthsLived = () => {
		const yearsDiff = currentYear - birthYear;

		if (yearsDiff === 0) {
			return Math.max(0, currentMonth - birthMonth);
		}

		const monthsDiff =
			currentMonth >= birthMonth
				? currentMonth - birthMonth
				: 12 - birthMonth + currentMonth;

		const adjustedYearsDiff =
			currentMonth >= birthMonth ? yearsDiff : yearsDiff - 1;

		return Math.max(0, adjustedYearsDiff * 12 + monthsDiff);
	};

	const calculateDots = useMemo(() => {
		switch (timeGranularity) {
			case 'months':
				{
					const monthsLived = calculateMonthsLived();
					const totalMonths = lifeExpectancy * 12;

					return Array(totalMonths).fill(0).fill(1, 0, monthsLived);
				}
				break;
			case 'years':
				{
					const yearsLived = currentYear - birthYear;

					return Array(lifeExpectancy).fill(0).fill(1, 0, yearsLived);
				}
				break;
			default:
				return Array(lifeExpectancy).fill(0).fill(1, 0, lifeGone);
		}
	}, [birthYear, birthMonth, currentYear, currentMonth, timeGranularity]);

	const getCurrentDotIndex = () => {
		switch (timeGranularity) {
			case 'years':
				return lifeGone - 1;
			case 'months':
				return calculateMonthsLived() - 1;
			default:
				return lifeGone - 1;
		}
	};

	return (
		<>
			<div
				style={{
					display: 'flex',
					gap: '1rem',
					justifyContent: 'center',
					marginBottom: '20px',
				}}
			>
				{(['years', 'months'] as const).map((granularity) => (
					<button
						key={granularity}
						onClick={() => setTimeGranularity(granularity)}
						style={{
							padding: '0.5rem 1rem',
							borderRadius: '0.4rem',
							border: 'none',
							backgroundColor:
								timeGranularity === granularity ? 'white' : 'black',
							color: timeGranularity === granularity ? 'black' : 'white',
							cursor: 'pointer',
						}}
						className={timeGranularity === granularity ? 'active' : ''}
					>
						{granularity}
					</button>
				))}
			</div>
			<div
				className='input-container'
				style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}
			>
				<input
					type='number'
					style={{
						height: '30px',
						padding: '0 0.5rem',
						border: 'none',
						borderRadius: '0.4rem',
					}}
					value={birthYear}
					name='birthYear'
					id='birthYear'
					placeholder='Birth Year'
					min={1945}
					max={new Date().getFullYear()}
					maxLength={4}
					onChange={(e) => setBirthYear(Number(e.target.value.slice(0, 4)))}
				/>
				{timeGranularity === 'months' && (
					<input
						type='number'
						style={{
							height: '30px',
							padding: '0 0.5rem',
							border: 'none',
							borderRadius: '0.4rem',
						}}
						value={birthMonth}
						name='birthMonth'
						id='birthMonth'
						placeholder='Birth Month'
						min={1}
						max={12}
						maxLength={2}
						onChange={(e) =>
							setBirthMonth(Math.max(1, Math.min(12, Number(e.target.value))))
						}
					/>
				)}
			</div>
			<p>
				{timeGranularity === 'years'
					? `${lifeGone} ${lifeGone === 1 ? 'year' : 'years'} gone.`
					: `${calculateMonthsLived()} months gone.`}
			</p>
			<p>
				{timeGranularity === 'years'
					? `${Math.round((1 - lifeGone / lifeExpectancy) * 100)}% left.`
					: `${Math.round(
							(1 - calculateMonthsLived() / (lifeExpectancy * 12)) * 100
					  )}% left.`}
			</p>
			<div className='dots'>
				{calculateDots.map((dot, i) => (
					<span
						key={i}
						className={`dot ${dot ? 'dot-filled' : 'dot-empty'} ${
							i === getCurrentDotIndex() ? 'dot-current' : ''
						}`}
					></span>
				))}
			</div>
		</>
	);
}

export default App;
