/**
 * @param {number[]} A
 * @param {number} K
 * @return {number}
 */
var shortestSubarray = function(A, K) {
    let size = A.length;
    let sums = [0];
    for(let i=0;i<size;i++){
    	if(A[i] >= K) return 1;
    	sums[i+1] = sums[i] + A[i];
    }

    let res = size + 1;
    let deque = [];
    for(let i=0;i<size+1;i++){
		
    	while(deque.length > 0 && (sums[i] - sums[deque[0]] >= K)){
    		res = Math.min(res, i-deque[0]);
    		deque.shift();

    	}
    	while(deque.length > 0 && (sums[i] <= sums[deque[deque.length-1]])){
    		deque.pop();
    		
    	}
    	deque.push(i);
    	// console.log(sums[i], sums[deque[0]], sums[deque[deque.length-1]])
		console.log("\n\n")
	    console.log("sums",sums);
		console.log("res:",res)
		console.log("i:",i, ",sums[i]:",sums[i]);
		console.log("deque:",deque)
		console.log("deque[0]:",deque[0],",sums[deque[0]]:",sums[deque[0]]);
		console.log("deque[deque.length-1]:",deque[deque.length-1],",sums[deque[deque.length-1]]:",sums[deque[deque.length-1]]);
    }

    if(res == size+1){
    	return - 1;
    }

    return res;
};

let A = [465,16,105,167,673,-470,867,-223,-122,980,77];
let K = 1000;

console.time("shortestSubarray");
console.log(shortestSubarray(A,K))
console.timeEnd("shortestSubarray");