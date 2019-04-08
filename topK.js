var FindTopK = function(A,K){
	let mid = A[0];
	let leftArr = [];
	let rightArr = [];

	for(let i=1;i<A.length;i++){
		if(A[i] > mid){
			leftArr.push(A[i]);
		}else{
			rightArr.push(A[i]);
		}
	}

	if(leftArr.length === K){
		return leftArr;
	}else if(leftArr.length === K-1){
		return leftArr.concat(mid);
	}else if(leftArr.length < K-1){
		return leftArr.concat(mid).concat(FindTopK(rightArr, K-leftArr.length-1));
	}else{
		return FindTopK(leftArr,K);
	}
}




let A = [];
let K = 10;
let n = 100;
for(let i=0;i<n;i++){
	A.push(parseInt(10 * Math.random() * n))
}
console.log(A);
let res = FindTopK(A, 5);
console.log(res);


