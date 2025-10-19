export default function handlerUserAction(req, res) {
  switch (req.method) {
    case 'GET':
      res.status(200).json({ message: 'Success in GET request' });
      break;
    case 'POST':
      res.status(200).json({ message: 'Success in POST request' });
      break;
    default:
      res.status(405).json({
        message: `El método HTTP ${req.method} no está disponible para este objeto`,
      });
      break;
  }
}
