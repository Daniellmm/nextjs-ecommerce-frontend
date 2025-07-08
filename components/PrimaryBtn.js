export default function PrimaryBtn({ children, onClick, className }) {
    return (
        <button
            onClick={onClick}
            className={`rounded-full bg-black w-full py-3 text-white lg:w-auto px-10 cursor-pointer  ${className}`}>
            {children}
        </button>
    );
}