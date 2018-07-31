class Parson{
	constructor(name) {
		this.name = name;
	}

	// インスタンスメソッド
	getName() {
		return this.name;
	}

	// クラスメソッド
	getHoge() {
		return 'hoge';
	}
}

var ryo = new Parson('ryo');
console.log(ryo.getName());
console.log(ryo.getHoge());
