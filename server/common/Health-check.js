import pkg from '../../package.json';

export default async function(req, res) {
  res.status(200).json({
    status: `App is running in version ${pkg.version}`,
  });
}
