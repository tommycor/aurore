
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
			material: 'MeshLambertMaterial',
			textureURL: '',
			color: 0xBDBDBD,
			emissive: 0x484848,
			wireframe: false,
			visible: true,
			group: 'house',
			position: {
				x: 0,
				y: 0,
				z: 0
			},
			rotation: {
				x: 0,
				y: 0,
				z: 0
			},
			scale: {
				x: 1,
				y: 1,
				z: 1
			}
		},
		{
			name: 'HouseMin',
			modelURL: 'house/mini__2.json',
			material: 'MeshNormalMaterial',
			textureURL: '',
			color: 0xBDBDBD,
			emissive: 0x484848,
			wireframe: false,
			visible: false,
			group: 'house',
			position: {
				x: 0,
				y: 0,
				z: 0
			},
			rotation: {
				x: 0,
				y: 0,
				z: 0
			},
			scale: {
				x: 1,
				y: 1,
				z: 1
			}
		}
	]
};

module.exports = dataModels;