const ok = (res) => res.status(200).send();
const notFound = (res) => res.status(404).send();
const error = (res, err, message = 'Unrecognized Error') => res.status(400).send({ message, err });

module.exports = { ok, notFound, error };
