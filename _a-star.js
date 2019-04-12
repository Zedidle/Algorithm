let BinaryTree = require("./BinaryTree.js");

let aStarSearch = function(map, start, end){
	let close = {
		_data:{},
		add(y,x){
			if(!this._data[y]){
				this._data[y] = {};
			}
			this._data[y][x] = true;
		},
		inClose(y, x){
			if(this._data[y]){
				return this._data[y][x];
			}else{
				return false;
			}
		}
	};
	let open = {
		estimateTree: new BinaryTree([]).make();,
		_data:{},
		inOpen(toStart, y, x){
			let estimateVal = toStart + getDistanceToEnd(y,x);
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
		}
		add(toStart, y, x){
			let toEnd = getDistanceToEnd(y, x);
			let estimateVal = toStart　+ toEnd;

			let inOpen = false;
			if(this._data[estimateVal]){
				let e = this._data[estimateVal];
				for(let i=0;i<e.length;i++){
					if(e[i].y === y && e[i].x === x){
						inOpen = true;
						break;
					}
				}
			}

			if(!inOpen){
				this.estimateValTree.insertNode(estimateVal);
				if(!this._data[estimateVal]){
					this._data[estimateVal] = [];
				}
				this._data[estimateVal].push({
					y,x,toStart,toEnd
				});
			}
		},
		delete(estimateVal, y, x){
			if(this._data[estimateVal]){
				let e = this._data[estimateVal];
				if(y && x){
					for(let i=0;i<e.length;i++){
						if(e[i].y === y && e[i].x === x){
							e.splice(i,1);
							break;
						}
					}
				}else{
					e.pop();					
				}

				if(this._data[estimateVal].length === 0){
					this.estimateTree.removeNode(estimateVal);
				}

			}
		},
		getMinEstimate(){
			let minEstimate = this.estimateTree.getMin();
			let estimateList = this._data[minEstimate.val];
			return estimateList[estimateList.length-1];
		},

	};

	let Dot = function(toStart, y, x, pre, next){
		this.y = y;
		this.x = x;
		this.pre = pre;
		this.next = next;
		this.toStart = toStart;
		this.toEnd = getDistanceToEnd(start.y, start.x);

		checkOpen(y,x){
			if(map[y-1] && map[y-1][x]){ // up
				open.add(1, y-1, x, );
			}
			if(map[y] && map[y][x+1]){ // right
				open.add(y, x+1, 1);
			}
			if(map[y+1] && map[y+1][x]){ // down
				open.add(y+1, x, 1);
			}
			if(map[y] && map[y][x-1]){ // left
				open.add(y, x-1, 1);
			}
		}
	};



	let curDot = new Dot(0, start.y, start.x, null, null);
	while(curDot.estimateVal > 0){	

	}



	function getDistanceToEnd(y,x){
		return Math.abs(x-end.x) + Math.abs(y-end.y);
	}
}