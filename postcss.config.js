module.exports = {
	plugins: [
		// eslint-disable-next-line global-require
		require('postcss-pxtorem')({
			rootValue: 37.5,
			propList: ['*'],
			selectorBlackList: ['.norem']
		})
	]
}
