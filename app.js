var express = require('express'),
        app = express();
var fs      = require('fs');
var fl      = require('node-filelist');

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/html'));

//テンプレートエンジンを使用するための設定
//テンプレートの配置場所を設定
app.set('views', __dirname + '/views');
//テンプレートの種類を設定
app.set('view engine', 'ejs');

// インデックス
app.get('/', function(req, res){
	fs.readdir(__dirname + '/public/html', function(err, files){
		// console.log(__dirname + '/html');
		if(err){
			res.send('error...');
		}else{
			// console.log(files);
			res.render('index', {files, files});
		}
	});
});

app.get('/file/:dir', function(req, res){
	fs.readdir(__dirname + '/public/html/' + req.params.dir, function(err, files){
		if(err){
			res.send('error...');
		}else{
			fileList = [];
			for(var i=0; i<files.length; i++){
				fileList.push('/' + req.params.dir + '/' + files[i]);
			}
			// console.log(fileList);
			res.render('index', {files: fileList});
		}
	});
});

app.listen('3000', () => {
	console.log('server listening... localhost:3000');
});
