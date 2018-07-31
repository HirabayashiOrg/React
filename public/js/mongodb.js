(function(){
	'use strict';
	var show = function(data){
		// グラフの種類
		var type = 'pie';

		// グラフの設定
		var options = {}

		var ctx = document.getElementById('my_chart1').getContext('2d');
		var myChart = new Chart(ctx, {
			type   : type,
			data   : data,
			options: options,
		});
	}

	$.get('/api/sample/data1',{},function(data_){
		var data = JSON.parse(data_);
		//alert(data);

		show(data);
	});

})();