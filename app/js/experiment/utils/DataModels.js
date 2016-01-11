
var dataModels = {
	rootModelURL: './models/',
	group: [
		{ 
			name: 'house'
		}
	],
	models: [
		{
			name: 'WholeHouse',
			modelURL: 'house/house.json',
			textureURL: '',
			couleur: 0xBDBDBD,
			emissive: 0x484848,
			group: 'house',
			pos: {
				x: 0,
				y: 0,
				z: 0
			},
			rot: {
				x: 0,
				y: 0,
				z: 0
			},
			sca: {
				x: 1,
				y: 1,
				z: 1
			}
		},
		{
			name: 'minHouse',
			modelURL: 'house/mini__2.json',
			textureURL: '',
			couleur: 0xBDBDBD,
			emissive: 0x484848,
			group: 'house',
			pos: {
				x: 0,
				y: 0,
				z: 0
			},
			rot: {
				x: 0,
				y: 0,
				z: 0
			},
			sca: {
				x: 1,
				y: 1,
				z: 1
			}
		}
	]
};

module.exports = dataModels;