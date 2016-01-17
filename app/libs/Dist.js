function dist(pos1, pos2) {

	//DistanceAxeX = (Xa - Xb)
	var distX = pos1.x - pos2.x;
	var distY = pos1.y - pos2.y;
	var distZ = pos1.z - pos2.z;

	//Distance = racine((Xa - Xb)² + (Ya - Yb)²)
	return dist = Math.round(Math.sqrt(distX*distX + distY*distY + distZ*distZ));

}