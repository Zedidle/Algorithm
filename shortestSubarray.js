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
    //存储0----i,有可能是符合条件的最短子串的head
    let deque = [];
    for(let i=0;i<size+1;i++){
		
    	while(deque.length > 0 && (sums[i] - sums[deque[0]] >= K)){
            // i 递增
            // 可能有 j>i 使得 sums[j] - sums[deque[0]] >= K
            // 但是由于 j>i,所以deque[0]---i是以deque[0]作为头的最短的符合条件的子串
            // 把 deque[0] 删除
    		res = Math.min(res, i-deque[0]);
    		deque.shift();

    	}
    	while(deque.length > 0 && (sums[i] <= sums[deque[deque.length-1]])){
            // 如果存在 j>i>deque[r] 使得 sums[j] - sums[deque[r]] >= K
            // 由于 sums[deque[r]] >= sums[i] 则
            // sums[j] - sums[i] >= K 一定成立，并且 j-i < j-deque[r]
            // 所以，以deque[r]作为头,不可能是最短的符合条件子串,删除
    		deque.pop();
    		
    	}
    	deque.push(i);
    	// console.log(sums[i], sums[deque[0]], sums[deque[deque.length-1]])
		// console.log("\n\n")
	 //    console.log("sums",sums);
		// console.log("res:",res)
		// console.log("i:",i, ",sums[i]:",sums[i]);
		// console.log("deque:",deque)
		// console.log("deque[0]:",deque[0],",sums[deque[0]]:",sums[deque[0]]);
		// console.log("deque[deque.length-1]:",deque[deque.length-1],",sums[deque[deque.length-1]]:",sums[deque[deque.length-1]]);
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