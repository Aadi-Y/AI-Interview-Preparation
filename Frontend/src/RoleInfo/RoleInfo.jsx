function RoleInfo({role,experience,topicToFocus,description,lastUpated,questionLength}){
    return (<>
        <section className="w-[100vw] mt-10">
            <section className="w-[80%] m-auto">
                <div>
                    <h1 className="text-[1.7rem]">{role}</h1>
                </div>

                <div>
                    <h2>{topicToFocus}</h2>
                </div>

                <div className="flex gap-3 mt-3">
                    <div className="border rounded-full p-2 bg-gradient-to-r from-blue-500 to-blue-600  border-none">
                        <p className="text-[13px] text-white">Experience {experience} {experience > 1 ? "Years" : "Year"}</p>
                    </div>

                    <div className="border rounded-full p-2 bg-gradient-to-r from-blue-500 to-blue-600 border-none">
                        <p className="text-[13px] text-white">{questionLength} Q&A</p>
                    </div>

                    <div className="border rounded-full p-2 bg-gradient-to-r from-blue-500 to-blue-600 border-none">
                        <p className="text-[13px] text-white">Last Updated {lastUpated}</p>
                    </div>
                </div>
            </section>
        </section>
    </>);
}

export default RoleInfo;