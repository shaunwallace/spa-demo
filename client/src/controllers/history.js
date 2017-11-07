const historyController = (function() {
  const methods = ['pushState', 'replaceState', 'go', 'back', 'forward'];

  const updateLocation = method => {
    return (...args) => ({
      historyAction: method,
      args
    });
  };

  const publicApi = {
    onPopState: cb => {
      window.onpopstate = args => cb(...args)
    },
    formPath: path => path.split('/').filter(p => p)
  };
  
  methods.forEach(m => {
    publicApi[m] = updateLocation(m);
  });

  return publicApi;

})();

export default historyController;
