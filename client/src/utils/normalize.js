export function normalize(schema, data) {
  const schema = {
    returnType: [],
    properties: [],
    id: 'id',
    path: ''
  };

  if (!scheme.path) {
    switch(Object.prototype.toString.call(schema.returnType)) {
      case '[object Array]':
        Object.keys(data).map(key => {
          let o = {}
          if (schema.properties) {
            schema.properties.forEach(prop => {
              if (data[key][prop]) {
                o[prop] = data[key][prop];
                o[id] = data[schema.id];
              }
            });
          } else {
            return key;
          }
        });
    }
  }
}