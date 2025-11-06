const pool = require('../controllers/dbController');

class UserModel {
  static async findByEmail(email) {
    const result = await pool.query(`
      SELECT u.email, u.password_hash, u.created_at, p.first_name, p.last_name, p.location
      FROM users u
      LEFT JOIN profile p ON u.user_id = p.user_id
      WHERE u.email = $1
    `, [email]);

    return result.rows[0];
  }
}

module.exports = UserModel;
