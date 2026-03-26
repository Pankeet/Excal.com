import { FaEye , FaEyeSlash } from "react-icons/fa";
type inputSize = 'sm' | 'md' | 'lg';

const sizeStyles: Record<inputSize, string> = {
    sm: "w-48 h-8 text-sm p-1",
    md: "w-64 h-11 text-base p-4",
    lg: "w-72 h-12 text-lg p-5"
};

const sizeStyles_title: Record<inputSize, string> = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl"
};

interface inputProps {
    type : string 
    size : inputSize
    inputTitle? : string;
    placeholder? : string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputBox = ({type, size,inputTitle, placeholder, value, onChange} : inputProps) => {
    if(type != "password"){
    return (
        <div className="grid gap-0.5 mb-4">
            <span className={`${sizeStyles_title[size]} font-serif`}>
                {inputTitle}
            </span>
            <input type={type} placeholder={placeholder} value={value} onChange={onChange} className={`${sizeStyles[size]} border rounded-lg`} />
        </div>
    );
    }
    else{
        return (
            <div className="grid gap-0.5 mb-4">
                <span className={`${sizeStyles_title[size]} font-serif`}>
                    {inputTitle}
                </span>
                <div className="relative">
                    <input type={type} placeholder={placeholder} value={value} onChange={onChange} className={`${sizeStyles[size]} pr-9 border rounded-lg`} />
                    <FaEye className="absolute right-4 top-1/2 -translate-y-1/2 "/>
                </div>
                
            </div>
        );
    }
}