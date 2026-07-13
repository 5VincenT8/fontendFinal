export const FormInput = ({ label, value, onChange, placeholder,className }) => (
    <div>
        <label className="block text-xs font-semibold mb-1.5 text-gray-400">{label}</label>
        <input 
            type="text" 
            className={className} 
            placeholder={placeholder}
            value={value} 
            onChange={onChange}
        />
    </div>
);