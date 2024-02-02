import { initTRPC } from '@trpc/server';
import { router } from './trpc';
import { z } from 'zod';
import { createHTTPServer } from '@trpc/server/adapters/standalone';

export const t = initTRPC.create(); 

const appRouter = router({
  hello: t.procedure
  .input(z.object({name: z.string()}))
  .output(z.object({greeting: z.string()}))
  .query(({input}) => {
    console.log(`Yo we got a name ${input.name}`);

    return {
      greeting: `Hello bro with the name ${input.name}`
    }

  })
});
 
export type AppRouter = typeof appRouter;

const server = createHTTPServer({
  router: appRouter
});

server.listen(4000);
