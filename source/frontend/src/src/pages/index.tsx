import Head from 'next/head';
import { Input } from 'antd';

import { trpc } from '../utils/trpc';

import styles from '../styles/home.module.css';

const { Search } = Input;

export default function TodosPage() {
	const allTasks = trpc.todo.all.useQuery(undefined, {
		staleTime: 3000,
	});

	const utils = trpc.useContext();

	const addTask = trpc.todo.add.useMutation({
		async onMutate({ text }) {
			await utils.todo.all.cancel();

			utils.todo.all.setData(undefined, [
				{
					id: `${Math.random()}`,
					completed: false,
					text,
					createdAt: new Date(),
				},
			]);
		},
	});

	return (
		<div className={styles.container}>
			<Head>
				<title>Todos</title>
				<meta name="description" content="Creating a todo list." />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className={styles.main}>
				<div className={styles.content}>
					<div className={styles.search}>
						<h1 className={styles.title}>Todos</h1>
						<Search
							placeholder="What needs to be done?"
							enterButton="Add"
							size="large"
							onSearch={(value: string) => {
								const text = value.trim();

								if (!text.length) return;

								addTask.mutate({ text });
							}}
						/>
					</div>
				</div>
			</main>
		</div>
	);
}