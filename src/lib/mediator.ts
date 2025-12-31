type NextFn = () => Promise<void>;

export type Middleware<TContext> = (
  ctx: TContext,
  next: NextFn
) => Promise<void>;

export const mediator =
  <Context extends object>(...fns: Middleware<Context>[]) =>
  async (context: Context) => {
    const pipeline = [...fns];

    const runner = async (idx: number) => {
      const middleware = pipeline[idx];
      if (!middleware) return;

      await middleware(context, async () => {
        await runner(idx + 1); // middleware must explicitly await next()
      });
    };

    await runner(0);
  };
