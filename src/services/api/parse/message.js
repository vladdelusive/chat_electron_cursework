import { createTimestamp } from "utils/time"

export const parseNewMessage = (payload) => {
    const { uid, message } = payload;
    return {
        from: uid,
        message: message,
        timestamp: createTimestamp()
    }
}