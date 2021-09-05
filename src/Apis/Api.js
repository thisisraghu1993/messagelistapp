import axios from "axios";

export default axios.create({
    baseURL: `http://message-list.appspot.com/messages`
});