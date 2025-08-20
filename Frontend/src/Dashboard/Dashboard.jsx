import React, { useEffect, useState } from "react";
import DashboardLayout from "../Layouts/DashboardLayout";
import { LuPlus } from "react-icons/lu";
import SummaryCard from "../SummarCard/SummaryCard";
import { axiosInstance } from "../Utility/axiosInstance";
import { API_PATHS } from "../Utility/apiPath";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import CreateSession from "../CreateSession/CreateSession";
import Modal from "react-modal";
import DeleteAlertContent from "../DeleteAlert/DeleteAlertContent";

function Dashboard() {
  const [session, setSession] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    open: false,
    data: null,
  });

  const navigate = useNavigate();

  async function handleSession() {
    try {
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
      if (response && response.data) {
        setSession(response.data.sessions);
      }
    } catch (error) {
      console.error("Error fetching sessions:", error);
    }
  }

  useEffect(() => {
    handleSession();
  }, []);

  function handleModalClosing() {
    setOpenModal((prev) => !prev);
  }

  async function handleDeleteSession(sessionId) {
    try {
      const response = await axiosInstance.delete(
        API_PATHS.SESSION.DELETE(sessionId)
      );
      if (response) {
        handleSession(); // refresh sessions
        setOpenDeleteAlert({ open: false, data: null });
      }
    } catch (error) {
      console.error("Error deleting session:", error);
    }
  }

  return (
    <DashboardLayout>
      <section className="white h-[100vh]">
        <section>
          <section className="grid grid-cols-1 w-full md:grid-cols-2 lg:grid-cols-3 gap-0 p-4">
            {session && session.length > 0 ? (
              session.map((sessionItem) => (
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
                  onDelete={() =>
                    setOpenDeleteAlert({ open: true, data: sessionItem })
                  }
                />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-600 mt-6">
                No sessions found. Click the <b>ADD</b> button to create one.
              </p>
            )}
          </section>

          {/* Create Session Modal */}
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

            <CreateSession handleModalClosing={handleModalClosing} />
          </Modal>

          {/* Delete Alert Modal */}
          <Modal
            isOpen={openDeleteAlert.open}
            onRequestClose={() => setOpenDeleteAlert({ open: false, data: null })}
            style={{
              overlay: {
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              },
              content: {
                width: "400px",
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
            <DeleteAlertContent
              content="Are you sure you want to delete this session?"
              onDelete={() =>
                handleDeleteSession(openDeleteAlert.data?._id)
              }
              onCancel={() => setOpenDeleteAlert({ open: false, data: null })}
            />
          </Modal>

          {/* Add button */}
          <div>
            <button
              className="flex items-center border p-2 rounded-xl bg-blue-500 border-none text-white text-[1rem] fixed bottom-5 right-5 gap-1 cursor-pointer hover:bg-blue-600 transition-all duration-200 z-10 font-medium"
              onClick={() => setOpenModal(true)}
            >
              <LuPlus />
              ADD
            </button>
          </div>
        </section>
      </section>
    </DashboardLayout>
  );
}

export default Dashboard;
