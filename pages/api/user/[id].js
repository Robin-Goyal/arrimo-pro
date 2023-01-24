import database from '../../../utils/database';
import User from '../../../model/UserModel'
import bcrypt from 'bcrypt';


export default async function handler(req, res) {
  await database();
  const { method } = req;
  console.log('req.query.id :>> ', req.query.id);

  switch (method) {
    case 'GET':
      try {
        const users = await User.find({}).select("-password")
        console.log('users :>> ', users);
        res.status(200).json({ success: true, data: users })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break;
    case 'DELETE':
      try {
        const users = await User.findById(req.query.id)
        console.log('users :>> ', users);
        const deletedUpdate = await User.deleteOne({ _id: req.query.id })
        console.log('deletedUpdate :>> ', deletedUpdate);
        const usersListUpdated = await User.find({}).select("-password")
        res.status(200).json({ success: true, data: usersListUpdated })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break;
    default:
      res.status(400).json({ success: false })
      break
  }
}