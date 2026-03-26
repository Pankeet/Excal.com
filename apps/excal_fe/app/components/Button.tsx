type Variants = "primary" | "secondary";  
type Size = "sm" | "md" | "lg";

interface ButtonProps {
    name : string;
    onClick : () => void;
    size : Size;
    variant : Variants;
}

const Styles_size = {
    "sm" : "px-2 py-1 text-sm rounded-lg",
    "md" : "px-3 py-2 text-md rounded-xl",
    "lg" : "px-4 py-3 text-lg rounded-xl",
}

const Styles_variant = {
    "primary" : "bg-purple-600 text-white",
    "secondary" : "bg-purple-200 text-purple-800"
}

export function Button(Props : ButtonProps){
    return (
        <div>
            <button onClick={Props.onClick} className={`hover:cursor-pointer font-serif  ${Styles_size[Props.size]} ${Styles_variant[Props.variant]}`}>{Props.name}</button>
        </div>
    )
}