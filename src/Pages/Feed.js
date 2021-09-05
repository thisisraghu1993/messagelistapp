import React, { useEffect, useState } from "react";
import Api from "../Apis/Api";
import MessageList from "../Components/Shared/MessageList";
import Toast from "../Components/Shared/Toast";
import Loader from "../Components/Shared/Loader";

export const Feed = () => {
  const [messageList, setMessageList] = useState([]);
    const [prevToken, setPrevToken] = useState('');
    const [isFetching, setIsFetching] = useState(false);
    const [offsetHeight, setOffsetHeight] = useState(0);
    const [ showToast, setShowToast ] = useState(false);
    const [ toastDetails, setToastDetails ] = useState({});
    const [isLoading, setIsLoading ] = useState(true);
    let params = {limit : 10};
    
    if(prevToken) {
        params["pageToken"] = prevToken;
        params["limit"] = 100;
    }

    window.onscroll = (() => {
        checkScrollAndFetchData();
    });


    

    const checkScrollAndFetchData = () => {
        let innerHeight = window.innerHeight;
        if (innerHeight + document.documentElement.scrollTop >= (document.documentElement.offsetHeight - offsetHeight)) {
            if(!isFetching) {
                setIsFetching(true);
                fetchMessages();
            }
        }
    }

    const fetchMessages = (isInitialLoad = false, updateOffset = false) => {
        Api.get('' , {params}).then(data => {
            if(data.status === 200) {
                let { messages, pageToken } = data.data;
                if(updateOffset) {
                    setOffsetHeight((document.documentElement.offsetHeight * 10) / 2);
                }
                let newMessages = [...messageList, messages];
                if(isInitialLoad) {
                    setIsLoading(false)
                    setMessageList(newMessages);
                    params["pageToken"] = pageToken;
                    params["limit"] = 100;
                    fetchMessages(false, true);
                } else {
                    setIsFetching(false);
                    setPrevToken(pageToken);
                    setMessageList(prevMessages => {
                        let newMessages = [...prevMessages, messages];
                        return newMessages
                    });
                }
            }
        }).catch(err => {
            console.log(err);
        })
    }

    const updateMessageDetails = (messsageDetails) => {
        let {messageID, messageIdx, listPosition, isDelete,...message} = messsageDetails;
        let allMessages = [...messageList]
        let newMessageList = [...allMessages[listPosition]];
        setShowToast(true);
        if(!isDelete) {
            newMessageList[messageIdx] = {... message};    
            setToastDetails({toastMessageClass: "success-toast" ,toastMessage: "Message Updated Successfully"});
        } else {
            newMessageList = newMessageList.filter((message) => message.id != messageID);
            setToastDetails({toastMessageClass: "delete-toast" ,toastMessage: "Message Deleted Successfully"})
            checkScrollAndFetchData();
        }
        allMessages[listPosition] = newMessageList;
        setMessageList(allMessages);
    }
    
    useEffect(() => {
        fetchMessages(true);
    }, []);

    useEffect(() => {
        let timer;
        if(showToast) {
            setTimeout(() => {
                timer = setShowToast(false)
            }, 3000);
        }
        return () => {
          clearTimeout(timer)
        }
    }, [showToast])

  return (
    <section className="feed-section">
      {
          isLoading && <Loader/>
      }
      {!isLoading && messageList?.map((messages, idx) => {
        return (
          <MessageList
            messages={messages}
            key={idx}
            listPosition={idx}
            updateMessageDetails={updateMessageDetails}
          />
        );
      })}
      {
        showToast && <Toast {...toastDetails}/> 
      }
    </section>
  );
};

export default Feed;
