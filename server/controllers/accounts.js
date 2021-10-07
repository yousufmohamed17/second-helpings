import Account from '../models/account.js';

const AccountsController = {
  create(req, res) {
    const account = req.body;

    const newAccount = new Account(account);

    newAccount
      .save()
      .then(() => res.status(200).json(newAccount))
      .catch((error) => res.status(400).json('Error: ' + error));
  },
};

export default AccountsController;
