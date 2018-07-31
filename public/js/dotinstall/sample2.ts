(() => {
	// コンポーネントの定義
	function Counter(props) {
		function countUp(e, color) {
			e.preventDefault();
			alert(color);
		}

		return (
			<li style={{backgroundColor: props.color}}>
				<a href="#" onClick={ e => countUp(e, props.color)}>0</a>
			</li>
		);
	}
	// コンポーネントの登録
	ReactDOM.render(
		<div>
			<ul>
				<Counter color="tomato" />
				<Counter color="skyblue" />
				<Counter color="limegreen" />
			</ul>
		</div>,
		document.getElementById("root")
	);
})();
