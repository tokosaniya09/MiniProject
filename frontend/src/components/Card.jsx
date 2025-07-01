export default function Card({ children, className = '', ...props }) {
    return (
        <div className={`bg-white rounded-xl shadow-md ${className}`} {...props}>
            {children}
        </div>
    )
}
