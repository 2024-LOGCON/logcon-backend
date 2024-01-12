const validateEmail = (email: string) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const validatePassword = (password: string) => password.length >= 4;

const blacklist = {
  id: ['admin', 'guest', 'logcon', 'ADMIN', 'GUEST', 'LOGCON', 'administrator'],
  name: ['관리자', 'admin', 'guest'],
};

const validateId = (id: string) =>
  !blacklist.id.includes(id) && /[^a-zA-Z0-9]/g.test(id) === false;

const validateName = (name: string) =>
  !blacklist.name.includes(name) &&
  (/[^a-zA-Z0-9]/g.test(name) === false ||
    /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g.test(name) === false);

export { validateEmail, validatePassword, validateId, validateName };
