export const formatVideoTime = (seconds: number) => {
	const floored = Math.floor(seconds);
	const s = floored % 60;
	const m = Math.floor(floored / 60);

	return `${ensureDoubleDigits(m)}:${ensureDoubleDigits(s)}`;
};

const ensureDoubleDigits = (number: number) => {
	const stringified = String(number);
	const neededZeros = Math.max(0, 2 - stringified.length);
	const zeros = '0'.repeat(neededZeros);

	return `${zeros}${stringified}`;
};
