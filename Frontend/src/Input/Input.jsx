function Input({text,placeholder,onChange,value}){
    return (<>
            <input type={text}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            className="border border-gray-300 px-2 py-3 rounded-xl w-full focus:outline-sky-500"
            />
    </>);
}

export default Input;