import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../Utility/axiosInstance";
import { API_PATHS } from "../Utility/apiPath";
import DashboardLayout from "../Layouts/DashboardLayout";
import RoleInfo from "../RoleInfo/RoleInfo";
import { AnimatePresence, motion } from "framer-motion";
import moment from "moment";
import QuestionCard from "../QuestionCard/QuestionCard";
import { LuCircleAlert, LuListCollapse } from "react-icons/lu";
import AIResponsePreview from "../AIResponsePreview/AIResponsePreview";
import Drawer from "../Drawer/Drawer";
import SessionSkeleton from "../Skeleton/SessionSkeleton";
import SpinnerLoader from "../Spinner/SpinnerLoader";
import {toast} from "react-hot-toast"

function InterviewPrep() {
  const { sessionId } = useParams();
  const [sessionData, setSessionData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [openLearnMoreDrawer, setOpenLearnMoreDrawer] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [explanation, setExplanation] = useState("");
  const [isUpdateLoader,setIsUpdateLoader] = useState(false);

  async function handleSessionAPI() {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(
        API_PATHS.SESSION.GET_ONE(sessionId)
      );
      if (response.data && response.data.session) {
        setIsLoading(false);
        setSessionData(response.data.session);
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  async function toggleQuestionPinStatus(questionId) {
    try {
      const response = await axiosInstance.post(
        API_PATHS.QUESTION.PIN(questionId)
      );

      console.log(response);

      if (response.data) {
        handleSessionAPI();
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  async function generateConceptExplanation(question) {
    try {
      setErrorMsg("");
      setExplanation(null);

      setIsLoading(true);
      setOpenLearnMoreDrawer(true);

      const response = await axiosInstance.post(
        API_PATHS.AI.GENERATE_EXPLANATION,
        {
          question,
        }
      );

      console.log(response.data.data);

      if (response) {
        setExplanation(response.data.data);
      }
    } catch (error) {
      setExplanation(null);
      setErrorMsg("Error: ", error);
      console.error("Error : ", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function uploadMoreQuestions(){
    try{
      setIsUpdateLoader(true);

      const aiResponse = await axiosInstance.post(
        API_PATHS.AI.GENERATE_QUESTIONS,{
          role:sessionData?.role,
          experience:sessionData?.experience,
          topicToFocus:sessionData?.topicToFocus,
          numberOfQuestions:10
        }
      )

      console.log(aiResponse);
      const generatedQuestions = aiResponse?.data.data;

      const response = await axiosInstance.post(
        API_PATHS.QUESTION.ADD_TO_SESSION,{
          sessionId,
          questions:generatedQuestions,
        }
      );

      console.log(response);

      if(response.data){
        toast.success("Added More Q&A!!");
        handleSessionAPI();
      }
    }catch(error){
      console.error("Error : ",error);
      if(error.response && error.response.data.message){
        setErrorMsg(error.response.data.message);
      }else{
        setErrorMsg("Something went wrong. Please try again later!")
      }
    }finally{
      setIsUpdateLoader(false);
    }
  }

  useEffect(() => {
    handleSessionAPI();
  }, []);

  return (
    <>
      <DashboardLayout>
        <section>
          <section>
            <RoleInfo
              key={sessionData?._id}
              role={sessionData?.role}
              experience={sessionData?.experience}
              questionLength={sessionData?.questions.length}
              topicToFocus={sessionData?.topicToFocus}
              description={sessionData?.description}
              lastUpated={moment(sessionData?.updatedAt).format("DD MMM YYYY")}
            ></RoleInfo>

            <div className="pt-4 pb-4 mb-10 ml-2 md:ml-35">
              <h2 className="text-lg font-semibold color-black">
                Interview Q & A
              </h2>

              <div className="grid grid-cols-12 gap-4 mt-5 mb-10">
                <div
                  className={`col-span-12 ${
                    openLearnMoreDrawer ? "md:col-span-7" : "md:col-span-8"
                  }`}
                >
                  <AnimatePresence>
                    {sessionData?.questions?.map((eachQuestion, index) => (
                      <motion.div
                        key={eachQuestion._id}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{
                          duration: 0.4,
                          type: "spring",
                          stiffness: 100,
                          delay: index * 0.1,
                          damping: 15,
                        }}
                        layout
                        layoutId={`question-${eachQuestion._id || index}`}
                      >
                        <QuestionCard
                          key={eachQuestion?._id}
                          title={eachQuestion?.question}
                          answer={eachQuestion?.answer}
                          isPinned={eachQuestion?.isPinned}
                          onLearnMore={() =>
                            generateConceptExplanation(eachQuestion?.question)
                          }
                          onTogglePin={() =>
                            toggleQuestionPinStatus(eachQuestion?._id)
                          }
                        />
                        <div>
                          {!isLoading &&
                            sessionData?.questions?.length === index + 1 && (
                              <div
                              className="flex items-center justify-center mt-5"
                              >
                                <button
                                  className="flex items-center gap-3 text-sm text-white font-medium bg-black px-5 py-2 mr-2 rounded text-nowrap cursor-pointer"
                                  disabled={isLoading || isUpdateLoader}
                                  onClick={uploadMoreQuestions}
                                >
                                  {isUpdateLoader ? (
                                    <SpinnerLoader size="sm" />
                                  ) : (
                                    <LuListCollapse className="text-lg" />
                                  )}
                                  Load More
                                </button>
                              </div>
                            )}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </section>

          <div>
            <Drawer
              isOpen={openLearnMoreDrawer}
              onClose={() => setOpenLearnMoreDrawer(false)}
              title={!isLoading && explanation?.title}
            >
              {errorMsg && (
                <p className="flex gap-2 text-sm text-amber-500 font-medium ">
                  <LuCircleAlert className="mt-1" /> {errorMsg}
                </p>
              )}
              {isLoading && <SessionSkeleton />}
              {!isLoading && explanation && (
                <AIResponsePreview content={explanation?.explanation} />
              )}
            </Drawer>
          </div>
        </section>
      </DashboardLayout>
    </>
  );
}

export default InterviewPrep;
