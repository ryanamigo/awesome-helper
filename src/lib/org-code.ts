/**
* 生成组织机构代码
*/
export function generatorOrgCode(){
	const max = 99999999;
  const min = 10000000;
	const num = parseInt(((Math.random()*(max-min))+min).toString());
	const ws = [ 3, 7, 9, 10, 5, 8, 4, 2 ];
	let sum: number = 0;
	for (let i = 0; i < 8; i++) {
			sum += Number((num+"").charAt(i)) * ws[i];
	}
	let C9: number | string = 11 - (sum % 11);
	if (C9 == 11) {
		C9 = '0';
	} else if (C9 == 10) {
		C9 = 'X';
	} else {
		C9 = C9 + '';
	}
  return num+"-"+C9
}





/**
 * 验证组织机构合法性方法
 */
export function orgCodeValidate(value: string) {
	if (value.trim() != "") {
		const values = value.split("-");
		const ws = [ 3, 7, 9, 10, 5, 8, 4, 2 ];
		const str = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		const reg = /^([0-9A-Z]){8}$/;
		if (!reg.test(values[0])) {
      return false
		}
		let sum = 0;
		for (let i = 0; i < 8; i++) {
			sum += str.indexOf(values[0].charAt(i)) * ws[i];
		}
		let C9: string | number = 11 - (sum % 11);
		const YC9 = values[1] + '';
		if (C9 == 11) {
			C9 = '0';
		} else if (C9 == 10) {
			C9 = 'X';
		} else {
			C9 = C9 + '';
		}
		if(YC9 == C9){
			return true;
		}else{
			return false; 
		}
	}else{
		return false;   
	}
}