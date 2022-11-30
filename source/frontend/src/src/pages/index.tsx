import Head from 'next/head';
import { Button, Input } from 'antd';

import { trpc } from '../utils/trpc';

import styles from '../styles/home.module.css';

const { Search } = Input;

export default function Home() {
	const all = trpc.todo.all.useQuery(undefined, {
		staleTime: 3000
	});

	const utils = trpc.useContext();

	const add = trpc.todo.add.useMutation({
		async onMutate({ text }) {
			await utils.todo.all.cancel();

			const tasks = all.data ?? [];

			utils.todo.all.setData(undefined, [
				...tasks,
				{
					id: `${Math.random()}`,
					text,
					createdAt: new Date(),
				},
			]);
		},
	});

	const remove = trpc.todo.delete.useMutation({
		async onMutate(id) {
			await utils.todo.all.cancel();

			const tasks = all.data ?? [];

			utils.todo.all.setData(undefined, tasks.filter((task) => task.id != id));
		}
	})

	const tasks = all.data ?? [];

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

								add.mutate({ text });
							}}
						/>
					</div>
					{
						tasks.length > 0 &&
						<div className={styles.tasks}>
							{
								all.data?.map((task) => (
									<div key={task.id} className={styles.task}>
										<span>{task.text}</span>
										<Button onClick={() => { remove.mutate(task.id); }}>Delete</Button>
									</div>
								))
							}
						</div>
					}
				</div>
			</main>
		</div>
	);
}