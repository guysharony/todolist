import Head from 'next/head';
import { Input } from 'antd';
import superjson from 'superjson';
import { trpc } from '../utils/trpc';
import { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { createProxySSGHelpers } from '@trpc/react-query/ssg';

import { createContext } from '../server/context';
import { appRouter } from '../server/routers/_app';

import styles from '../styles/home.module.css';

const { Search } = Input;

export const getStaticPaths: GetStaticPaths = async () => {
	return {
	  paths: ['active', 'completed', 'all'].map((filter) => ({
	    params: { filter },
	  })),
   
	  fallback: false,
	};
   };
   
   export const getStaticProps = async (
	context: GetStaticPropsContext<{ filter: string }>,
   ) => {
	const ssg = createProxySSGHelpers({
	  router: appRouter,
	  transformer: superjson,
	  ctx: await createContext(),
	});

	await ssg.todo.all.fetch();

	return {
	  props: {
	    trpcState: ssg.dehydrate(),
	    filter: context.params?.filter ?? 'all',
	  },
	  revalidate: 1,
	};
   };

export default function TodosPage({ filter }: InferGetStaticPropsType<typeof getStaticProps>) {
	const allTasks = trpc.todo.all.useQuery(undefined, {
		staleTime: 3000,
	});

	const utils = trpc.useContext();

	console.log(allTasks);

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