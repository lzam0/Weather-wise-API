const pool = require("../controllers/dbController");

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

  // Create new user
  static async insertUser(email, passwordHash) {
    const result = await pool.query(`
      INSERT INTO users (email, password_hash)
      VALUES ($1, $2)
      RETURNING user_id, email, created_at
    `, [email, passwordHash]);
    return result.rows[0];
  }

  // Create profile entry
  static async insertProfile(userId, firstName, lastName) {
    const result = await pool.query(`
      INSERT INTO profile (user_id, first_name, last_name)
      VALUES ($1, $2, $3)
      RETURNING user_id, first_name, last_name
    `, [userId, firstName, lastName]);
    return result.rows[0];
  }

  // Verify user email
  static async verifyUser(email) {
    try {
      const result = await pool.query(
        `UPDATE users 
         SET verified = TRUE, updated_at = CURRENT_TIMESTAMP 
         WHERE email = $1 
         RETURNING *;`,
        [email]
      );

      return result.rows[0];
    } catch (error) {
      console.error('Error verifying user:', error);
      throw error;
    }
  }
}

module.exports = UserModel;
