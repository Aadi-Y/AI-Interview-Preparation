import { useState } from "react";
import Input from "../Input/Input";
import { axiosInstance } from "../Utility/axiosInstance";
import { API_PATHS } from "../Utility/apiPath";
import { useNavigate } from "react-router-dom";
import Spinner from "../Spinner/SpinnerLoader";

function CreateSession({ handleModalClosing }) {
  const [formData, setFormData] = useState({
    role: "",
    experience: "",
    topicToFocus: "",
    description: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleFormData(key, value) {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  }

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault(); // ✅ Prevent page refresh
    const { role, experience, topicToFocus, description } = formData;

    if (!role || !experience || !topicToFocus) {
      setError("Please fill all the required fields");
      return;
    }

    console.log(formData);
    setError("");
    setLoading(true);
    try {
      // API call for AI response
      const aiResponse = await axiosInstance.post(
        API_PATHS.AI.GENERATE_QUESTIONS,
        {
          role,
          experience,
          topicToFocus,
          numberOfQuestions: 10,
        }
      );

      // API call for create a new session
      const response = await axiosInstance.post(API_PATHS.SESSION.CREATE, {
        role,
        experience,
        topicToFocus,
        questions: aiResponse?.data.data,
        description,
      });

      console.log(response);

      if (response && response.data) {
        setLoading(false);
        handleModalClosing();
        navigate(`/interview-prep/${response.data?.session?._id}`);
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <section>
        <section>
          <div>
            <h1 className="text-center text-[1.3rem] font-semibold mb-2">
              Session survey
            </h1>
            <p className="text-gray-600 text-[15px] mb-2">
              Fill up all the following questions to start the interview journey
            </p>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div>
              <label>Target Role</label>
              <Input
                text="text"
                placeholder="Frontend development"
                value={formData.role}
                onChange={({ target }) => handleFormData("role", target.value)}
              />
            </div>

            <div>
              <label>Year of Experience</label>
              <Input
                text="number"
                placeholder="1 year, 2 years, 5+ years"
                value={formData.experience}
                onChange={({ target }) =>
                  handleFormData("experience", target.value)
                }
              />
            </div>

            <div>
              <label>Topic to Focus on</label>
              <Input
                text="text"
                placeholder="React.js, Next.js"
                value={formData.topicToFocus}
                onChange={({ target }) =>
                  handleFormData("topicToFocus", target.value)
                }
              />
            </div>

            <div>
              <label>Description</label>
              <Input
                text="text"
                placeholder="Any specific reason"
                value={formData.description}
                onChange={({ target }) =>
                  handleFormData("description", target.value)
                }
              />
            </div>

            <div>
              <p className="text-[.9rem] text-red-500">{error}</p>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center gap-2 py-3 rounded-xl 
                           bg-sky-500 hover:bg-sky-600 text-white font-semibold 
                           transition-all duration-300 shadow-md hover:shadow-lg 
                           disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Spinner color="white" /> Creating...
                  </>
                ) : (
                  "Create Session"
                )}
              </button>
            </div>
          </form>
        </section>
      </section>
    </>
  );
}

export default CreateSession;
