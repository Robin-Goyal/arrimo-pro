import database from '../../../utils/database';
import User from '../../../model/UserModel'
import bcrypt from 'bcrypt';


export default async function handler(req, res) {
  await database();
  const { method } = req;
  switch (method) {
    case 'POST':
      try {
        const user = await User.find({ email: req.body.email });
        console.log('user :>> ', user);
        await bcrypt.compare(req.body.password, user[0].password).then(async function (result) {
          console.log('result :>> ', result);
          if (result) {
            const newValue = await User.find({ email: req.body.email }).select("-password")
            return res.status(200).json({ code: 200, success: true, data: newValue[0] })

          } else {
            return res.status(201).json({ code: 201, success: true, data: 'Username and password are incorrect' })
          }

        })

      } catch (error) {
        console.log('error :>> ', error);
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}