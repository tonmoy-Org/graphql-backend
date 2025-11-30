module.exports.validateRegister = (username, email, password) => {
    if (!username.trim()) return "Username required";
    if (!email.includes("@")) return "Invalid email";
    if (password.length < 6) return "Password must be 6 characters";
    return null;
  };
  