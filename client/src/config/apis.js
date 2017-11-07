export default {
  companies: `${process.env.NODE_ENV === 'production' ? '/client/src/dist' : '/api'}/data/testdata.json`
};
