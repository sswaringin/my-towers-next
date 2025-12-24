export const mediator =
  (...fns) =>
  async (context) => {
    const pipeline = [...fns];

    const runner = async (idx) => {
      const middleware = pipeline[idx];
      if (!middleware) return;

      await middleware(context, async () => {
        await runner(idx + 1); // middleware must explicitly await next()
      });
    };

    await runner(0);
  };
