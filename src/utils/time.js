import { Timestamp } from 'db'

export const createTimestamp = () => Timestamp.now().toMillis().toString();
