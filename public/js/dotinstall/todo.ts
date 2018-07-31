(() => {
	const todos = [
		{id: 0 ,title: 'task1', isDone: false},
		{id: 1 ,title: 'task2', isDone: false},
		{id: 2 ,title: 'task3', isDone: true},
	];

	// Todoアイテムコンポーネント
	function TodoItem(props) {
		return (
			<li key={props.todo.id}
				className={props.todo.isDone?'list-group-item':'list-group-item active'}>
				<label>
					<input
						type="checkbox"
						checked={props.todo.isDone}
						onChange={() => props.checkTodo(props.todo)}
					/>
					<span>
						{props.todo.title}
					</span>
				</label>
				<button className="btn btn-danger"
				onClick={() => props.deleteTodo(props.todo)}>削除</button>
			</li>
		);
	}

	// Todoリストコンポーネント
	function TodoList(props) {
		const todos = props.todos.map(todo => {
			return (
				<TodoItem
					key={todo.id}
					todo={todo}
					checkTodo  = {props.checkTodo}
					deleteTodo = {props.deleteTodo}
				/>
			);
		});
		return (
			<ul className='list-group-item'>
				{props.todos.length ? todos : <li className="list-group-item">Nothing to do!</li>}
			</ul>
		);
	}

	// Todo入力フォームコンポーネント
	function TodoForm(props) {
		return (
			<form className="form-horizontal">
				<div className="form-group">
					<div className="col-sm-10">
						<input type="text"
							className="form-control"
							value={props.item}
							onChange={props.updateItem}
						/>
					</div>
					<button className="btn btn-success col-sm-2">Add</button>
				</div>
			</form>
		);
	}

	// コンポーネントの管理クラス
	class App extends React.Component {
		constructor() {
			// クラスを継承している場合、コンストラクタではsuper()の呼び出しが必須
			super();
			this.state = {
				todos: todos,
				item : ''
			};
			// 関数はバインドしておく必要があるよ
			//   バインドしないとstateが使えない
			this.checkTodo = this.checkTodo.bind(this);
			this.deleteTodo = this.deleteTodo.bind(this);
			this.updateItem = this.updateItem.bind(this);
		}

		checkTodo(todo) {
			// stateは直接操作できないためコピー
			const todos = this.state.todos.map(todo => {
				return {id: todo.id ,title: todo.title, isDone: todo.isDone};
			});

			const pos = this.state.todos.map(todo => {
				return todo.id;
			}).indexOf(todo.id);

			todos[pos].isDone = !todos[pos].isDone;

			// stateへの反映はsetStateメソッドを使用
			this.setState({
				todos: todos
			});
		}

		deleteTodo(todo) {
			if(!confirm('Are you sure ?')) {
				return;
			}

			// slice：文字列を切り取るメソッド
			const todos = this.state.todos.slice();
			const pos = this.state.todos.indexOf(todo);

			// splice：要素の追加／削除ができるメソッド
			todos.splice(pos, 1);
			this.setState({
				todos: todos
			});
		}

		updateItem(e) {
			this.setState({
				item: e.target.value
			});
		}

		render() {
			return (
				<div>
					<h1 className="text-center">My ToDo</h1>
					<TodoList
						todos={this.state.todos}
						checkTodo = {this.checkTodo}
						deleteTodo = {this.deleteTodo}
					/>
					<TodoForm
						item={this.state.item}
						updateItem = {this.updateItem}
					/>
				</div>
			);
		}
	}

	ReactDOM.render(
		<App/>,
		document.getElementById("root")
	);
})();