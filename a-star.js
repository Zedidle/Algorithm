let BinaryTree = require("BinaryTree");


let aStarSearch = function(map, start, end){
	let close = {
		_data:{},
		add(y,x){
			if(!this._data[y]){
				this._data[y] = {};
			}
			this._data[y][x] = true;
		}
	};
	let open = {
		estimateTree: new BinaryTree([]).make();,
		_data:{},
		add(y, x, toStart){
			let toEnd = getDistanceToEnd(y, x);
			let estimate = toStart　+ toEnd;
			if(!this.estimateTree.val){
				this.estimateTree.val = estimate;
			}else{
				if(this.estimateTree.val < )
			}
			if(!this._data[estimate]){
				this._data[estimate] = [];
			}
			this._data[estimate].push({
				y,x,toStart,toEnd
			})
		},
		delete(y, x, estimate){
			if(this._data[estimate]){
				let e = this._data[estimate];
				for(let i=0;i<e.length;i++){
					if(e[i].y === y && e[i].x === x){
						e.splice(i,1);
						break;
					}
				}

			}
		}
	};

	if(map[start.y-1] && map[start.y-1][x]){ // up
		open.push({
			x: x,
			y: start.y-1,
			toStart: 1,
			toEnd: getDistanceToEnd(x, start.y-1)
		});
	}
	if(map[start.y] && map[start.y][x+1]){ // right
		open.push({
			x: x+1,
			y: start.y,
			toStart: 1,
			toEnd: getDistanceToEnd(x+1, start.y)
		})
	}
	if(map[start.y+1] && map[start.y+1][x]){ // down
		open.push({
			x: x,
			y: start.y+1,
			toStart: 1,
			toEnd: getDistanceToEnd(x, start.y+1)
		})
	}
	if(map[start.y] && map[start.y][x-1]){ // left
		open.push({
			x: x-1,
			y: start.y,
			toStart: 1,
			toEnd: getDistanceToEnd(x-1, start.y)
		})
	}











	function getDistanceToEnd(y,x){
		return Math.abs(x-end.x) + Math.abs(y-end.y);
	}
}