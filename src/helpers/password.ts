import bcrypt from 'bcrypt';
const saltRounds = 10;

export async function hash(password: string): Promise<string> {
  return await bcrypt.hash(password, saltRounds);
}

export async function compare(password: string, hash: string) :Promise<boolean> {
  return await bcrypt.compare(password, hash)
}