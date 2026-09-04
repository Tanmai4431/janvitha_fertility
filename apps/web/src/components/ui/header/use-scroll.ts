'use client';
import React from 'react';

export function useScroll(threshold: number = 50) {
	const [scrolled, setScrolled] = React.useState(false);

	const onScroll = React.useCallback(() => {
		const currentScroll = window.scrollY;
		const upperThreshold = Math.max(threshold, 60);
		const lowerThreshold = 20;

		setScrolled((prev) => {
			if (!prev && currentScroll > upperThreshold) {
				return true;
			}
			if (prev && currentScroll < lowerThreshold) {
				return false;
			}
			return prev;
		});
	}, [threshold]);

	React.useEffect(() => {
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, [onScroll]);

	React.useEffect(() => {
		onScroll();
	}, [onScroll]);

	return scrolled;
}
