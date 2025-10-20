const postLogin = async (req, res) => {
    const { email, password } = req.body;
    console.log('LOGIN REQUEST:', email);

}; 

module.exports = { postLogin };