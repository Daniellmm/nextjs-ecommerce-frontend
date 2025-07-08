export default function SecondaryBtn({ children, onClick, className }) {
    return (
        <button
            onClick={onClick}
            className={`rounded-full bg-transparent w-full py-3 border border-gray-400 text-black lg:w-auto px-10 cursor-pointer ${className}`}>
            {children}
        </button>
    );
}