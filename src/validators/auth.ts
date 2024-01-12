import { readFileSync } from 'fs';

const validateEmail = (email: string) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const validatePassword = (password: string) => password.length >= 8;

const blacklist: {
  id: string[];
  name: string[];
} = JSON.parse(readFileSync('./src/constants/blacklist.json', 'utf-8'));

const validateId = (id: string) =>
  !blacklist.id.includes(id) && /[^a-zA-Z0-9]/g.test(id) === false;

const validateName = (name: string) => !blacklist.name.includes(name);

export { validateEmail, validatePassword, validateId, validateName };
