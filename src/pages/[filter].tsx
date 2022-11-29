import Head from 'next/head';
import { Input } from 'antd';

import styles from '../styles/home.module.css';

const { Search } = Input;

export default function TodosPage() {
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
							allowClear
							enterButton="Add"
							size="large"
							onSearch={(e) => { console.log(e); }}
						/>
					</div>
				</div>
			</main>
		</div>
	);
}