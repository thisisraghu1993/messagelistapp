import React, { useState, useMemo } from "react";
import { BASE_URL } from "../../Scripts/Constants";
import EditModal from "./EditModal";
import { DateUtils } from "./../../Scripts/DateUtils"
const MessageCard = (props) => {
  let startTouch = 0;
  const {
    message = {},
    messageIdx = "",
    listPosition = "",
    updateMessageDetails = () => {},
  } = props || {};
  const { author = {}, content = "", updated = "" } = message || {};
  const { name = "", photoUrl = "" } = author || {};

  const [showButton, setShowButton] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [ isDelete, setIsDelete ] = useState(false);

  const toggleModal = (data = null) => {
      if(data) {
          if(data?.hideOnly) {
              isDelete && 
                  setIsDelete(false);
          } else {
              if(!isDelete) {
                  message.author.name = data.author;
                  message.content = data.content;
                  updateMessageDetails({...message, messageIdx, listPosition});
              } else {
                  updateMessageDetails({messageID: message.id, isDelete: true, listPosition})
              }
          }
      }
      setShowModal(prevState => !prevState);
      showButton &&
        setShowButton(false);
  }

  const touchEvent = (evt) => {
      startTouch = evt.touches[0].screenX;
  }

  const touchEndEvent = (evt) => {
      let endTouch = evt.changedTouches[0].screenX;
      if (endTouch > startTouch + 60) {
          setShowButton(true);
      } else {
          if(startTouch > endTouch + 60) {
              setShowButton(false);
          }
      }
  }
  
  const enableEditDeleteButton = () => {
      setShowButton(prevState => !prevState)
  }
  
  const CardBody = useMemo(() => {
      return (
        <div className="card-body">
          <div className="card-header">
            <img
              src={`${BASE_URL}${photoUrl}`}
              alt="Avatar"
              className="avatar"
            />
            <div className="card-title">
              <h6 className="full-name">{name}</h6>
              <p className="published-date">
                {DateUtils.getUpdatedDays(new Date(updated))}
              </p>
            </div>
          </div>
          <div className="card-content">{content}</div>
      </div>        
      )
  }, [message])

  const actionBtnList = [
    {
      name: "Edit",
      key: "edit",
      icon: "edit",
      method: () => {setShowButton(true); toggleModal()}
    },
    {
      name: "Delete",
      key: "delete",
      icon: "delete",
      method: () => { setIsDelete(true); toggleModal(); }
    },
  ];
  return (
    <>
      {showModal && (
        <EditModal isDelete={isDelete} 
          toggleModal={toggleModal}
          author={name}
          content={content}
        />
      )}
      <div
        className={`card ${showButton ? "card-action" : ""}`}
        onDoubleClick={enableEditDeleteButton}
        onTouchStart={touchEvent}
        onTouchEnd={touchEndEvent}
      >
        {showButton && (
          <div className="wrap-action-btn">
            {actionBtnList?.map((item) => {
              const {
                name = "",
                key = "",
                icon = "",
                method = () => {},
              } = item || {};
              return (
                <div className={`action-btn ${key}`} key={key} onClick={method}>
                  <span className="action-text">{name}</span>
                  <span className="rotate-270">
                  <i
                    className="material-icons"
                  >
                    {icon}
                  </i>
                  </span>
                </div>
              );
            })}
          </div>
        )}
        {
          CardBody
        }
      </div>
    </>
  );
};

export default MessageCard;
