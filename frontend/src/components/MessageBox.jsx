function MessageBox({icon=<></>,description}) {
    return <div className="MessageBox">
        <div className="MessageBox-title">{icon}</div>
        <div className="MessageBox-desc">{description}</div>
    </div>
}

export default MessageBox;