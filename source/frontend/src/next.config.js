module.exports = {
	async redirects() {
	  return [
	    {
		 source: '/',
		 destination: '/all',
		 permanent: false,
	    },
	  ];
	},
	compiler: {
		// Enables the styled-components SWC transform
		styledComponents: true
	}
};