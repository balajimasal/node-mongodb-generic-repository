import saslprep from 'saslprep';
import config from '../config/config';
export default function getConnectionString() {
    const sanitizedPassword = saslprep(config.DbPassword);
    const dbUrl = `mongodb+srv://${config.DbUser}:${sanitizedPassword}@${config.DbHost}:${config.DbPort}`;
    return dbUrl;
}


