//import UserName from "./userName";
import SearchInput from "./searchInput";
import AddNew from "./addNew";
import "../css/messages.css";
import { useNavigate } from "react-router-dom";
import { token } from "./token";
import { useState, useEffect } from "react";
import Loading from "./Loading";
import { authFetch } from "./authFetch.js";
function Messages() {
    const [AllMessages, setAllMessages] = useState([]);
    const getAllMessages = async () => {
        try {
            await authFetch(`https://united-hanger-2025.up.railway.app/api/questions`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
                .then((response) => response.json())
                .then(data => setAllMessages(data.questions));
        }
        catch (error) {
            console.error("Error Not Found Data", error)
        }
    }

    useEffect(() => {
        getAllMessages();
    }, []);

    console.log(AllMessages);

    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate("/AddNewMessage")
    }

    const backgroundMessage = (id) => {
        if ((id % 2) === 0) {
            return "#FFFFFF";
        } else {
            return "#f1f2f7";
        }
    }

    return (
        <div className="Messages-Departament">
            <div className="heading-messages">
                <p className="p-messages">Messages</p>
            </div>
            <div className="col-Search">
                <SearchInput />
            </div>
            <div className="All-Messages">
                <p>All Messages</p>
            </div>
            <div className="Main-Messages-Cols">
                {!AllMessages ?
                    <Loading />
                    :
                    <>
                        {AllMessages.map((message, index) => {
                            return (
                                <div className="content-Mesaage" key={message.id} style={{ backgroundColor: backgroundMessage(message.id), cursor: "pointer" }}>
                                    <p className="id-P">{index + 1}</p>
                                    <div className="text-Message">
                                        <p className="Name-P">{message.name}</p>
                                        <p className="Description-P">{message.message}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </>
                }
            </div>
        </div>
    )
}
export default Messages;