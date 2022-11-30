import { z } from 'zod';
import { procedure, router } from '../trpc';

export const todoRouter = router({
	all: procedure.query(({ ctx }) => ctx.task.findMany({
		orderBy: {
			createdAt: 'asc'
		}
	})),
	add: procedure
		.input(z.object({
			text: z.string().min(1)
		}))
		.mutation(async ({ ctx, input }) => await ctx.task.create({
			data: input
		})),
	delete: procedure
		.input(z.string().uuid())
		.mutation(async ({ ctx, input }) => {
			await ctx.task.delete({
				where: { id: input }
			})

			return input;
		})
});