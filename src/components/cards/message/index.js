import React from 'react'

export function MessageCard(props) {
    const { item } = props;
    const {
        message,
        me,
        // time, 
        // id,
    } = item;
    return (
        <div className={`message ${me ? "from-me--message" : "to-me--message"}`}>
            <div className="message__content">
                {message}
            </div>
        </div>
    )
}
