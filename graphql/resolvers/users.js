const { UserInputError } = require("apollo-server");

const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../../config.js')
const { validateRegisterInput, validateLoginInput } = require('../../utils/validators');

module.exports = {
  Mutation : {
      async register (_, args) {
        let { email, password, username, confirmPassword } = args.registerInput;
        const { errors, valid } = validateRegisterInput(username, password, email, confirmPassword);

        if (!valid) { 
          throw new UserInputError('Errors', { errors });
        }
        password = await bcrypt.hash(password, 12);
        const doesUserExist = await User.exists({ email: email });

        if (doesUserExist) {
          throw new UserInputError('this email address is registered to another user', {
            errors: {
              email: 'This email address is registered to another user'
            }
          });
        }
      
        const newUser = new User({
            username,
            email,
            password,
            createdAt: new Date().toISOString() 
        });
        
        const result = await newUser.save();

        const token = jwt.sign({
          id: result.id,
          email: result.email,
          username: result.username
        }, SECRET_KEY, {expiresIn: 86400});

        return {
          ...result._doc,
          id: result._id,
          token
        };
      },

      async login(_, args) {
        const { username, password } = args.loginInput;
        const { errors, valid } = validateLoginInput(username, password)

        if (!valid) {
          throw new UserInputError('Errors', { errors });
        }

        let user = await User.findOne({username: username});

          if (!user) {
            throw new UserInputError('User does not exist', { message: 'User does not exist' });
          }

          let passwordIsValid = bcrypt.compareSync(
            password,
            user.password
          );

          if (!passwordIsValid) {
            throw new UserInputError('Incorrect password', { message: 'Please enter correct password' });
          }

          const token = jwt.sign({ id: user.id, username: username }, SECRET_KEY, {
            expiresIn: 86400
          });

          return {
            ...user._doc,
            id: user._id,
            token
          };
      }
    }
};
