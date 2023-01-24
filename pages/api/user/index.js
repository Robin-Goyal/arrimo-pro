import database from '../../../utils/database';
import User from '../../../model/UserModel'
import bcrypt from 'bcrypt';


export default async function handler(req, res) {
  await database();
  const { method } = req;
  console.log('user api triggered :>> ', method);



  switch (method) {
    case 'GET':
      try {
        const users = await User.find({}).select("-password")
        console.log('users :>> ', users);
        res.status(200).json({ success: true, data: users })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {

        console.log('req.body :>> ', req.body);

        await bcrypt.hash(req.body.password, 10).then(async function (hash) {
          const withPassword = {
            ...req.body,
            password: hash,
          }
          console.log('withPassword :>> ', withPassword);
          const user = await User.create(withPassword)
          const newValue = await User.findById(user._id).select("-password")
          return res.status(200).json({ code: 200, success: true, data: newValue })

        })

      } catch (error) {
        // console.log('error :>> ', error.keyValue, error.message, error);
        if (error.code === 11000) {
          return res.status(202).json({ code: 202, success: true, data: `A user already exit with Email: ${error.keyValue.email}, please register with other email address` })
        } else {
          res.status(400).json({ success: false })
        }
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}