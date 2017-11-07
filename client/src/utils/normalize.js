export default (schema, data) => {
  // const schema = {
  //   returnType: [],
  //   properties: [],
  //   id: 'id',
  //   path: ''
  // };
  if (!schema.path) {
    switch(schema.returnType) {
      case 'array':
        return Object.keys(data).map(key => {
          let o = {}
          if (schema.properties) {
            schema.properties.forEach(prop => {
              if (data[key][prop]) {
                o[prop] = data[key][prop];
                o.id = data[key][schema.id];
              }
            });
            return o;
          } else {
            return key;
          }
        });
    }
  }

  return data;
}