const User = require('../models/userModel');
const Session = require('../models/sessionModel');
const generateSessionKey = require('../utils/generateSessionKey');

const createUser = async (req, res) => {
  const { mobile, username } = req.body;
  const sessionKey = generateSessionKey();
  const ip = req.ip;
  const userAgent = req.useragent.source;

  try {
    const [user, created] = await User.findOrCreate({
      where: { mobile_number: mobile },
      defaults: {
        user_name: username,
        activeSession: sessionKey
      }
    });

    if (created) {
      await Session.create({
        session: sessionKey,
        ip,
        userAgent,
        UserId: user.id
      });
      res.json({ message: 'User created successfully', sessionKey });
    } else {
      if (user.activeSession) {
        res.status(400).json({ message: 'There is already a session up and running. Please logout and login again.' });
      } else {
        user.activeSession = sessionKey;
        await user.save();
        await Session.create({
          session: sessionKey,
          ip,
          userAgent,
          UserId: user.id
        });
        res.json({ message: 'New session created', sessionKey });
      }
    }
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
};

const getUser = async (req, res) => {
    const { mobile } = req.query;
  
    try {
      const user = await User.findOne({
        where: { mobile_number: mobile },
        include: [{
          model: Session,
          attributes: ['session', 'createdAt', 'updatedAt']
        }]
      });
  
      if (user) {
        res.json({
          mobile_number: user.mobile_number,
          user_name: user.user_name,
          activeSession: user.activeSession,
          sessions: user.Sessions.map(s => ({
            session: s.session,
            createdAt: s.createdAt,
            updatedAt: s.updatedAt
          }))
        });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error fetching user', error: error.message });
    }
  };
  

const logoutUser = async (req, res) => {
    const { mobile } = req.body;
    try {
      const user = await User.findOne({ where: { mobile_number: mobile } });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      if (!user.activeSession) {
        return res.status(400).json({ message: 'No active session to logout' });
      }

      await Session.destroy({ where: { session: user.activeSession } });

      user.activeSession = null;
      await user.save();
      res.json({ message: 'User logged out successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error logging out user', error: error.message });
    }
  };

module.exports = { createUser, getUser, logoutUser };