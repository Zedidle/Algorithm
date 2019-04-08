// 给定一个整数 n ，你需要找到与它最近的回文数（不包括自身）。
// “最近的”定义为两个整数差的绝对值最小。

// 示例 1:
// 输入: "123"
// 输出: "121"

// 注意:
// n 是由字符串表示的正整数，其长度不超过18。
// 如果有多个结果，返回最小的那个。

/**
 * @param {string} n
 * @return {string}
 */

// 提示：
// 1. Number类型无法准确表示长度超过 15 的数（会对其后的数进行四舍五入），应该用数组操作
// 2. 可用low 和 up 来跳过绝大部分检查

var nearestPalindromic = function(n) {
	let low = 1;
	let up = 1;
	let m = Number(n);
	var isPalindromic = function (m, isLow){
		m = String(m);
		for(let i = 0; i<m.length;i++){
			if(m[i] !== m[m.length-1-i]){
				if(isLow){
					low += Math.pow(10, i);
				}else{
					up += Math.pow(10, i);
				}
				return false;
			}
		}
		return true;
	};


	while(true){
		if(isPalindromic(m-low, true)){
			return m-low;
		}
		if(isPalindromic(m+up, false)){
			return m+up;
		}
		// low++;
		// up++;
	}
};


console()

console.time("nearestPalindromic") //8070450550540708 8070450440540708
let k = "80704505322479288";
// let n = parseInt(Math.random() * k);
let n = k;
console.log(n)
console.log("nearestPalindromic",n,nearestPalindromic(n));
console.timeEnd("nearestPalindromic")
