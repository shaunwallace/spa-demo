import historyController from 'Controllers/history';

const router = store => next => action => {

  let path = historyController.formPath(window.location.pathname);

  if (!action.historyAction) {
    return next(action);
  }

  const { historyAction, args } = action;
  // check to see if the most recent selection is already present in the path
  const inPathIndex = path.indexOf(args[0].path);

  if (inPathIndex !== -1) {
    path = path.slice(0, inPathIndex + 1);
  } else {
    // add the most recent action's choice to window.location.pathname
    path.push(args[0].path);
  }

  if (args.length === 1) {
    history[historyAction](...args, '',`/${path.join('/')}`);
  } else if (args.length === 2) {
    history[historyAction](...args, `/${path.join('/')}`);
  } else {
    path = [args[0].path];
    history[historyAction](...args);
  }
  // call next middleware
  return next({...action, keyPath: path});
}

export default router;