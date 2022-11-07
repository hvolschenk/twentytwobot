declare module 'bunyan-express-common-log-format' {
  import bunyan from 'bunyan';

  const serializer: bunyan.Serializer;
  export default serializer;
}
