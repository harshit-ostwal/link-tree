const AccountSelect = {
  id: true,
  provider: true,
  lastLoginAt: true,
  userId: true,
};

const AccountCreateSelect = {
  id: true,
  provider: true,
  userId: true,
};

const AccountWithCredentialsSelect = {
  ...AccountSelect,
  password: true,
};

export { AccountCreateSelect, AccountSelect, AccountWithCredentialsSelect };
