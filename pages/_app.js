/******************************************************************************
**	@Author:				Thomas Bouder <Tbouder>
**	@Email:					Tbouder@protonmail.com
**	@Date:					Thursday July 29th 2021
**	@Filename:				_app.js
******************************************************************************/

import	React						from	'react';
import	Head						from	'next/head';

import	'tailwindcss/tailwind.css';

function	App(props) {
	const	{Component, pageProps} = props;

	return (
		<>
			<Head>
				<title>{'Thomas Bouder'}</title>
				<link rel={'icon'} href={'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🛸</text></svg>'} />
				<meta httpEquiv={'X-UA-Compatible'} content={'IE=edge'} />
				<meta name={'viewport'} content={'width=device-width, initial-scale=1'} />
				<meta name={'description'} content={'Vaulti - Yearn api Proxy'} />
				<meta name={'msapplication-TileColor'} content={'#9fcc2e'} />
				<meta name={'theme-color'} content={'#ffffff'} />
				<meta charSet={'utf-8'} />
			</Head>
			<div className={'bg-dark-600 min-h-screen'}>
				<div id={'app'} className={'flex'}>
					<Component
						element={props.element}
						router={props.router}
						{...pageProps} />
				</div>
			</div>
		</>
	);
}


export default App;
