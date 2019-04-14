let BinaryTree = require("./binaryTree.js");

let map = [
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
];

let start = {
	y:6,
	x:4
};
let end = {
	y:6,
	x:18
};

let aStarSearch = function(map, start, end){
	console.log("aStarSearch")
	let close = {
		_data:{},
		contain(y, x){
			/*
				params
					y Number
					x Number
				return Boolean
			 */
			if(this._data[y]){
				return this._data[y][x];
			}else{
				return false;
			}
		},
		add(y, x){
			/*
				params
					y Number
					x Number
				return undefined
			 */
			if(!this._data[y]){
				this._data[y] = {};
			}
			this._data[y][x] = true;
			map[y][x] = 3;
		},
	};
	let open = {
		estimateTree: new BinaryTree([getDisToEnd(start.y, start.x)]).make(),
		_data:{},

		contain(toStart, y, x){
			/*
				params
					toStart Number
					y Number
					x Number
				return Boolean
			 */
			// console.log("open.contain", this._data)
			let estimateVal = toStart + getDisToEnd(y,x);
			if(this._data[estimateVal]){
				let e = this._data[estimateVal];
				for(let i=0;i<e.length;i++){
					if(e[i].y === y && e[i].x === x){
						return true;
					}
				}
				return false;
			}else{
				return false;
			}
		},
		add(toStart, y, x, pre){
			/*
				params
					toStart Number
					y Number
					x Number
					pre {
						toStart, y, x, pre
					}
				return Boolean
			 */
			// console.log("open.add",...arguments)
			if(this.contain(toStart, y, x)){
				return false;
			}else{
				// console.log("open.add success",...arguments)
				map[y][x] = 2;
				let estimateVal = toStart　+ getDisToEnd(y, x);
				this.estimateTree.insertNode(estimateVal);
				if(!this._data[estimateVal]){
					this._data[estimateVal] = [];
				}
				let dot = { toStart, y, x, pre };
				this._data[estimateVal].push(dot);
				return dot;
			}
		},
		sub(estimateVal){
			/*
				params
					estimateVal Number
				return undefined	
			 */
			if(this._data[estimateVal].length > 0){
				if(this._data[estimateVal].length === 1){
					this.estimateTree.removeNode(estimateVal);
				}
				return this._data[estimateVal].pop();
				// let e = this._data[estimateVal];
				// if(y && x){
				// 	for(let i=0;i<e.length;i++){
				// 		if(e[i].y === y && e[i].x === x){
				// 			e.splice(i,1);
				// 			break;
				// 		}
				// 	}
				// }else{
				// 	e.pop();					
				// }
			}
		},
		check(cur){
			/*
				params 
					cur {
						toStart, y, x, pre
					}
				return undifined
			 */
			// console.log("open.check cur",cur,this._data)
			let {toStart, y, x, pre} = cur;
			// console.log(map[y-1][x], !close.contain(y-1,x), !isObstacle(y-1, x))
			// console.log(map[y][x+1], !close.contain(y,x+1), !isObstacle(y, x+1))
			// console.log(map[y+1][x], !close.contain(y+1,x), !isObstacle(y+1, x))
			// console.log(map[y][x-1], !close.contain(y,x-1), !isObstacle(y, x-1))
			if(!close.contain(y-1, x) && !isObstacle(y-1, x)){ // up
				open.add(toStart+1, y-1, x, cur);
			}
			if(!close.contain(y, x+1) && !isObstacle(y, x+1)){ // right
				open.add(toStart+1, y, x+1, cur);
			}
			if(!close.contain(y+1, x) && !isObstacle(y+1, x)){ // down
				open.add(toStart+1, y+1, x, cur);
			}
			if(!close.contain(y, x-1) && !isObstacle(y, x-1)){ // left
				open.add(toStart+1, y, x-1, cur);
			}
		},
		getMinEstimate(){
			/*
				params void
				return {
					y, x, toStart, pre
				}
			*/
			// console.log("open.getMinEstimate")
			let minEstimateNode = this.estimateTree.getMin();
			// console.log(minEstimateNode.val);
			// console.log(this._data[minEstimateNode.val]);
			// console.log(this._data);
			// let estimateList = this._data[minEstimateNode.val];
			// return estimateList.pop();
			return this.sub(minEstimateNode.val);
		},
	};

	// let Dot = function(toStart, y, x, pre){
	// 	this.toStart = toStart;
	// 	this.y = y;
	// 	this.x = x;
	// 	this.pre = pre;

	// 	addOpen(){
	// 		if(map[y-1] && map[y-1][x] && !close.contain(y-1, x)){ // up
	// 			open.add(toStart+1, y-1, x, this)
	// 		}
	// 		if(map[y] && map[y][x+1] && !close.contain(y, x+1)){ // right
	// 			open.add(toStart+1, y, x+1, this);
	// 		}
	// 		if(map[y+1] && map[y+1][x] && !close.contain(y+1, x)){ // down
	// 			open.add(toStart+1, y+1, x, this);
	// 		}
	// 		if(map[y] && map[y][x-1] && !close.contain(y, x-1)){ // left
	// 			open.add(toStart+1, y, x-1, this);
	// 		}
	// 	}
	// };

	let cur = open.add(0, start.y, start.x, null);
	(function lambda(){
		if(getDisToEnd(cur.y, cur.x) > 0){
			showMap();
			console.log(cur.y, cur.x)
			close.add(cur.y, cur.x);
			open.check(cur);
			cur = open.getMinEstimate();
			setTimeout(lambda, 100);
		}else{
			while(cur){
				map[cur.y][cur.x] = "*";
				cur = cur.pre;
			}
			showMap();
		}
	})();

	function showMap(){
		console.clear();
		let string = "";
		for(let y=0;y<map.length;y++){
			for(let x=0;x<map[y].length;x++){
				string += map[y][x]+" ";
			}
			string += "\n";
		}
		console.log(string);
	}

	function isObstacle(y, x){
		if(map[y]){
			if(map[y][x]===0){
				return false;
			}else{
				return true;
			}
		}else{
			return true;
		}
	}

	function getDisToEnd(y,x){
		return Math.abs(x-end.x) + Math.abs(y-end.y);
	}
};

aStarSearch(map, start, end);


