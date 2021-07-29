/******************************************************************************
**	@Author:				Thomas Bouder <Tbouder>
**	@Email:					Tbouder@protonmail.com
**	@Date:					Monday January 4th 2021
**	@Filename:				index.js
******************************************************************************/

import	React, {useEffect, useState, useRef}					from	'react';


function	Index() {
	const	lottieRef = useRef(null);

	useEffect(() => {
		import('@lottiefiles/lottie-player');
	});

	return (
		<main className={''}>
			<div className={'w-full absolute inset-0 h-full'}>
				<lottie-player
					ref={lottieRef}
					autoplay
					loop
					mode={'normal'}
					src={'/major.json'}
					className={'absolute inset-0 w-full h-full object-cover'}/>
			</div>
		</main>
	);
}

export default Index;
