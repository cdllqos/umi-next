interface IOpts {
  routes: any[];
}

interface IMemo {
  id: number;
  ret: any;
}

export function getConfigRoutes(opts: IOpts): any[] {
  const memo: IMemo = { ret: {}, id: 1 };
  transformRoutes({ routes: opts.routes, parentId: undefined, memo });
  return memo.ret;
}

function transformRoutes(opts: {
  routes: any[];
  parentId: undefined | string;
  memo: IMemo;
}) {
  opts.routes.forEach((route) => {
    transformRoute({ route, parentId: opts.parentId, memo: opts.memo });
  });
}

function transformRoute(opts: {
  route: any;
  parentId: undefined | string;
  memo: IMemo;
}) {
  const id = String(opts.memo.id++);
  const { routes, component, ...routeProps } = opts.route;
  opts.memo.ret[id] = {
    ...routeProps,
    path: opts.route.path,
    ...(component ? { file: component } : {}),
    parentId: opts.parentId,
    id,
  };
  if (opts.route.routes) {
    transformRoutes({
      routes: opts.route.routes,
      parentId: id,
      memo: opts.memo,
    });
  }
}
