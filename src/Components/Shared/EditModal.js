import React, { useState } from "react";

const EditModal = (props) => {
  // console.log(props)
  const [author, setAuthor] = useState(props.author);
  const [content, setContent] = useState(props.content);
    
  const getModalBody = () => {
        if(props.isDelete) {
            return (
                <div className="modal-body">
                    <h4>Are You Sure You Want To Delete This Message?</h4>
                </div>
            )
        } else {
            return (
              <div className="modal-body">
                <div className="input-box">
                  <input
                    placeholder="Edit Author Name"
                    value={author}
                    onChange={(event) => setAuthor(event.target.value)}
                  />
                </div>
                <div className="input-box">
                  <textarea
                    placeholder="Edit Content"
                    rows="8"
                    cols="400"
                    value={content}
                    onChange={(event) => setContent(event.target.value)}
                  />
                </div>
              </div>
            )
        }
  }
  
  const onSubmit = () => {
      if(props.isDelete) {
          props.toggleModal({delete: true})
      } else {
          props.toggleModal({content, author});
      }
  }
  
  return (
    <div id="myModal" className="modal">
      <div className="modal-content">
        <span className="material-icons close" onClick={() => props.toggleModal({hideOnly: true})}>
            close
          </span>
          <div className="modal-header">
            <h2>{props.isDelete ? "Delete Message" : "Edit Message"}</h2>
          </div>
          {getModalBody()}
          <div className="modal-footer">
            <button onClick={onSubmit}>
              Submit
            </button>
          </div>
      </div>
    </div>
  );
};

export default EditModal;
