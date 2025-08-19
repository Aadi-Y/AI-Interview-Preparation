import React, { useEffect } from "react";
import Navbar from "../Layouts/Navbar";
import DashboardLayout from "../Layouts/DashboardLayout";
import { LuPlus } from "react-icons/lu";
import SummaryCard from "../SummarCard/SummaryCard";
import { useState } from "react";
import { axiosInstance } from "../Utility/axiosInstance";
import { API_PATHS } from "../Utility/apiPath";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import CreateSession from "../CreateSession/CreateSession";
import Modal from "react-modal"
import DeleteAlertContent from "../DeleteAlert/DeleteAlertContent";

function Dashboard() {
  const [session, setSession] = useState(null);
  const [openModal,setOpenModal] = useState(false);

  const [openDeleteAlert,setOpenDeleteAlert] = useState({
    open:true,
    data:null
  })
  const navigate = useNavigate();

  async function handleSession() {
    try {
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
      console.log(response);
      console.log(response.data.sessions);
      if (response && response.data) {
        setSession(response.data.sessions);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleSession();
  }, []);

  function handleNavigation(sessionId) {
    navigate(`/interview-prep/${sessionId}`);
  }

  function handleModalClosing(){
    setOpenModal((prev)=>!prev);
  }

  async function handleDeleteSession(sessionId){
    try{
      const response = await axiosInstance.delete(
        API_PATHS.SESSION.DELETE(sessionId)
      )

      console.log(response);

      if(response){
        handleSession();
      }

    }catch(error){

    }
  }

  return (
    <>
      <DashboardLayout>
        <section className="bg-gray-300/50 h-[100vh]">
          <section>
            <section className="grid grid-cols-1 w-full md:grid-cols-2 lg:grid-cols-3">
              {session && session.length > 0
                ? session.map((sessionItem) => (
                    <SummaryCard
                      key={sessionItem?._id}
                      role={sessionItem?.role}
                      description={sessionItem?.description}
                      experience={sessionItem?.experience}
                      topicToFocus={sessionItem?.topicToFocus}
                      lastUpdate={moment(sessionItem?.updatedAt).format(
                        "DD MMM YYYY"
                      )}
                      questionLength={sessionItem?.questions.length}
                      onSelect={() =>
                        navigate(`/interview-prep/${sessionItem?._id}`)
                      }
                      // onDelete={() => {setOpenDeleteAlert({open:true,data:sessionItem})}}
                      onDelete={()=>handleDeleteSession(sessionItem._id)}
                    />
                  ))
                : []}
            </section>

            <section>
              <Modal
                isOpen={openModal}
                onRequestClose={handleModalClosing}
                style={{
                  overlay: {
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                  },
                  content: {
                    width: "520px",
                    margin: "auto",
                    padding: "20px",
                    borderRadius: "10px",
                    height: "auto",
                    maxHeight: "90vh",
                    overflowY: "auto",
                    position: "relative",
                  },
                }}
              >
                <IoClose
                  className="absolute top-5 right-4 text-2xl text-gray-500 cursor-pointer"
                  onClick={handleModalClosing}
                />

                <CreateSession handleModalClosing={handleModalClosing}/>
              </Modal>

            </section>
            <div>
              <button className="flex items-center border p-2 rounded bg-sky-500 border-none text-white text-[1.2rem] fixed bottom-10 right-10 gap-1 cursor-pointer hover:bg-sky-600 transition-all duration-200 z-50"
              onClick={()=>setOpenModal(true)}
              >
                <LuPlus />
                ADD
              </button>
            </div>
          </section>
        </section>

        {/* <Modal
          isOpen={openDeleteAlert?.open}
          onClose={
            ()=> {
              setOpenDeleteAlert({open:false, data:null});
            }
          }
          title="Delete Alert"
        >
          <div>
            <DeleteAlertContent 
              content="Are you sure you want to delete this session details?"
              onDelete={()=>handleDeleteSession(openDeleteAlert.data)}
            ></DeleteAlertContent>
          </div>
        </Modal> */}
      </DashboardLayout>
    </>
  );
}

export default Dashboard;
