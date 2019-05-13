var polygonFilling = function( vertices ) {
	
	// "global" variables
	var verticesCount = vertices.length,
		edgesEntered,
		// table cols
		yMax, yMin, xInt, invNegSlope;
		
// *************************

    // 多边形坐标数组长度小于4，不是多边形
	if( verticesCount <= 4 ) {
		console.error( 'polygon has insuffient number of vertices' );
		return;
    }
    // 多边形坐标数组长度为奇数，错误
	if( verticesCount % 2 !== 0 ) {
		console.error( 'polygon has an incorrect number of vertices' );
		return;
	}

    // find out table length
    // y1:数组最后一个元素
	var y1 = Math.round( vertices[verticesCount-1] ), y2,
		i;

    // 顶点个数    
	edgesEntered = 0;
	for( i = 1; i < verticesCount; i += 2 ) {
        // y2纵坐标
		y2 = Math.round( vertices[i] );
		if( y1 !== y2 ) {
			y1 = y2;
			edgesEntered++;
		}
    }
    // 顶点数小于2，非多边形
	if( edgesEntered < 2 ) {
		console.error( 'malformed polygon' );
		return;
	}
	
    // setup table length
    // arraybuffer 视图 根据顶点个数
	xInt = new Float64Array( edgesEntered );
	yMin = new Uint32Array( edgesEntered );
	yMax = new Uint32Array( edgesEntered );
	invNegSlope = new Float64Array( edgesEntered );
	
// *************************
	
	var insertTableEntry = function( x1,y1, x2,y2, edgesEntered ) {
		var biggerY = Math.max( y1, y2 ),
			i = edgesEntered;
		for( ; i !== 0 && yMax[i-1] < biggerY; i-- ) { // insertion sort mechanism
			// shift elements to right
			yMax[i] = yMax[i-1];
			yMin[i] = yMin[i-1];
			xInt[i] = xInt[i-1];
			invNegSlope[i] = invNegSlope[i-1];
		}
		yMax[i] = biggerY;
		invNegSlope[i] = -(x2-x1)/(y2-y1);
		if( biggerY === y1 ) {
			yMin[i] = y2;
			xInt[i] = x1;
		} else {
			yMin[i] = y1;
			xInt[i] = x2;
		}
	};
	
	var x1 = Math.round( vertices[verticesCount-2] ),
		y1 = Math.round( vertices[verticesCount-1] ),
		x2, y2,
		i;

	edgesEntered = 0;
	for( i = 0; i < verticesCount; i += 2 ) {
		x2 = Math.round( vertices[i] );
		y2 = Math.round( vertices[i+1] );
		if( y1 !== y2 ) { // avoid horizontal edges
			insertTableEntry( x1,y1, x2,y2, edgesEntered );
			edgesEntered++;
		}
		x1 = x2;
		y1 = y2;
	}
	
// *************************
	
	// helpers functions	
	var exclude = function( leftMostEdge, rightMostEdge, scan ) {
		var i, j;
		for( i = leftMostEdge; i <= rightMostEdge; i++ ) {
			if( yMin[i] > scan ) {
				leftMostEdge++;
				for( j = i; j >= leftMostEdge; j-- ) {
					// shift elements to right
					yMin[j] = yMin[j-1];
					xInt[j] = xInt[j-1];
					invNegSlope[j] = invNegSlope[j-1];
				}
			}
		}
		return leftMostEdge;
	};
	
	var updateXInt = function( leftMostEdge, rightMostEdge ) {
		for( var i = leftMostEdge; i <= rightMostEdge; i++ ) {
			xInt[i] += invNegSlope[i];
		}
	};
	
	var include = function( rightMostEdge, scan, edgesEntered ) {
		for( ; rightMostEdge + 1 < edgesEntered && yMax[rightMostEdge + 1] > scan; rightMostEdge++ );
		return rightMostEdge;
	};
	
	var sortXInt = function( leftMostEdge, rightMostEdge ) { // bubble sort mechanism
		var i, j, tmp;
		for( i = leftMostEdge; i <= rightMostEdge - 1; i++ ) {
			for( j = i + 1; j <= rightMostEdge; j++ ) {
				if( xInt[i] > xInt[j] ) {
					tmp = yMin[i];
					yMin[i] = yMin[j];
					yMin[j] = tmp;
					tmp = xInt[i];
					xInt[i] = xInt[j];
					xInt[j] = tmp;
					tmp = invNegSlope[i];
					invNegSlope[i] = invNegSlope[j];
					invNegSlope[j] = tmp;
				}
			}
		}
	};
	
	var fillScan = function( leftMostEdge, rightMostEdge, scan ) {
		var x1, x2, i;
		for( i = leftMostEdge; i <= rightMostEdge; i += 2 ) {
			x1 = Math.round( xInt[i] );
			x2 = Math.round( xInt[i+1] );
			// console.log( 'drawing line from', x1, 'to', x2, 'at y =', scan );
			for( ; x1 <= x2; x1++ ) {
                // plot pixel (x1,scan)
                new Point(x1, scan).draw();
			}
		}
	};
	
// *************************

	// start filling
	var scan = yMax[0],
		leftMostEdge = 0,
		rightMostEdge = -1;

	while( leftMostEdge < edgesEntered ) {
		scan--;
		leftMostEdge = exclude( leftMostEdge, rightMostEdge, scan );
		updateXInt( leftMostEdge, rightMostEdge );
		rightMostEdge = include( rightMostEdge, scan, edgesEntered );
		sortXInt( leftMostEdge, rightMostEdge );
		fillScan( leftMostEdge, rightMostEdge, scan );
	}
};

/*var vertices = new Float64Array( [
	3,8,
	6,3,
	1,1
] );*/